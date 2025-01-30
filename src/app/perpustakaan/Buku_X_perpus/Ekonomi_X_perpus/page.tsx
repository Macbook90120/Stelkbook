"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import WarningModalBuku from "./WarningModalBuku4";
import PageFlipBook from "@/components/PageFlipBook";
import Navbar from "@/components/Navbar";

function Page() {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const router = useRouter();

  return (
    <div className="h-screen p-8 bg-gray-50 overflow-y-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <div className="pt-12 px-8">
          <Navbar />
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="mb-8 flex items-center">
        <p className="text-xl font-semibold font-poppins">Studi Anda</p>
        <Image src="/assets/Kelas_X/Primary_Direct.png" alt="Breadcrumb Divider" width={10} height={16} className="mx-2" />
        <p className="text-xl font-semibold font-poppins">Kelas X</p>
        <Image src="/assets/Kelas_X/Primary_Direct.png" alt="Breadcrumb Divider" width={10} height={16} className="mx-2" />
        <p className="text-xl font-semibold font-poppins">Ekonomi</p>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Book Info */}
        <div className="flex flex-col items-center lg:items-start">
          <Image src="/assets/Kelas_X/Buku_Ekonomi.png" alt="Ekonomi" width={200} height={280} className="rounded-lg shadow-md mb-6" />

          <div className="text-center lg:text-left">
            <h2 className="text-lg font-bold">Buku Paket <br /> Ekonomi SMA <br /> Kelas X</h2>
            <ul className="mt-2 text-sm space-y-1">
              <li><strong>Penerbit:</strong> Yudistira</li>
              <li><strong>Penulis:</strong> Endang Mulyadi</li>
              <li><strong>Tahun:</strong> 2018</li>
              <li><strong>ISBN:</strong> 9786022995708</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex flex-col gap-2">
            <button onClick={() => router.push("/perpustakaan/Edit_Buku/Edit_Ekonomi_X")} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 flex items-center gap-2">
              <Image src="/assets/Admin/Edit_user.png" alt="Edit Icon" width={16} height={16} />
              <span>Edit Buku</span>
            </button>
            <button onClick={() => setShowWarningModal(true)} className="bg-red text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 flex items-center gap-2">
              <Image src="/assets/Admin/Delete_user.png" alt="Delete Icon" width={16} height={16} />
              <span>Hapus Buku</span>
            </button>
          </div>
        </div>

        {/* Flipbook */}
        <div className="flex-grow overflow-x-auto">
          <PageFlipBook pdfPath="/assets/pdfs/MTK-OLM.pdf" />
        </div>
      </div>

      {/* Warning Modal */}
      {showWarningModal && (
        <WarningModalBuku
          isVisible={showWarningModal}
          onConfirm={() => {
            setShowWarningModal(false);
            console.log("Buku dihapus");
          }}
          onCancel={() => setShowWarningModal(false)}
        />
      )}
    </div>
  );
}

export default Page;
