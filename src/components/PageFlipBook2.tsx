'use client'
import React, { useEffect, useRef, useState } from 'react'
import { PageFlip, SizeType } from 'page-flip'
import * as pdfjs from 'pdfjs-dist'
import 'pdfjs-dist/web/pdf_viewer.css'
import './FlipBookStyle2.css'

pdfjs.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.js'

interface PageFlipBookProps {
  pdfUrl: string
}

const PageFlipBook: React.FC<PageFlipBookProps> = ({ pdfUrl }) => {
  const bookContainerRef = useRef<HTMLDivElement>(null)
  const pageFlipRef = useRef<PageFlip | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [bookDimensions, setBookDimensions] = useState({
    width: 400,
    height: 533
  })

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth < 768 ? window.innerWidth * 0.9 : 800;  // 90% of the window width or 800px for larger screens
      const height = (width * 533) / 400;  // Maintain aspect ratio (400:533)

      setBookDimensions({ width, height });
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
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

        // Hide container while loading
        container.style.visibility = 'hidden'

        // Create temporary container for pages
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

        // Initialize PageFlip after all pages are ready
        const pageFlip = new PageFlip(container, {
          width: bookDimensions.width,
          height: bookDimensions.height,
          size: 'fixed' as SizeType,
          maxShadowOpacity: 0.5,
          showCover: true,
          flippingTime: 800,
          mobileScrollSupport: false,
          usePortrait: false,
          disableFlipByClick: false,
        })

        // Clear container and add pages
        container.innerHTML = ''
        pages.forEach(page => container.appendChild(page))

        pageFlip.loadFromHTML(container.querySelectorAll('.page'))
        pageFlipRef.current = pageFlip

        // Show container after all is ready
        container.style.visibility = 'visible'

        // Remove temporary container
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
  if (isLoading) return <div className="text-gray-600 text-center">Memuat buku...</div>

  return (
    <div className="flex justify-center">
      <div 
        ref={bookContainerRef} 
        className="book-container"
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
      />
    </div>
  )
}

export default PageFlipBook
