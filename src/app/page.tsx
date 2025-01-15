"use client";

import React, { useEffect, useRef, useState } from "react";
import { PageFlip, SizeType } from "page-flip";
import * as pdfjs from "pdfjs-dist";
import "./FlipBookStyles.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

const FlipBookPage: React.FC = () => {
  const bookContainerRef = useRef<HTMLDivElement | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdfPath = "/pdfs/a-history-of-mathematics-3rded.pdf";
        console.log("Loading PDF from:", pdfPath);
        const pdf = await pdfjs.getDocument(pdfPath).promise;
        console.log("PDF loaded:", pdf);

        const urls: string[] = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (context) {
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            await page.render({ canvasContext: context, viewport }).promise;
            urls.push(canvas.toDataURL("image/png"));
            console.log(`Page ${i} rendered`);
          }
        }

        setImageUrls(urls);
        console.log("All pages rendered:", urls);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, []);

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

    console.log("Initializing PageFlip with images:", imageUrls);
    pageFlip.loadFromImages(imageUrls);

    pageFlip.on("flip", (e) => {
      console.log("Flipped to page:", e.data);
    });

    return () => {
      pageFlip.destroy();
    };
  }, [imageUrls]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div
        id="book-container"
        ref={bookContainerRef}
        className="book-container"
      />
    </div>
  );
};

export default FlipBookPage;
