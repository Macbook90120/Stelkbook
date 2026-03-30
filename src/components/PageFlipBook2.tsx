'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { PageFlip, SizeType } from 'page-flip'
import * as pdfjs from 'pdfjs-dist'
import 'pdfjs-dist/web/pdf_viewer.css'
import './FlipBookStyle2.css'
import {
  Maximize, Minimize, Grid as GridIcon,
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut,
  Sun, Coffee, Moon, Bookmark, X
} from 'lucide-react'

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.mjs'
}

interface PageFlipBookProps {
  pdfUrl: string
  align?: 'start' | 'center' | 'end'
}

const PageFlipBook: React.FC<PageFlipBookProps> = ({ pdfUrl, align = 'center' }) => {
  const wrapperRef        = useRef<HTMLDivElement>(null)
  const bookContainerRef  = useRef<HTMLDivElement>(null)
  const pageFlipRef       = useRef<PageFlip | null>(null)
  const pdfDocRef         = useRef<pdfjs.PDFDocumentProxy | null>(null)
  const pagesRef          = useRef<HTMLDivElement[]>([])
  const resizeTimerRef    = useRef<NodeJS.Timeout | null>(null)
  const initTimerRef      = useRef<NodeJS.Timeout | null>(null)
  const renderingRef      = useRef<Set<number>>(new Set())
  const currentPageRef    = useRef(1)
  const isFullscreenRef   = useRef(false)
  const isMobileRef       = useRef(false)
  const zoomRef           = useRef(1)
  const totalPagesRef     = useRef(0)

  const [isLoading,         setIsLoading]         = useState(true)
  const [error,             setError]             = useState<string | null>(null)
  const [isModalFullscreen, setIsModalFullscreen] = useState(false)
  const [totalPages,        setTotalPages]        = useState(0)
  const [currentPage,       setCurrentPage]       = useState(1)
  const [dimensions,        setDimensions]        = useState({ width: 0, height: 0 })
  const [zoom,              setZoom]              = useState(1)
  const [theme,             setTheme]             = useState('light')
  const [showThumbnails,    setShowThumbnails]    = useState(false)
  const [hasBookmark,       setHasBookmark]       = useState(false)
  const [isMobile,          setIsMobile]          = useState(false)

  // Keep refs in sync with state to avoid stale closures
  useEffect(() => { isFullscreenRef.current = isModalFullscreen }, [isModalFullscreen])
  useEffect(() => { isMobileRef.current = isMobile }, [isMobile])
  useEffect(() => { zoomRef.current = zoom }, [zoom])
  useEffect(() => { totalPagesRef.current = totalPages }, [totalPages])

  // ─── Fullscreen toggle ──────────────────────────────────────────────────────
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenEnabled) {
      alert('Browser Anda tidak mendukung mode fullscreen.')
      return
    }
    if (!document.fullscreenElement) {
      wrapperRef.current?.requestFullscreen().catch((err) => {
        console.error(`Gagal masuk mode fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Gagal keluar mode fullscreen: ${err.message}`)
      })
    }
  }, [])

  // ─── Mobile detection ───────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      isMobileRef.current = mobile
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ─── Dimension calculation ──────────────────────────────────────────────────
  // Returns dimensions without setting state — used internally during init
  const computeDimensions = useCallback((fullscreen: boolean, mobile: boolean) => {
    const containerWidth  = fullscreen ? window.innerWidth  : (wrapperRef.current?.clientWidth  ?? window.innerWidth)
    const containerHeight = fullscreen ? window.innerHeight : Math.max(wrapperRef.current?.clientHeight ?? 0, window.innerHeight * 0.8)

    const aspectRatio = 0.707
    const availableH  = containerHeight - 120
    let pageH = availableH * 0.95
    let pageW = pageH * aspectRatio

    if (mobile) {
      if (pageW > containerWidth * 0.9) {
        pageW = containerWidth * 0.9
        pageH = pageW / aspectRatio
      }
    } else {
      if (pageW * 2 > containerWidth * 0.95) {
        pageW = (containerWidth * 0.95) / 2
        pageH = pageW / aspectRatio
      }
    }

    return { width: Math.floor(pageW), height: Math.floor(pageH) }
  }, [])

  const updateDimensions = useCallback(() => {
    const dims = computeDimensions(isFullscreenRef.current, isMobileRef.current)
    setDimensions(dims)
  }, [computeDimensions])

  // ─── Render a single PDF page into its wrapper div ─────────────────────────
  const renderPage = useCallback(async (index: number) => {
    if (!pdfDocRef.current || !pagesRef.current[index] || renderingRef.current.has(index)) return

    try {
      renderingRef.current.add(index)
      const page = await pdfDocRef.current.getPage(index + 1)

      let baseScale = isMobileRef.current ? 1.5 : 2
      if (isFullscreenRef.current) baseScale = 3
      if (zoomRef.current > 1.2) baseScale = 4

      const viewport = page.getViewport({ scale: baseScale })
      const canvas   = document.createElement('canvas')
      const ctx      = canvas.getContext('2d', { alpha: false })
      if (!ctx) return

      canvas.width        = viewport.width
      canvas.height       = viewport.height
      canvas.style.width  = '100%'
      canvas.style.height = '100%'

      await page.render({ canvasContext: ctx, viewport, intent: 'display' }).promise

      const wrapper = pagesRef.current[index]
      if (wrapper) {
        wrapper.innerHTML = ''
        wrapper.appendChild(canvas)
      }
    } catch {
      // ignore cancelled renders
    } finally {
      renderingRef.current.delete(index)
    }
  }, [])

  // ─── Render a window of pages around `current` ─────────────────────────────
  const renderVisiblePages = useCallback((current: number) => {
    const total = totalPagesRef.current
    for (let i = current - 2; i <= current + 2; i++) {
      if (i >= 0 && i < total) renderPage(i)
    }
  }, [renderPage])

  // ─── Re-render on zoom change for quality ──────────────────────────────────
  useEffect(() => {
    if (!isLoading) {
      renderVisiblePages(currentPageRef.current - 1)
    }
  }, [zoom, isLoading, renderVisiblePages])

  // ─── Debounced resize listener ──────────────────────────────────────────────
  useEffect(() => {
    if (!wrapperRef.current) return
    const observer = new ResizeObserver(() => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current)
      resizeTimerRef.current = setTimeout(() => requestAnimationFrame(updateDimensions), 100)
    })
    observer.observe(wrapperRef.current)
    return () => {
      observer.disconnect()
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current)
    }
  }, [updateDimensions])

  // ─── Fullscreen change handler ──────────────────────────────────────────────
  // Key fix: we DON'T rely on React state to drive re-init here.
  // Instead we imperatively recalculate, rebuild PageFlip, and then sync state.
  useEffect(() => {
    const onFullscreenChange = () => {
      const isFull = !!document.fullscreenElement

      // Sync ref immediately so any subsequent callbacks see the correct value
      isFullscreenRef.current = isFull

      if (isFull) {
        document.body.classList.add('no-scroll')
      } else {
        document.body.classList.remove('no-scroll')
      }

      // Sync state for UI rendering
      setIsModalFullscreen(isFull)

      // Wait for the browser to finish the fullscreen transition + layout paint
      // before we recalculate dimensions and rebuild PageFlip.
      if (initTimerRef.current) clearTimeout(initTimerRef.current)
      initTimerRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          if (!pdfDocRef.current || totalPagesRef.current === 0) return

          const dims = computeDimensions(isFull, isMobileRef.current)
          setDimensions(dims)

          // Rebuild PageFlip with the new dimensions
          rebuildPageFlip(dims, isFull)
        })
      }, 300) // 300ms is enough for most browsers' fullscreen animation
    }

    document.addEventListener('fullscreenchange',       onFullscreenChange)
    document.addEventListener('webkitfullscreenchange', onFullscreenChange)
    document.addEventListener('mozfullscreenchange',    onFullscreenChange)
    document.addEventListener('MSFullscreenChange',     onFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange',       onFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange)
      document.removeEventListener('mozfullscreenchange',    onFullscreenChange)
      document.removeEventListener('MSFullscreenChange',     onFullscreenChange)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computeDimensions])

  // ─── Core PageFlip builder (imperative, not driven by React state) ──────────
  const rebuildPageFlip = useCallback((dims: { width: number; height: number }, fullscreen: boolean) => {
    if (!pdfDocRef.current || dims.width === 0 || totalPagesRef.current === 0) return

    // Destroy previous instance
    if (pageFlipRef.current) {
      try { pageFlipRef.current.destroy() } catch { /* ignore */ }
      pageFlipRef.current = null
    }

    const container = bookContainerRef.current
    if (!container) return

    // Rebuild page divs
    container.innerHTML = ''
    pagesRef.current    = []
    const total = totalPagesRef.current
    for (let i = 0; i < total; i++) {
      const div = document.createElement('div')
      div.className    = 'page'
      div.style.width  = `${dims.width}px`
      div.style.height = `${dims.height}px`
      container.appendChild(div)
      pagesRef.current.push(div)
    }

    const startIndex = Math.max(0, currentPageRef.current - 1)
    const mobile     = isMobileRef.current

    const pageFlip = new PageFlip(container, {
      width:            dims.width,
      height:           dims.height,
      size:             'fixed' as SizeType,
      usePortrait:      mobile,
      showCover:        !mobile,
      maxShadowOpacity: 0.5,
      startPage:        startIndex,
    })

    pageFlip.loadFromHTML(pagesRef.current)
    pageFlipRef.current = pageFlip

    pageFlip.on('flip', (e: any) => {
      const index = e.data
      currentPageRef.current = index + 1
      setCurrentPage(index + 1)
      renderVisiblePages(index)
    })

    // Wait one rAF after loadFromHTML so PageFlip has wired its internal DOM
    requestAnimationFrame(() => {
      // Clear cached renders so they repaint at the correct quality/scale
      renderingRef.current.clear()
      renderVisiblePages(startIndex)
      setIsLoading(false)
    })
  }, [renderVisiblePages])

  // ─── Load PDF ───────────────────────────────────────────────────────────────
  useEffect(() => {
    let active = true
    setIsLoading(true)
    setError(null)

    pdfjs.getDocument(pdfUrl).promise
      .then(pdf => {
        if (!active) return
        pdfDocRef.current   = pdf
        totalPagesRef.current = pdf.numPages
        setTotalPages(pdf.numPages)
      })
      .catch(() => {
        if (!active) return
        setError('Gagal memuat PDF')
        setIsLoading(false)
      })

    return () => {
      active = false
      pdfDocRef.current?.destroy()
      pdfDocRef.current = null
    }
  }, [pdfUrl])

  // ─── Init PageFlip when PDF loads + dimensions are ready ───────────────────
  useEffect(() => {
    if (!pdfDocRef.current || dimensions.width === 0 || totalPages === 0) return

    if (initTimerRef.current) clearTimeout(initTimerRef.current)
    initTimerRef.current = setTimeout(() => {
      rebuildPageFlip(dimensions, isFullscreenRef.current)
    }, 50)

    return () => {
      if (initTimerRef.current) clearTimeout(initTimerRef.current)
    }
  // We intentionally exclude `dimensions` from exhaustive-deps here because
  // fullscreen-triggered rebuilds are handled in the fullscreen handler above.
  // This effect only fires on initial load (totalPages changes from 0 → N).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages, rebuildPageFlip])

  // ─── Handle non-fullscreen dimension changes (resize) ──────────────────────
  // Separate from the fullscreen handler so we don't double-trigger rebuilds.
  const prevDimsRef = useRef({ width: 0, height: 0 })
  useEffect(() => {
    if (
      dimensions.width === 0 ||
      totalPages === 0 ||
      isFullscreenRef.current || // fullscreen handled separately
      (prevDimsRef.current.width === dimensions.width && prevDimsRef.current.height === dimensions.height)
    ) return

    prevDimsRef.current = dimensions

    if (initTimerRef.current) clearTimeout(initTimerRef.current)
    initTimerRef.current = setTimeout(() => {
      rebuildPageFlip(dimensions, false)
    }, 100)

    return () => {
      if (initTimerRef.current) clearTimeout(initTimerRef.current)
    }
  }, [dimensions, totalPages, rebuildPageFlip])

  // ─── Navigation helpers ─────────────────────────────────────────────────────
  const handlePrev = () => pageFlipRef.current?.flipPrev()
  const handleNext = () => pageFlipRef.current?.flipNext()

  const getThemeClasses = () => {
    if (theme === 'sepia') return 'bg-amber-50 text-amber-900'
    if (theme === 'dark')  return 'bg-gray-900 text-gray-100'
    return 'bg-gray-100 text-gray-900'
  }

  // ─── Render ─────────────────────────────────────────────────────────────────
  if (error) return (
    <div className="p-4 text-red-500 bg-red-50 rounded-md m-4">{error}</div>
  )

  return (
    <div
      ref={wrapperRef}
      className={`
        w-full flex flex-col items-center justify-center relative overflow-hidden
        transition-colors duration-500
        ${isModalFullscreen ? getThemeClasses() : ''}
        ${isModalFullscreen ? 'h-screen' : 'min-h-[500px]'}
      `}
    >
      {/* Fullscreen button (non-fullscreen mode only) */}
      {!isModalFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-40 p-2 bg-white/80 hover:bg-white shadow-md rounded-full text-gray-700 transition-all hover:scale-105"
          title="Buka Fullscreen"
        >
          <Maximize size={24} />
        </button>
      )}

      {/* Thumbnails sidebar */}
      {showThumbnails && isModalFullscreen && (
        <div className="absolute top-0 left-0 h-full w-64 bg-white/95 backdrop-blur shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-left duration-300">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">Pages ({totalPages})</h3>
            <button onClick={() => setShowThumbnails(false)} className="text-gray-500 hover:text-red-500">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-4">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                onClick={() => { pageFlipRef.current?.turnToPage(i); setShowThumbnails(false) }}
                className="cursor-pointer flex flex-col items-center group"
              >
                <div className={`
                  w-full aspect-[1/1.4] border rounded-md mb-2 flex items-center justify-center transition-all
                  ${currentPage === i + 1
                    ? 'border-blue-500 shadow-md bg-blue-50 text-blue-600'
                    : 'border-gray-300 bg-gray-100/50 text-gray-400 group-hover:border-gray-400'}
                `}>
                  <span className="text-xs font-semibold">{i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="font-medium text-gray-600">Memuat Buku...</p>
        </div>
      )}

      {/* Book canvas */}
      <div
        className="book-wrapper transition-transform duration-300 relative z-10"
        style={{
          width:           dimensions.width * (isMobile ? 1 : 2),
          height:          dimensions.height,
          transform:       `scale(${zoom})`,
          transformOrigin: 'center center',
        }}
      >
        <div ref={bookContainerRef} />
      </div>

      {/* Toolbar (fullscreen mode only) */}
      {isModalFullscreen && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-2xl rounded-full px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2 sm:gap-4 z-40 border border-gray-100/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button onClick={handlePrev} className="p-2 hover:bg-gray-100/80 rounded-full text-gray-700 transition-colors hidden sm:block"><ChevronLeft size={20} /></button>
          <button
            onClick={() => setShowThumbnails(t => !t)}
            className={`p-2 rounded-full transition-colors ${showThumbnails ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700'}`}
            title="Thumbnails"
          >
            <GridIcon size={20} />
          </button>
          <span className="text-sm font-semibold w-16 text-center text-gray-800">{currentPage} / {totalPages}</span>
          <button onClick={handleNext} className="p-2 hover:bg-gray-100 rounded-full text-gray-700 transition-colors hidden sm:block"><ChevronRight size={20} /></button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="p-2 hover:bg-gray-100 rounded-full text-gray-700 transition-colors hidden sm:block"><ZoomOut size={18} /></button>
          <span className="text-xs font-bold w-12 text-center text-gray-800">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="p-2 hover:bg-gray-100 rounded-full text-gray-700 transition-colors hidden sm:block"><ZoomIn size={18} /></button>

          <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block" />

          <div className="hidden md:flex items-center gap-1">
            <button onClick={() => setTheme('light')} className={`p-2 rounded-full transition-colors ${theme === 'light' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100 text-gray-500'}`} title="Mode Terang"><Sun size={18} /></button>
            <button onClick={() => setTheme('sepia')} className={`p-2 rounded-full transition-colors ${theme === 'sepia' ? 'bg-[#f4ecd8] text-[#5b4636]' : 'hover:bg-gray-100 text-gray-500'}`} title="Mode Sepia"><Coffee size={18} /></button>
            <button onClick={() => setTheme('dark')}  className={`p-2 rounded-full transition-colors ${theme === 'dark'  ? 'bg-gray-800 text-white'     : 'hover:bg-gray-100 text-gray-500'}`} title="Mode Gelap"><Moon size={18} /></button>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-1 hidden md:block" />

          <button
            onClick={() => setHasBookmark(b => !b)}
            className={`p-2 rounded-full transition-colors ${hasBookmark ? 'text-blue-600 bg-blue-50' : 'hover:bg-gray-100 text-gray-500'}`}
            title="Tandai"
          >
            <Bookmark size={20} fill={hasBookmark ? 'currentColor' : 'none'} />
          </button>
          <button onClick={toggleFullscreen} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full text-gray-700 transition-colors" title="Keluar Fullscreen">
            <Minimize size={20} />
          </button>
        </div>
      )}
    </div>
  )
}

export default PageFlipBook