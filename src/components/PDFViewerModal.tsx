'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Download,
  AlertCircle,
  Loader2,
  FileText,
  RotateCw,
  Maximize2,
  Expand,
} from 'lucide-react';
import { getStorageUrl } from '@/helpers/storage';

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
  bookId?: number;
}

const PDFViewerModal: React.FC<PDFViewerModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title = 'PDF Viewer',
  bookId,
}) => {
  const [scale, setScale] = useState(1.0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfObjectUrl, setPdfObjectUrl] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [fitMode, setFitMode] = useState<'none' | 'width' | 'page'>('none');
  const [touchStart, setTouchStart] = useState<{ x: number; y: number; distance: number } | null>(null);

  const MIN_SCALE = 0.25;
  const MAX_SCALE = 3.0;
  const SCALE_STEP = 0.25;

  // Load zoom preference from localStorage
  useEffect(() => {
    if (isOpen) {
      const savedScale = localStorage.getItem('pdf-viewer-scale');
      const savedRotation = localStorage.getItem('pdf-viewer-rotation');
      const savedFitMode = localStorage.getItem('pdf-viewer-fit-mode') as 'none' | 'width' | 'page';
      
      setScale(savedScale ? parseFloat(savedScale) : 1.0);
      setRotation(savedRotation ? parseInt(savedRotation) : 0);
      setFitMode(savedFitMode || 'none');
      setCurrentPage(1);
      setTotalPages(0);
      setIsLoading(true);
      setError(null);
    }
  }, [isOpen]);

  // Load PDF
  useEffect(() => {
    if (!isOpen || !pdfUrl) return;

    const loadPdf = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const fullUrl = getStorageUrl(pdfUrl);

        // Check if PDF is accessible
        const response = await fetch(fullUrl, { method: 'HEAD' });
        if (!response.ok) {
          throw new Error('PDF tidak dapat diakses atau tidak ditemukan.');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && !contentType.includes('pdf') && !contentType.includes('application/octet-stream')) {
          throw new Error('File yang diminta bukan file PDF yang valid.');
        }

        setPdfObjectUrl(fullUrl);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat PDF.');
        setIsLoading(false);
      }
    };

    loadPdf();
  }, [isOpen, pdfUrl]);

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '-') {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevPage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault();
        handleRotate();
      } else if (e.key === '0' && e.ctrlKey) {
        e.preventDefault();
        handleResetZoom();
      } else if (e.key === 'w' && e.ctrlKey) {
        e.preventDefault();
        handleFitToWidth();
      } else if (e.key === 'p' && e.ctrlKey) {
        e.preventDefault();
        handleFitToPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, currentPage, totalPages, scale, rotation]);

  // Handle mouse wheel zoom
  useEffect(() => {
    if (!isOpen) return;

    const handleWheel = (e: Event) => {
      const wheelEvent = e as WheelEvent;
      if (wheelEvent.ctrlKey || wheelEvent.metaKey) {
        e.preventDefault();
        const delta = wheelEvent.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
        setScale((prev) => Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev + delta)));
        setFitMode('none');
      }
    };

    const container = document.querySelector('.pdf-content-container');
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [isOpen]);

  // Save zoom preferences to localStorage
  useEffect(() => {
    if (isOpen) {
      localStorage.setItem('pdf-viewer-scale', scale.toString());
      localStorage.setItem('pdf-viewer-rotation', rotation.toString());
      localStorage.setItem('pdf-viewer-fit-mode', fitMode);
    }
  }, [scale, rotation, fitMode, isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + SCALE_STEP, MAX_SCALE));
    setFitMode('none');
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - SCALE_STEP, MIN_SCALE));
    setFitMode('none');
  }, []);

  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  const handleResetZoom = useCallback(() => {
    setScale(1.0);
    setRotation(0);
    setFitMode('none');
  }, []);

  const handleFitToWidth = useCallback(() => {
    setFitMode('width');
    setScale(1.0);
  }, []);

  const handleFitToPage = useCallback(() => {
    setFitMode('page');
    setScale(1.0);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      setTouchStart({
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2,
        distance,
      });
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStart) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      const scaleDelta = distance / touchStart.distance;
      const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * scaleDelta));
      setScale(newScale);
      setFitMode('none');
      
      setTouchStart({
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2,
        distance,
      });
    }
  }, [scale, touchStart]);

  const handleTouchEnd = useCallback(() => {
    setTouchStart(null);
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages || prev));
  }, [totalPages]);

  const handleDownload = useCallback(() => {
    if (!pdfObjectUrl) return;

    const link = document.createElement('a');
    link.href = pdfObjectUrl;
    link.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [pdfObjectUrl, title]);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= (totalPages || 1)) {
      setCurrentPage(value);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col bg-gray-900/95 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`PDF Viewer - ${title}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 bg-red-600 rounded-lg flex-shrink-0">
            <FileText size={20} className="text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-white font-semibold text-sm md:text-base truncate">
              {title}
            </h2>
            {bookId && (
              <p className="text-gray-400 text-xs">ID: {bookId}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-2 bg-gray-700/50 rounded-lg p-1">
            <button
              onClick={handleZoomOut}
              disabled={scale <= MIN_SCALE}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom Out (-)"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-gray-300 text-sm font-medium min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={scale >= MAX_SCALE}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom In (+)"
            >
              <ZoomIn size={18} />
            </button>
            <div className="w-px h-6 bg-gray-600 mx-1" />
            <button
              onClick={handleFitToWidth}
              className={`p-2 rounded-md transition-colors ${
                fitMode === 'width'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-600'
              }`}
              title="Fit to Width (Ctrl+W)"
            >
              <Expand size={18} />
            </button>
            <button
              onClick={handleFitToPage}
              className={`p-2 rounded-md transition-colors ${
                fitMode === 'page'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-600'
              }`}
              title="Fit to Page (Ctrl+P)"
            >
              <Maximize2 size={18} />
            </button>
            <button
              onClick={handleRotate}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors"
              title="Rotate (Ctrl+R)"
            >
              <RotateCw size={18} />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 py-1 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors text-xs"
              title="Reset Zoom (Ctrl+0)"
            >
              Reset
            </button>
          </div>

          <div className="w-px h-8 bg-gray-700 hidden md:block" />

          <button
            onClick={handleDownload}
            disabled={!pdfObjectUrl || isLoading}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium"
            title="Download PDF"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Close (Esc)"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={scale <= MIN_SCALE}
            className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors disabled:opacity-50"
          >
            <ZoomOut size={18} />
          </button>
          <span className="text-gray-300 text-sm font-medium min-w-[50px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            disabled={scale >= MAX_SCALE}
            className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors disabled:opacity-50"
          >
            <ZoomIn size={18} />
          </button>
          <button
            onClick={handleFitToWidth}
            className={`p-2 rounded-md transition-colors ${
              fitMode === 'width'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-600'
            }`}
          >
            <Expand size={18} />
          </button>
          <button
            onClick={handleRotate}
            className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors"
          >
            <RotateCw size={18} />
          </button>
        </div>

        {totalPages > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="p-1.5 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-gray-300 text-sm">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="p-1.5 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md transition-colors disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div 
        className="flex-1 overflow-auto bg-gray-900/50 relative pdf-content-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Loader2 size={48} className="text-red-600 animate-spin mb-4" />
            <p className="text-gray-400 text-sm">Memuat PDF...</p>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
              <AlertCircle size={32} className="text-red-500" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Gagal Memuat PDF</h3>
            <p className="text-gray-400 text-sm text-center max-w-md mb-6">{error}</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Tutup
            </button>
          </div>
        ) : pdfObjectUrl ? (
          <div
            className="min-h-full flex items-center justify-center p-8"
            style={{
              transform: `scale(${fitMode === 'none' ? scale : 1})`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease-out',
            }}
          >
            <div
              className="relative bg-white rounded-lg shadow-2xl"
              style={{
                transform: `rotate(${rotation}deg) ${
                  fitMode === 'width' 
                    ? 'scaleX(calc(100vw / 64rem))' 
                    : fitMode === 'page' 
                    ? 'scale(calc(100vh / 90vh))' 
                    : `scale(${scale})`
                }`,
                transition: 'transform 0.3s ease-out',
                maxWidth: fitMode === 'width' ? '100%' : 'none',
                maxHeight: fitMode === 'page' ? '100%' : 'none',
              }}
            >
              <iframe
                src={`${pdfObjectUrl}#page=${currentPage}&toolbar=0&navpanes=0`}
                className="w-full h-full min-h-[80vh] max-w-4xl bg-white rounded-lg shadow-2xl"
                style={{
                  width: fitMode === 'width' ? '100vw' : 'auto',
                  height: fitMode === 'page' ? '100vh' : '80vh',
                  minWidth: fitMode === 'width' ? '100%' : 'auto',
                  minHeight: fitMode === 'page' ? '100%' : '80vh',
                }}
                title={title}
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* Footer with Page Navigation (Desktop) */}
      <div className="hidden md:flex items-center justify-between px-4 py-3 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center gap-4">
          {totalPages > 0 && (
            <>
              <button
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
                className="flex items-center gap-1 px-3 py-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <ChevronLeft size={16} />
                Sebelumnya
              </button>

              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Halaman</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={currentPage}
                  onChange={handlePageInputChange}
                  className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm text-center focus:outline-none focus:border-red-500"
                />
                <span className="text-gray-400 text-sm">dari {totalPages}</span>
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className="flex items-center gap-1 px-3 py-1.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Selanjutnya
                <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>

        <div className="text-gray-500 text-xs">
          Gunakan tombol panah untuk navigasi • +/- untuk zoom • Ctrl+scroll untuk zoom • Pinch untuk zoom (mobile) • Esc untuk menutup
        </div>
      </div>
    </div>
  );
};

export default PDFViewerModal;
