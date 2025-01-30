"use client";

import React, { useEffect, useRef, useState } from "react";
import { PageFlip, SizeType } from "page-flip";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/assets/pdf.worker.js";

interface PageFlipBookProps {
  pdfPath: string; // Path to the PDF file
}

const PageFlipBook: React.FC<PageFlipBookProps> = ({ pdfPath }) => {
  const bookContainerRef = useRef<HTMLDivElement | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const renderPdfToImages = async () => {
      try {
        const pdf = await pdfjs.getDocument(pdfPath).promise;
        const pages = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 }); // Scale for better quality
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (context) {
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({
              canvasContext: context,
              viewport: viewport,
            }).promise;

            const imageUrl = canvas.toDataURL("image/png");
            pages.push(imageUrl);
            page.cleanup();
          }
        }

        setImageUrls(pages);
      } catch (error) {
        console.error("Error rendering PDF:", error);
      }
    };

    renderPdfToImages();
  }, [pdfPath]);

  useEffect(() => {
    if (!bookContainerRef.current || imageUrls.length === 0) return;

    const pageFlip = new PageFlip(bookContainerRef.current, {
      width: 400,
      height: 600,
      size: "fixed" as SizeType,
      maxShadowOpacity: 0.5,
      showCover: true,
      mobileScrollSupport: false,
      drawShadow: true,
    });

    pageFlip.loadFromImages(imageUrls);

    return () => {
      pageFlip.destroy();
    };
  }, [imageUrls]);

  return <div id="book-container" ref={bookContainerRef} />;
};

export default PageFlipBook;
