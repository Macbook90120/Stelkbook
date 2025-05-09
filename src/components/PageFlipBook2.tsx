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

  const [bookDimensions, setBookDimensions] = useState({ width: 400, height: 533 })
  const [isPortraitMode, setIsPortraitMode] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : true)

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      const screenWidth = window.innerWidth
      const isMobile = screenWidth < 768
      setIsPortraitMode(isMobile)

      const width = isMobile ? screenWidth * 0.9 : Math.min(screenWidth * 0.5, 500)
      const height = (width * 533) / 400      
      setBookDimensions({ width, height })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
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
        }

        const pageFlip = new PageFlip(container, {
          width: bookDimensions.width,
          height: bookDimensions.height,
          size: 'fixed' as SizeType,
          maxShadowOpacity: 0.5,
          showCover: true,
          flippingTime: 800,
          mobileScrollSupport: false,
          usePortrait: isPortraitMode,
          disableFlipByClick: false,
        })

        container.innerHTML = ''
        pages.forEach(page => container.appendChild(page))

        pageFlip.loadFromHTML(container.querySelectorAll('.page'))
        pageFlipRef.current = pageFlip

        container.style.visibility = 'visible'

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
  }, [pdfUrl, bookDimensions, isPortraitMode])

  if (error) return <div className="text-red-500 text-center">{error}</div>
  if (isLoading) return <div className="text-gray-600 text-center">Memuat buku...</div>

  return (
    <div
      ref={bookContainerRef}
      className="book-container"
      style={{
        visibility: isLoading ? 'hidden' : 'visible',
        width: bookDimensions.width,
        height: bookDimensions.height,
        maxWidth: '100%',
        margin: '0 auto',  // Center the book in the container
      }}
    />
  )
}

export default PageFlipBook
