'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar_Perpus';
import { useBook } from '@/context/bookContext';
import { useAuth } from '@/context/authContext';

interface Book {
  id: number;
  judul: string;
  cover: string;
  path?: string;
}

function Page() {
  const router = useRouter();
  const { user } = useAuth();
  const { books, fetchBooks, loading } = useBook();
  const [combinedBooks, setCombinedBooks] = useState<Book[]>([]);

  // Data statis untuk "Menambahkan Buku"
  const staticBook: Book = {
    id: 0,
    judul: 'Menambahkan Buku',
    cover: '/assets/icon/add-file.svg',
    path: '/perpustakaan/Tambah_Buku',
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    if (books) {
      const mappedBooks: Book[] = books.map((book: Book) => {
        const coverUrl = book.cover
          ? `http://localhost:8000/storage/${book.cover}`
          : '/assets/default-cover.png';

        return {
          id: book.id,
          judul: book.judul,
          cover: coverUrl,
          path: `/perpustakaan/Buku?id=${book.id}`,
        };
      });

      setCombinedBooks([staticBook, ...mappedBooks]);
    }
  }, [books]);

  const handleNavigationClick = (path: string) => {
    router.push(path);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Memuat buku...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50 overflow-y-auto">
      <header className="flex justify-between items-center mb-4">
        <Navbar />
      </header>

      <div className="mb-8 flex items-center pt-20 px-2 sm:px-8 space-x-4">
        <button
          onClick={() => router.push('/perpustakaan')}
          className="text-gray-600 hover:text-red transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <p className="text-xl font-semibold font-poppins">Perpus Anda</p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-6
          justify-items-center
        "
      >
        {combinedBooks.map((book, index) => (
          <div
            key={book.id}
            className="text-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg w-full max-w-[180px]"
            onClick={() => handleNavigationClick(book.path!)}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter') handleNavigationClick(book.path!);
            }}
          >
           {book.id === 0 ? (
  <div className="relative w-full pb-[133%] bg-gradient-to-b from-red to-red rounded-lg shadow-md">
    <div className="absolute inset-0 flex items-center justify-center">
      <Image
        src={book.cover}
        alt="Tambah Buku"
        width={80} // ikon besar
        height={80}
        priority
        className="object-contain"
        style={{width: 'auto', height: 'auto'}}
      />
    </div>
    <div className="absolute bottom-3 right-3 text-white font-bold text-2xl">+</div>
  </div>
) : (


              <div className="relative w-full pb-[133%] rounded-lg overflow-hidden shadow-md mx-auto">
                <Image
                  src={book.cover}
                  alt={book.judul}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 180px"
                  priority={true}
                  className="object-cover rounded-lg"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/default-cover.png';
                  }}
                />
              </div>
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
