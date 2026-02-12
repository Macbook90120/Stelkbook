'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { PageFlip, SizeType } from 'page-flip'
import * as pdfjs from 'pdfjs-dist'
import 'pdfjs-dist/web/pdf_viewer.css'
import './FlipBookStyle2.css'
import { MdFullscreen, MdClose } from 'react-icons/md'

// Ensure worker is configured
if (typeof window !== 'undefined') {
  // Use the local worker file which we guaranteed matches the installed version
  pdfjs.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.mjs'
}

interface PageFlipBookProps {
  pdfUrl: string
  align?: 'start' | 'center' | 'end'
}

const PageFlipBook: React.FC<PageFlipBookProps> = ({ pdfUrl, align = 'center' }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const bookContainerRef = useRef<HTMLDivElement>(null)
  const pageFlipRef = useRef<PageFlip | null>(null)
  // Store the PDF document in a ref to persist across re-renders without re-loading
  const pdfDocRef = useRef<pdfjs.PDFDocumentProxy | null>(null)
  const pagesRef = useRef<HTMLDivElement[]>([])
  const renderingRef = useRef<Set<number>>(new Set())
  const renderTasksRef = useRef<Map<number, any>>(new Map()) // Store render tasks to cancel them
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreenTab, setIsFullscreenTab] = useState(false)
  const [isModalFullscreen, setIsModalFullscreen] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  
  // Container dimensions state
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [inputPage, setInputPage] = useState('1')

  // 1. Handle Resize & Dimensions (Defined early to avoid hoisting issues)
  const updateDimensions = useCallback(() => {
    if (!wrapperRef.current) return

    let containerWidth = wrapperRef.current.clientWidth
    let containerHeight = wrapperRef.current.clientHeight
    
    // In modal mode, use window dimensions for better accuracy
    if (isModalFullscreen && typeof window !== 'undefined') {
      containerWidth = window.innerWidth
      containerHeight = window.innerHeight
    }

    // Use window height as fallback if containerHeight is too small
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800
    if (containerHeight < vh * 0.5) {
      containerHeight = vh * 0.8
    }
    
    // Page aspect ratio (Width / Height)
    const aspectRatio = 0.707 

    let pageWidth, pageHeight

    // Single page view (Portrait)
    // Subtract space for pagination (80px) and some padding (40px)
    const availableHeight = containerHeight - 120 
    pageHeight = availableHeight * 0.95
    pageWidth = pageHeight * aspectRatio

    // Ensure it doesn't overflow width
    if (pageWidth > containerWidth * 0.9) {
      pageWidth = containerWidth * 0.9
      pageHeight = pageWidth / aspectRatio
    }

    setDimensions({ width: Math.floor(pageWidth), height: Math.floor(pageHeight) })
  }, [isFullscreenTab, isModalFullscreen])

  // 2. Handle Fullscreen Check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsFullscreenTab(window.location.pathname === '/flipbook')
    }
  }, [])

  const toggleFullScreen = () => {
    setIsLoading(true)
    setIsModalFullscreen(true)
  }

  const closeFullScreen = () => {
    setIsLoading(true)
    setIsModalFullscreen(false)
  }

  // Handle ESC key and body scroll lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullScreen()
    }

    if (isModalFullscreen) {
      window.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    } else {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }

    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isModalFullscreen])

  // Update dimensions when modal toggles
  useEffect(() => {
    updateDimensions()
  }, [isModalFullscreen, updateDimensions])

  // 3. Handle Resize effect
  useEffect(() => {
    // Initial update
    updateDimensions()
    
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current)
      // Debounce resize to improve INP
      resizeTimeoutRef.current = setTimeout(() => {
          requestAnimationFrame(updateDimensions)
      }, 200)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current)
    }
  }, [updateDimensions])

  // 4. Load PDF Document (Only once when URL changes)
  useEffect(() => {
    let isMounted = true

    const loadPdfDocument = async () => {
      if (!pdfUrl) return

      try {
        setIsLoading(true)
        setError(null)
        
        // Clean up previous document if exists
        if (pdfDocRef.current) {
          pdfDocRef.current.destroy()
          pdfDocRef.current = null
        }

        const loadingTask = pdfjs.getDocument({
          url: pdfUrl,
          rangeChunkSize: 65536, // 64KB chunks for better streaming
          disableAutoFetch: true, // Don't fetch the whole file automatically
          disableStream: false,   // Allow streaming
        })
        const pdf = await loadingTask.promise
        
        if (isMounted) {
          pdfDocRef.current = pdf
          setTotalPages(pdf.numPages)
          // We don't set loading false here yet, we wait for layout
        }
      } catch (err: any) {
        console.error('Error loading PDF:', err)
        console.error('PDF URL:', pdfUrl)
        if (isMounted) {
          let msg = 'Gagal memuat dokumen PDF.'
          if (err.name === 'MissingPDFException') {
            msg += ' File tidak ditemukan (404).'
          } else if (err.name === 'InvalidPDFException') {
            msg += ' File rusak atau bukan PDF valid.'
          } else {
            msg += ` Error: ${err.message || err}`
          }
          setError(msg)
          setIsLoading(false)
        }
      }
    }

    loadPdfDocument()

    return () => {
      isMounted = false
      if (pdfDocRef.current) {
        pdfDocRef.current.destroy()
        pdfDocRef.current = null
      }
    }
  }, [pdfUrl])

  // 5. Render Single Page
  const renderPage = useCallback(async (pageIndex: number) => {
    if (!pdfDocRef.current || !pagesRef.current[pageIndex]) return
    if (renderingRef.current.has(pageIndex)) return

    // Cancel any existing render task for this page
    if (renderTasksRef.current.has(pageIndex)) {
      try {
        renderTasksRef.current.get(pageIndex).cancel()
      } catch (e) {
        // Ignore cancel errors
      }
      renderTasksRef.current.delete(pageIndex)
    }

    const pageWrapper = pagesRef.current[pageIndex]
    // If canvas exists, assume rendered
    if (pageWrapper.querySelector('canvas')) return

    try {
      renderingRef.current.add(pageIndex)
      const page = await pdfDocRef.current.getPage(pageIndex + 1)
      
      // Use device pixel ratio for sharp rendering, cap it for stability
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      const viewport = page.getViewport({ scale: 1.5 * pixelRatio }) 

      // Validate viewport dimensions
      if (viewport.width === 0 || viewport.height === 0) {
          console.error(`Invalid viewport for page ${pageIndex}:`, viewport)
          return
      }

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      if (context) {
        canvas.width = viewport.width
        canvas.height = viewport.height
        // Scale down via CSS to fit container
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        
        const renderTask = page.render({ canvasContext: context, viewport })
        renderTasksRef.current.set(pageIndex, renderTask)

        await renderTask.promise

        if (!pageWrapper.querySelector('canvas')) {
          pageWrapper.innerHTML = '' // Clear loading placeholder if any
          pageWrapper.appendChild(canvas)
        }
      }
    } catch (err: any) {
      if (err?.name !== 'RenderingCancelledException') {
        console.error(`Error rendering page ${pageIndex}:`, err)
      }
    } finally {
      renderingRef.current.delete(pageIndex)
      renderTasksRef.current.delete(pageIndex)
    }
  }, [])

  const clearPage = useCallback((pageIndex: number) => {
    if (!pagesRef.current[pageIndex]) return
    
    const pageWrapper = pagesRef.current[pageIndex]
    if (pageWrapper.querySelector('canvas')) {
       // Explicitly clear content and references
       pageWrapper.innerHTML = ''
       // Force style reset if needed
    }
  }, [])

  const updateVisiblePages = useCallback(async (current: number) => {
    if (!pdfDocRef.current) return
    
    const total = pdfDocRef.current.numPages
    const RANGE = 2 // Render current +/- 2 pages
    
    // Render priority pages
    const renderPromises = []
    for (let i = Math.max(0, current - RANGE); i < Math.min(total, current + RANGE + 1); i++) {
      renderPromises.push(renderPage(i))
    }
    await Promise.all(renderPromises)

    // Cleanup distant pages to save memory
    const CLEANUP_RANGE = 4
    for (let i = 0; i < total; i++) {
      if (i < current - CLEANUP_RANGE || i > current + CLEANUP_RANGE) {
        clearPage(i)
      }
    }
  }, [renderPage, clearPage])

  // 5. Initialize FlipBook (Runs when Dimensions & PDF are ready)
  useEffect(() => {
    if (!pdfDocRef.current || dimensions.width === 0 || !bookContainerRef.current) return

    let isEffectActive = true

    const initBook = async () => {
      try {
        // Give a small moment for DOM to stabilize (especially after modal toggle)
        await new Promise(resolve => requestAnimationFrame(resolve))
        if (!isEffectActive) return

        // Destroy existing instance
        if (pageFlipRef.current) {
          try {
            pageFlipRef.current.destroy()
          } catch (e) {}
          pageFlipRef.current = null
        }

        const container = bookContainerRef.current
        if (!container) return

        // Reset container content
        container.innerHTML = ''
        pagesRef.current = []

        // Create page wrappers
        for (let i = 0; i < totalPages; i++) {
          const pageWrapper = document.createElement('div')
          pageWrapper.className = 'page' 
          pageWrapper.dataset.density = 'hard'
          pageWrapper.style.width = `${dimensions.width}px`
          pageWrapper.style.height = `${dimensions.height}px`
          
          container.appendChild(pageWrapper)
          pagesRef.current.push(pageWrapper)
        }

        if (!isEffectActive) return

        const pageFlip = new PageFlip(container, {
          width: dimensions.width,
          height: dimensions.height,
          size: 'fixed' as SizeType,
          maxShadowOpacity: 0.5,
          showCover: true,
          mobileScrollSupport: false,
          usePortrait: true,
          startPage: currentPage > 1 ? currentPage - 1 : 0,
          flippingTime: 400,
          clickEventForward: true,
          useMouseEvents: true,
          showPageCorners: true,
        })

        pageFlip.loadFromHTML(pagesRef.current)
        pageFlipRef.current = pageFlip

        // Event Listeners
        pageFlip.on('flip', (e: any) => {
          const newIndex = e.data as number
          setCurrentPage(newIndex + 1)
          setInputPage((newIndex + 1).toString())
          updateVisiblePages(newIndex)
        })

        // Trigger initial render for current and surrounding pages
        await updateVisiblePages(currentPage - 1)
        
        if (isEffectActive) {
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Error initializing FlipBook:', err)
        if (isEffectActive) {
          setIsLoading(false)
        }
      }
    }

    initBook()

    return () => {
      isEffectActive = false
      if (pageFlipRef.current) {
        try {
          pageFlipRef.current.destroy()
        } catch (e) {}
        pageFlipRef.current = null
      }
      // Cancel all pending renders
      renderTasksRef.current.forEach((task) => {
        try {
            task.cancel()
        } catch(e) {}
      })
      renderTasksRef.current.clear()
      pagesRef.current = []
    }
  }, [dimensions, totalPages, updateVisiblePages]) 
  // Note: We don't include currentPage in dependency to avoid re-init on flip

  const handleGoToPage = () => {
    const pageNum = parseInt(inputPage)
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      if (pageFlipRef.current) {
        pageFlipRef.current.turnToPage(pageNum - 1)
        setCurrentPage(pageNum)
      }
    } else {
      // Reset input if invalid
      setInputPage(currentPage.toString())
    }
  }

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>

  return (
    <div 
      ref={wrapperRef} 
      className={
         isModalFullscreen 
         ? "fixed inset-0 z-[9999] bg-black/60 flex flex-col items-center justify-center gap-6 p-4 backdrop-blur-sm"
         : `relative w-full min-h-[90vh] flex flex-col ${align === 'start' ? 'items-start' : align === 'end' ? 'items-end' : 'items-center'} justify-start gap-6 hide-scrollbar overflow-hidden pt-0 pb-8`
       }
    >
      {/* Close button for modal */}
      {isModalFullscreen && (
        <button
          onClick={closeFullScreen}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-[10000] border border-white/20"
          title="Tutup"
        >
          <MdClose size={28} />
        </button>
      )}

      {/* Fullscreen Toggle */}
      {!isFullscreenTab && !isModalFullscreen && !isLoading && (
        <button
          onClick={toggleFullScreen}
          className="absolute top-0 right-4 p-2 rounded-full bg-gray-800/60 text-white hover:bg-gray-800/80 transition z-20"
          title="Buka Fullscreen"
        >
          <MdFullscreen size={24} />
        </button>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-gray-50/50">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600 font-medium">Memuat buku...</p>
        </div>
      )}

      {/* Book Container */}
      <div 
        key={isModalFullscreen ? 'modal' : 'normal'}
        className="book-wrapper relative"
        style={{
           width: dimensions.width,
           height: dimensions.height,
           // Hide until ready to prevent layout shift ugliness
           opacity: isLoading ? 0 : 1, 
           transition: 'opacity 0.3s ease'
        }}
      >
        <div 
          ref={bookContainerRef} 
          className="book-container shadow-2xl" 
          style={{ 
            visibility: 'visible',
            margin: align === 'start' ? '0' : align === 'end' ? '0 0 0 auto' : '0 auto'
          }} // Override CSS visibility: hidden and margin
        />
      </div>

      {/* Controls / Pagination below PDF */}
      {!isLoading && (
        <div className="z-10 bg-white border border-gray-100 px-4 py-2 rounded-xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="text-gray-700 font-medium text-sm">Halaman</span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value.replace(/[^0-9]/g, ''))}
              onKeyDown={(e) => e.key === 'Enter' && handleGoToPage()}
              className="w-12 h-9 border border-gray-200 rounded-lg text-center font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            <span className="text-gray-400 font-medium">/ {totalPages}</span>
          </div>
          <button
            onClick={handleGoToPage}
            className="px-4 h-9 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all active:scale-95 shadow-md shadow-blue-500/20 flex items-center justify-center text-sm"
          >
            Go
          </button>
        </div>
      )}
    </div>
  )
}

export default PageFlipBook