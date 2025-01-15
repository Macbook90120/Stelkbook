import { PageFlip } from "page-flip";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.min.js";

document.addEventListener("DOMContentLoaded", async function () {
    const bookContainer = document.getElementById("demoBookExample");

    // Initialize PageFlip
    const pageFlip = new PageFlip(bookContainer, {
        width: 550, // Base page width
        height: 733, // Base page height
        size: "stretch",
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1350,
        maxShadowOpacity: 0.5, // Half shadow intensity
        showCover: true,
        mobileScrollSupport: false, // Disable content scrolling on mobile devices
    });

    // Load PDF
    const pdfPath = "/pdfs/example.pdf"; // Adjust the path to your PDF file
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

    const loadPdfPages = async (pdfPath) => {
        try {
            const pdf = await pdfjs.getDocument(pdfPath).promise;
            const pages = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2 });

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({
                    canvasContext: context,
                    viewport,
                }).promise;

                // Add rendered page as an image
                pages.push(canvas.toDataURL("image/png"));
            }

            return pages;
        } catch (error) {
            console.error("Error loading PDF:", error);
            return [];
        }
    };

    const pdfPages = await loadPdfPages(pdfPath);

    if (pdfPages.length === 0) {
        console.error("No pages found in PDF");
        return;
    }

    // Dynamically create page elements and add them to the book
    pdfPages.forEach((imgSrc, index) => {
        const pageElement = document.createElement("div");
        pageElement.classList.add("page");

        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = `Page ${index + 1}`;
        img.style.width = "100%";
        img.style.height = "100%";

        pageElement.appendChild(img);
        bookContainer.appendChild(pageElement);
    });

    // Load pages into PageFlip
    pageFlip.loadFromHTML(document.querySelectorAll(".page"));

    // Set initial page stats
    document.querySelector(".page-total").innerText = pageFlip.getPageCount();
    document.querySelector(
        ".page-orientation"
    ).innerText = pageFlip.getOrientation();

    // Navigation buttons
    document.querySelector(".btn-prev").addEventListener("click", () => {
        pageFlip.flipPrev(); // Turn to the previous page
    });

    document.querySelector(".btn-next").addEventListener("click", () => {
        pageFlip.flipNext(); // Turn to the next page
    });

    // Event: Page flip
    pageFlip.on("flip", (e) => {
        document.querySelector(".page-current").innerText = e.data + 1;
    });

    // Event: State change
    pageFlip.on("changeState", (e) => {
        document.querySelector(".page-state").innerText = e.data;
    });

    // Event: Orientation change
    pageFlip.on("changeOrientation", (e) => {
        document.querySelector(".page-orientation").innerText = e.data;
    });
});
