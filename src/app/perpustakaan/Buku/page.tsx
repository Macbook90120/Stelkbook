"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import WarningModalBuku from "./WarningModalBuku3";
import PageFlipBook from "@/components/PageFlipBook";
import Navbar from "@/components/Navbar_Perpus";
import { useBook } from "@/context/bookContext";

interface Book {
  id: number;
  penerbit: string;
  penulis: string;
  tahun: string;
  ISBN: string;
  isi: string; // Path to the PDF file
  cover: string; // Path to the cover image
}

const Page: React.FC = () => {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = parseInt(searchParams.get("id") || "0", 10);
  const { perpusBooks, fetchPerpusBooks, deleteBook } = useBook();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPerpusBooks();
      setLoading(false);
    };

    fetchData();
  }, [fetchPerpusBooks]);

  const handleDeleteBook = async (id: number) => {
    try {
      await deleteBook(id);
      setShowWarningModal(false);
      console.log("Buku dihapus");
      router.push("/perpustakaan");
    } catch (error) {
      console.error("Gagal menghapus buku:", error);
    }
  };

  const bookData: Book | undefined = perpusBooks.find((book:Book) => book.id === bookId);



  if (!bookData) {
    return <div className="h-screen flex items-center justify-center text-lg text-red-500">Buku tidak ditemukan.</div>;
  }

  // Buat URL lengkap jika hanya nama file yang diberikan
  const pdfUrl = bookData.isi.startsWith("http")
    ? bookData.isi
    : `http://localhost:8000/storage/${bookData.isi}`;

  return (
    <div className="h-screen p-8 bg-gray-50 overflow-y-auto">
      {/* Navbar */}
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
        <p className="text-xl font-semibold font-poppins">{bookData.penerbit}</p>
      </div>

      {/* Konten Buku */}
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Kiri - Cover & Detail Buku */}
        <div className="flex flex-col items-center lg:items-start">
          <Image
            src={`http://localhost:8000/storage/${bookData.cover}`}
            alt="Cover Buku"
            width={200}
            height={280}
            className="rounded-lg shadow-md mb-6"
            onError={(e) => {
              e.currentTarget.src = "/assets/default-cover.png"; // Gambar fallback jika tidak ada
            }}
          />

          <div className="text-center lg:text-left">
            <h2 className="text-lg font-bold">{bookData.penerbit}</h2>
            <ul className="mt-2 text-sm space-y-1">
              <li><strong>Penerbit:</strong> {bookData.penerbit}</li>
              <li><strong>Penulis:</strong> {bookData.penulis}</li>
              <li><strong>Tahun:</strong> {bookData.tahun}</li>
              <li><strong>ISBN:</strong> {bookData.ISBN}</li>
            </ul>
          </div>

          {/* Tombol Edit & Hapus */}
          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={() => router.push(`/perpustakaan/Edit_Buku/${bookData.id}`)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 flex items-center gap-2"
            >
              <Image src="/assets/Admin/Edit_user.png" alt="Edit Icon" width={16} height={16} />
              <span>Edit Buku</span>
            </button>

            <button
              onClick={() => setShowWarningModal(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 flex items-center gap-2"
            >
              <Image src="/assets/Admin/Delete_user.png" alt="Delete Icon" width={16} height={16} />
              <span>Hapus Buku</span>
            </button>
          </div>
        </div>

        {/* Kanan - Page Flip Book */}
        <div className="flex-grow overflow-x-auto">
          <PageFlipBook pdfPath={pdfUrl} />
        </div>
      </div>

      {/* Modal Hapus Buku */}
      {showWarningModal && (
        <WarningModalBuku
          isVisible={showWarningModal}
          onConfirm={() => handleDeleteBook(bookData.id)}
          onCancel={() => setShowWarningModal(false)}
        />
      )}
    </div>
  );
};

export default Page;
