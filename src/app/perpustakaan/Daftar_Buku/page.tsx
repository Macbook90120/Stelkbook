'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar_Perpus';
import { useBook } from '@/context/bookContext'; // Import BookContext (JavaScript)
import useAuthMiddleware from '@/hooks/auth';
import { useAuth } from '@/context/authContext';
interface Book {
  id: number;
  judul: string;
  cover: string;
  path?: string; // Optional karena path akan di-generate
}

function Page() {
  
  const router = useRouter();
  
  const {user} = useAuth();
  const { books, loading, error, fetchBooks } = useBook(); // Ambil data buku perpustakaan dari context
  const [combinedBooks, setCombinedBooks] = useState<Book[]>([]);



  // Data statis untuk "Menambahkan Buku"
  const staticBook: Book = {
    id: 0, // ID khusus untuk buku statis
    judul: 'Menambahkan Buku',
    cover: '/assets/icon/add-file.svg',
    path: '/perpustakaan/Tambah_Buku',
  };

  // Gabungkan data buku perpustakaan dengan data statis
  useEffect(() => {
    fetchBooks(); // Ambil data buku perpustakaan dari server
  }, [fetchBooks]);

  useEffect(() => {
    const mappedBooks: Book[] = books.map((book: Book) => {
      const coverUrl = book.cover ? `http://localhost:8000/storage/${book.cover}` : '/assets/default-cover.png';
      console.log(`Cover URL for Book ID ${book.id}:`, coverUrl); // Debugging
      return {
        id: book.id,
        judul: book.judul,
        cover: coverUrl,
        path: `/perpustakaan/Buku?id=${book.id}`,
      };
    });

    setCombinedBooks([staticBook, ...mappedBooks]); // Pastikan staticBook selalu ada
  }, [books]);


  // Fungsi untuk navigasi
  const handleNavigationClick = (path: string) => {
    router.push(path);
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

  return (
    <div className="min-h-screen p-8 bg-gray-50 overflow-y-auto">
      <header className="flex justify-between items-center mb-4">
        <Navbar />
      </header>

      {/* Text */}
      <div className="mb-8 flex items-center pt-20 px-8">
        <p className="text-xl font-semibold text-left font-poppins translate-y-[-15px]">
          Perpus Anda
        </p>
      </div>

      {/* Buku Display Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {combinedBooks.map((book, index) => (
          <div
            key={index}
            className="text-center cursor-pointer hover:bg-gray-100"
            onClick={() => handleNavigationClick(book.path!)}
          >
            {book.id === 0 ? (
              // Custom Cover untuk "Menambahkan Buku"
              <div className="w-[150px] h-[200px] bg-gradient-to-b from-red to-red rounded-lg shadow-md flex flex-col items-center justify-center relative">
                <div className="absolute top-2 left-2 text-white text-xs font-bold"></div>
                <div className="text-white text-lg font-bold px-2 text-center leading-tight"></div>
                <Image
                  src="/assets/icon/add-file.svg"
                  alt="Tambah Buku"
                  width={40}
                  height={40}
                  className="mt-4"
                />
                <div className="absolute bottom-2 right-2 text-white font-bold text-lg">+</div>
              </div>
            ) : (
              <Image
                src={book.cover}
                alt={book.judul}
                width={150}
                height={200}
                className="mx-auto rounded-lg shadow-md"
                onError={(e) => {
                  console.error(`Gagal memuat gambar: ${book.cover}`);
                  e.currentTarget.src = '/assets/default-cover.png';
                }}
              />
            )}
            <p className="mt-2 text-sm font-poppins font-semibold whitespace-pre-line text-center">
              {book.judul}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Page;