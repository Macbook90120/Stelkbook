"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import PageFlipBook from "@/components/PageFlipBook";

function Page() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* Navbar */}
      <div className="mb-8"><Navbar /></div>

      {/* Main Content */}
      <main className="pt-20 px-8"> {/* Added padding to avoid overlap with navbar */}

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
                  <p className="text-xl font-semibold font-poppins">Kelas IX</p>
                  <div className="mx-2">
                    <Image
                      src="/assets/Kelas_X/Primary_Direct.png"
                      alt="Breadcrumb Divider"
                      width={10}
                      height={16}
                    />
                  </div>
                  <p className="text-xl font-semibold font-poppins">
                    Bahasa Indonesia
                  </p>
                </div>

        {/* Book and Flipbook Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Book Cover and Metadata */}
          <div className="flex flex-col items-center lg:items-start">
            {/* Book Cover */}
            <div className="mb-6">
              <Image
                src="/assets/Kelas_X/Buku_Bahasa_Indonesia.png"
                alt="Bahasa Indonesia SMA Kelas X"
                width={200}
                height={280}
                className="rounded-lg shadow-md"
              />
            </div>

            {/* Book Metadata */}
            <div className="text-center lg:text-left">
              <h2 className="text-lg font-bold">
                Buku Paket <br /> Bahasa Indonesia <br /> SMA Kelas IX
              </h2>
              <ul className="mt-2 text-sm space-y-1">
                <li className="whitespace-nowrap">
                  <strong>Penerbit:</strong> Yudistira
                </li>
                <li className="whitespace-nowrap">
                  <strong>Penulis:</strong> Indah Wukir Setiarini
                </li>
                <li className="whitespace-nowrap">
                  <strong>Tahun:</strong> 2018
                </li>
                <li className="whitespace-nowrap">
                  <strong>ISBN:</strong> 9786022997214
                </li>
              </ul>
            </div>
          </div>

          {/* Flipbook */}
          <div className="flex-grow">
            <PageFlipBook pdfPath="/assets/pdfs/MTK-OLM.pdf" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;
