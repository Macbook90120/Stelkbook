'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar_Perpus';
import { useBook } from '@/context/bookContext';
import useAuthMiddleware from '@/hooks/auth';
import { useAuth } from '@/context/authContext';

interface Book {
  id: number;
  judul: string;
  cover: string;
  path?: string;
}

function Page() {
  useAuthMiddleware();
  const router = useRouter();
  const { user } = useAuth();
  const { kelas4Books, loading, error, fetchKelas4Books } = useBook();
  const [displayBooks, setDisplayBooks] = useState<Book[]>([]);

  // Redirect based on user role


  // Fetch non-akademik books on component mount
  useEffect(() => {
    fetchKelas4Books();
  }, [fetchKelas4Books]);

  // Process books data when it changes
  useEffect(() => {
    const processedBooks = kelas4Books.map((book: Book) => {
      const coverUrl = book.cover 
        ? `http://localhost:8000/storage/${book.cover}` 
        : '/assets/default-cover.png';
      
      console.log(`Cover URL for Book ID ${book.id}:`, coverUrl);
      
      return {
        id: book.id,
        judul: book.judul,
        cover: coverUrl,
        path: `/kelasIV_perpus/buku4?id=${book.id}`,
      };
    });

    setDisplayBooks(processedBooks);
  }, [kelas4Books]);

  const handleNavigationClick = (path: string) => {
    router.push(path);
  };


  return (
    <div className="min-h-screen p-8 bg-gray-50 overflow-y-auto">
      <header className="flex justify-between items-center mb-4">
        <Navbar />
      </header>

      <div className="mb-8 flex items-center pt-20 px-8">
        <p className="text-xl font-semibold text-left font-poppins translate-y-[-15px]">
          Buku Kelas IV
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {displayBooks.map((book) => (
          <div
            key={book.id}
            className="text-center cursor-pointer hover:bg-gray-100 p-4 rounded-lg transition-colors"
            onClick={() => handleNavigationClick(book.path!)}
          >
            <div className="w-[150px] h-[200px] relative mx-auto">
              <Image
                src={book.cover}
                alt={book.judul}
                fill
                className="object-cover rounded-lg shadow-md"
                onError={(e) => {
                  console.error(`Failed to load image: ${book.cover}`);
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/default-cover.png';
                }}
              />
            </div>
            <p className="mt-2 text-sm font-poppins font-semibold line-clamp-2">
              {book.judul}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;