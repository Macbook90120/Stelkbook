'use client'
import React, { useEffect, useRef, useState } from 'react'
import { PageFlip, SizeType } from 'page-flip'
import * as pdfjs from 'pdfjs-dist'
import 'pdfjs-dist/web/pdf_viewer.css'
import './FlipBookStyle2.css'
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'

pdfjs.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.js'

interface PageFlipBookProps {
  pdfUrl: string
}

const PageFlipBook: React.FC<PageFlipBookProps> = ({ pdfUrl }) => {
  const bookContainerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pageFlipRef = useRef<PageFlip | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreenTab, setIsFullscreenTab] = useState(false)

  const [bookDimensions, setBookDimensions] = useState({
   // Menjadi:
width: 400, // ukuran sedang
height: (400 * 533) / 400,
  })

  const toggleFullScreen = () => {
    const newTab = window.open('', '_blank')
    if (newTab) {
      newTab.localStorage.setItem('pdfUrl', pdfUrl)
      newTab.location.href = '/flipbook'
    }
  }

  useEffect(() => {
    const detectFullscreenTab = () => {
      const isFullscreen = window.location.pathname === '/flipbook'
      setIsFullscreenTab(isFullscreen)

      const screenWidth = window.innerWidth
      const maxBookWidth = 600

      const width = isFullscreen
        ? Math.min(screenWidth * 0.95, maxBookWidth)
        : 400 // ukuran kecil di luar fullscreen

      const height = (width * 533) / 400
      setBookDimensions({ width, height })
    }

    detectFullscreenTab()
    window.addEventListener('resize', detectFullscreenTab)

    return () => {
      window.removeEventListener('resize', detectFullscreenTab)
    }
  }, [])

  useEffect(() => {
    let pdfInstance: pdfjs.PDFDocumentProxy | null = null

    const loadPdf = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const loadingTask = pdfjs.getDocument(pdfUrl)
        pdfInstance = await loadingTask.promise

        const container = bookContainerRef.current
        if (!container) return

        container.style.visibility = 'hidden'

        const tempContainer = document.createElement('div')
        tempContainer.style.position = 'absolute'
        tempContainer.style.left = '-9999px'
        document.body.appendChild(tempContainer)

        const pages = []
        for (let i = 1; i <= pdfInstance.numPages; i++) {
          const page = await pdfInstance.getPage(i)
          const viewport = page.getViewport({ scale: 1.1 })

          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          if (!context) continue

          canvas.width = viewport.width
          canvas.height = viewport.height

          await page.render({ canvasContext: context, viewport }).promise

          const pageWrapper = document.createElement('div')
          pageWrapper.className = 'page'
          pageWrapper.dataset.density = 'hard'
          pageWrapper.appendChild(canvas)
          pages.push(pageWrapper)
          tempContainer.appendChild(pageWrapper)
        }

        const isMobile = window.innerWidth < 768

        const pageFlip = new PageFlip(container, {
          width: bookDimensions.width,
          height: bookDimensions.height,
          size: 'fixed' as SizeType,
          maxShadowOpacity: 0.5,
          showCover: true,
          flippingTime: 800,
          mobileScrollSupport: false,
          usePortrait: isMobile,
          disableFlipByClick: false,
        })

        container.innerHTML = ''
        pages.forEach(page => container.appendChild(page))

        pageFlip.loadFromHTML(container.querySelectorAll('.page'))
        pageFlipRef.current = pageFlip

        container.style.visibility = 'visible'
        document.body.removeChild(tempContainer)

      } catch (err) {
        console.error('PDF render error:', err)
        setError('Gagal memuat buku. Periksa koneksi atau format PDF.')
      } finally {
        setIsLoading(false)
      }
    }

    loadPdf()

    return () => {
      pdfInstance?.destroy()
      pageFlipRef.current?.destroy()
    }
  }, [pdfUrl, bookDimensions])

  if (error) return <div className="text-red-500 text-center">{error}</div>
  if (isLoading) return  <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-red border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Memuat buku...</p>
        </div>

  return (
    <div
      ref={wrapperRef}
      className="relative w-full flex justify-center items-center flex-col"
    >
      {!isFullscreenTab && (
        <button
          onClick={toggleFullScreen}
          className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-60 text-white hover:bg-opacity-80 transition"
          title="Buka Fullscreen di Tab Baru"
        >
          <MdFullscreen size={24} />
        </button>
      )}

      <div
        ref={bookContainerRef}
        className="book-container"
        style={{
          visibility: isLoading ? 'hidden' : 'visible',
          maxWidth: '100%',
        }}
      />
    </div>
  )
}

export default PageFlipBook
