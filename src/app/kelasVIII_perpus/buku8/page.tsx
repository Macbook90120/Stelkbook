"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import WarningModalBuku from "./WarningModalKelas3";
import PageFlipBook from "@/components/PageFlipBook2";
import Navbar from "@/components/Navbar_Lainnya_Perpus";
import { useBook } from "@/context/bookContext";

interface Book {
  id: number;
  judul: string;
  penerbit: string;
  penulis: string;
  tahun: string;
  kategori: string;
  ISBN: string;
  isi: string;
  cover: string;
}

const Page: React.FC = () => {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = parseInt(searchParams.get("id") || "0", 10);

  const { fetchKelas8BookById, deleteBookKelas8, getBookPdfUrl } = useBook(); // ✅ Ambil fungsi getBookPdfUrl
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchKelas8BookById(bookId);
        setBook(data);

        // ✅ Ambil PDF URL dari context
      } catch (error) {
        console.error("Error fetching book or PDF URL:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookId, fetchKelas8BookById, getBookPdfUrl]);

  const handleDeleteBook = async (id: number) => {
    try {
      await deleteBookKelas8(id);
      setShowWarningModal(false);
      console.log("Buku dihapus");
      router.push("/perpus_lainnya");
    } catch (error) {
      console.error("Gagal menghapus buku:", error);
    }
  };

   if (loading) {
     return (
       <div className="h-screen flex items-center justify-center bg-gray-50">
         <div className="flex flex-col items-center gap-3">
           <div className="w-10 h-10 border-4 border-red border-t-transparent rounded-full animate-spin"></div>
           <p className="text-gray-600">Memuat buku...</p>
         </div>
       </div>
     );
   }
   
  if (!book) return null;

  const pdfUrl = `http://localhost:8000/storage/${book.isi}`; 

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
        <Image src="/assets/Kelas_X/Primary_Direct.png" alt=">" width={10} height={16} className="mx-2" />
        <p className="text-xl font-semibold font-poppins">{book.kategori}</p>
        <Image src="/assets/Kelas_X/Primary_Direct.png" alt=">" width={10} height={16} className="mx-2" />
        <p className="text-xl font-semibold font-poppins">{book.judul}</p>
      </div>

      {/* Konten Buku */}
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Kiri */}
        <div className="flex flex-col items-center lg:items-start">
          <Image
            src={`http://localhost:8000/storage/${book.cover}`}
            alt="Cover Buku"
            width={200}
            height={280}
            className="rounded-lg shadow-md mb-6"
            onError={(e) => {
              e.currentTarget.src = "/assets/default-cover.png";
            }}
          />

          <div className="text-center lg:text-left">
            <h2 className="text-lg font-bold">{book.judul}</h2>
            <ul className="mt-2 text-sm space-y-1">
              <li><strong>Penerbit:</strong> {book.penerbit}</li>
              <li><strong>Penulis:</strong> {book.penulis}</li>
              <li><strong>Tahun:</strong> {book.tahun}</li>
              <li><strong>ISBN:</strong> {book.ISBN}</li>
            </ul>
          </div>

          {/* Tombol */}
          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={() => router.push(`/kelasVIII_perpus/buku8/Edit_Buku?id=${book.id}`)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 flex items-center gap-2"
            >
              <Image src="/assets/icon/edit.svg" alt="Edit Icon" width={16} height={16} />
              <span>Edit Buku</span>
            </button>

            <button
              onClick={() => setShowWarningModal(true)}
              className="bg-red text-white px-4 py-2 rounded-lg shadow-md hover:bg-red flex items-center gap-2"
            >
              <Image src="/assets/Admin/Delete_user.png" alt="Delete Icon" width={16} height={16} />
              <span>Hapus Buku</span>
            </button>
          </div>
        </div>

        {/* Kanan */}
        <div className="flex-grow overflow-x-auto">
        <div className="bg-gradient-to-r from-red to-slate-300 p-2 rounded-lg">
    <iframe
      src={pdfUrl}
      width="100%"
      height="600px"
      className="rounded-lg"
    ></iframe>
  </div>
          
          {/* {pdfUrl ? (
            <PageFlipBook pdfUrl={pdfUrl} />
          ) : (
            <p className="text-gray-500">Memuat buku...</p>
          )} */}
        </div>
      </div>

      {/* Modal */}
      {showWarningModal && (
        <WarningModalBuku
          isVisible={showWarningModal}
          onClose={() => setShowWarningModal(false)}
          book={book}
        />
      )}
    </div>
  );
};

export default Page;
