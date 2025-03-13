"use client";

import React, { useEffect, useRef, useState } from "react";
import { PageFlip, SizeType } from "page-flip";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/assets/pdf.worker.js";

interface PageFlipBookProps {
  pdfPath: string;
}

const PageFlipBook: React.FC<PageFlipBookProps> = ({ pdfPath }) => {
  const bookContainerRef = useRef<HTMLDivElement | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pages, setPages] = useState<(HTMLCanvasElement | null)[]>([]);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const renderPdfToCanvas = async () => {
      try {
        const pdf = await pdfjs.getDocument(pdfPath).promise;
        setNumPages(pdf.numPages);

        const canvases: (HTMLCanvasElement | null)[] = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (context) {
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({
              canvasContext: context,
              viewport: viewport,
            }).promise;

            canvases.push(canvas);
          }

          page.cleanup();
        }

        setPages(canvases);
      } catch (error) {
        console.error("Error rendering PDF:", error);
      }
    };

    renderPdfToCanvas();
  }, [pdfPath]);

  useEffect(() => {
    // Menambahkan canvas ke dalam div setelah halaman siap
    pageRefs.current.forEach((div, i) => {
      if (div && pages[i]) {
        div.innerHTML = ""; // Hapus isi sebelumnya
        div.appendChild(pages[i]!);
      }
    });

    if (!bookContainerRef.current || pages.length === 0) return;

    const pageFlip = new PageFlip(bookContainerRef.current, {
      width: 400,
      height: 600,
      size: "fixed" as SizeType,
      maxShadowOpacity: 0.5,
      showCover: true,
      mobileScrollSupport: false,
      drawShadow: true,
    });

    pageFlip.loadFromHTML(document.querySelectorAll(".page"));

    return () => {
      pageFlip.destroy();
    };
  }, [pages]);

  return (
    <div id="book-container" ref={bookContainerRef}>
      {Array.from({ length: numPages }).map((_, i) => (
        <div
          className="page"
          key={i}
          ref={(el) => {
            if (el) pageRefs.current[i] = el;
          }}
        >
          {/* Canvas akan ditambahkan di sini secara otomatis */}
        </div>
      ))}
    </div>
  );
};

export default PageFlipBook;