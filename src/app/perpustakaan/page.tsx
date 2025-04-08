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
  useAuthMiddleware();
  const router = useRouter();
  const {user} = useAuth();
    
      useEffect(() => {
        // Check if user is not null before accessing its properties
        if (user) {
          if (user.role === 'Admin') {
            router.push('/admin');
          } else if (user.role === 'Guru') {
            router.push('/homepage_guru');
          } else if (user.role === 'Perpus') {
            router.push('/perpustakaan');
          } else {
            router.push('/homepage');
          }
        }
      }, [user, router]); 
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
            <Image
              src={book.cover}
              alt={book.judul}
              width={150}
              height={200}
              className="mx-auto rounded-lg shadow-md"
              onError={(e) => {
                console.error(`Gagal memuat gambar: ${book.cover}`);
                e.currentTarget.src = '/assets/default-cover.png'; // Fallback ke gambar default
              }}
            />
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