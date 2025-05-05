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

        container.innerHTML = ''

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
          pageWrapper.appendChild(canvas)
          container.appendChild(pageWrapper)
        }

        const pageFlip = new PageFlip(container, {
          width: 400,
          height: 533,
          size: 'fixed' as SizeType,
          maxShadowOpacity: 0.5,
          showCover: true,
          flippingTime: 800, 
          mobileScrollSupport: false,
        })

        pageFlip.loadFromHTML(container.querySelectorAll('.page'))
        pageFlipRef.current = pageFlip

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
  }, [pdfUrl])

  if (error) return <div className="text-red-500 text-center">{error}</div>
  if (isLoading) return <div className="text-gray-600 text-center">Memuat buku...</div>

  return (
    <div className="flex justify-center">
      <div ref={bookContainerRef} className="book-container" />
    </div>
  )
}

export default PageFlipBook
