'use client'
import React, { useEffect, useRef, useState } from 'react'
import { PageFlip, SizeType } from 'page-flip'
import * as pdfjs from 'pdfjs-dist'
import 'pdfjs-dist/web/pdf_viewer.css'

pdfjs.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.js'

interface PageFlipBookProps {
  pdfUrl: string
}

const PageFlipBook: React.FC<PageFlipBookProps> = ({ pdfUrl }) => {
  const bookContainerRef = useRef<HTMLDivElement>(null)
  const pageFlipRef = useRef<PageFlip | null>(null)
  const [numPages, setNumPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let pdfInstance: pdfjs.PDFDocumentProxy | null = null

    const loadPdf = async () => {
      try {
        setIsLoading(true)
        const loadingTask = pdfjs.getDocument({
          url: pdfUrl,
          withCredentials: true // Jika butuh credentials
        })
        
        pdfInstance = await loadingTask.promise
        setNumPages(pdfInstance.numPages)

        // Render semua halaman
        const pages = []
        for (let i = 1; i <= pdfInstance.numPages; i++) {
          const page = await pdfInstance.getPage(i)
          const viewport = page.getViewport({ scale: 1.5 })
          
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          if (!context) continue
          
          canvas.width = viewport.width
          canvas.height = viewport.height
          
          await page.render({
            canvasContext: context,
            viewport
          }).promise
          
          pages.push(canvas)
        }

        // Inisialisasi PageFlip
        if (bookContainerRef.current) {
          const pageFlip = new PageFlip(bookContainerRef.current, {
            width: 550,
            height: 733,
            size: 'fixed' as SizeType,
            maxShadowOpacity: 0.5,
            showCover: true,
            mobileScrollSupport: false
          })

          pageFlip.loadFromHTML(document.querySelectorAll('.page'))
          pageFlipRef.current = pageFlip
        }
      } catch (err) {
        setError('Gagal memuat buku')
        console.error('Error loading PDF:', err)
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

  if (error) return <div className="text-red-500">{error}</div>
  if (isLoading) return <div>Memuat buku...</div>

  return (
    <div ref={bookContainerRef} className="book-container">
      {Array.from({ length: numPages }).map((_, i) => (
        <div key={`page-${i}`} className="page" />
      ))}
    </div>
  )
}

export default PageFlipBook