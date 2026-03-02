"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import PageFlipBook from "@/components/PageFlipBook";

function Page() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/pdfs/MTK-OLM.pdf";
    link.download = "MTK-OLM.pdf";
    link.click();
  };

  const handleScrollToFlipBook = () => {
    const flipBook = document.getElementById("flipbook");
    flipBook?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* Navbar */}
      <div className="mb-8"><Navbar /></div>

      {/* Main Content */}
      <main className="pt-16 px-8">
        {/* Studi Anda Section */}
        <div className="mb-8 flex items-center">
          <p className="text-xl font-semibold font-poppins">Studi Anda</p>
          <div className="mx-2">
            <Image
              src="/assets/Kelas_X/Primary_Direct.png"
              alt="Breadcrumb Divider"
              width={10}
              height={16}
            />
          </div>
          <p className="text-xl font-semibold font-poppins">Kelas X</p>
          <div className="mx-2">
            <Image
              src="/assets/Kelas_X/Primary_Direct.png"
              alt="Breadcrumb Divider"
              width={10}
              height={16}
            />
          </div>
          <p className="text-xl font-semibold font-poppins">Sejarah</p>
        </div>

        {/* Book and Flipbook Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          {/* Book Cover and Metadata */}
          <div className="flex flex-col items-center text-center lg:text-left lg:items-start">
            <div className="mb-6">
              <Image
                src="/assets/Kelas_X/Buku_Sejarah.png"
                alt="Sejarah SMA Kelas X"
                width={200}
                height={280}
                className="rounded-lg shadow-md lg:w-48 lg:h-64 md:w-40 md:h-56 sm:w-32 sm:h-48"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Buku Paket <br /> Sejarah Indonesia <br /> Kelas X
              </h2>
              <ul className="mt-2 text-sm space-y-1">
                <li><strong>Penerbit:</strong> Penerbit Erlangga</li>
                <li><strong>Penulis:</strong> Ratna Hapsari</li>
                <li><strong>Tahun:</strong> 2016</li>
                <li><strong>ISBN:</strong> 9786022988915</li>
              </ul>

              {/* Buttons */}
              <div className="mt-4 space-y-2 w-full max-w-xs">
                <button
                  onClick={handleDownload}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Download Buku
                </button>
                <button
                  onClick={handleScrollToFlipBook}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 lg:hidden"
                >
                  Read Now
                </button>
              </div>
            </div>
          </div>

          {/* Flipbook */}
          <div id="flipbook" className="flex-grow">
            <PageFlipBook pdfPath="/assets/pdfs/MTK-OLM.pdf" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;
