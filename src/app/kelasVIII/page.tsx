'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useBook } from '@/context/bookContext';
import useAuthMiddleware from '@/hooks/auth';

interface Book {
  id: number;
  judul: string;
  cover: string;
  path?: string;
}

const BookCard = ({ book }: { book: Book }) => {
  const router = useRouter();

  return (
    <div
      className="bg-white hover:bg-gray-100 rounded-lg p-4 cursor-pointer flex flex-col items-center transition-colors duration-200"
      onClick={() => book.path && router.push(book.path)}
    >
      <div className="w-[150px] h-[200px] relative">
        <Image 
          src={book.cover} 
          alt={book.judul} 
          fill
          className="rounded-md object-cover"
          onError={(e) => {
            console.error(`Failed to load image: ${book.cover}`);
            const target = e.target as HTMLImageElement;
            target.src = '/assets/default-cover.png';
          }}
        />
      </div>
      <p className="mt-4 text-center text-sm font-semibold font-poppins">{book.judul}</p>
    </div>
  );
};

function Page() {
  useAuthMiddleware();
  const router = useRouter();
  const { kelas8Books, loading, error, fetchKelas8Books } = useBook();
  const [displayBooks, setDisplayBooks] = useState<Book[]>([]);

  const handleStudiAndaClick = () => {
    router.push('/SMP');
  };

  useEffect(() => {
    fetchKelas8Books();
  }, [fetchKelas8Books]);

  useEffect(() => {
    const processedBooks = kelas8Books.map((book: Book) => {
      const coverUrl = book.cover 
        ? `http://localhost:8000/storage/${book.cover}` 
        : '/assets/default-cover.png';
      
      return {
        id: book.id,
        judul: book.judul,
        cover: coverUrl,
        path: `/kelasVIII/Buku?id=${book.id}`,
      };
    });

    setDisplayBooks(processedBooks);
  }, [kelas8Books]);



  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      <main className="pt-20 px-8"></main>

      {/* Page Header */}
      <div className="p-8">
        <div className="flex items-center space-x-2 mb-6">
          <h1 
            className="text-xl font-bold text-gray-800 cursor-pointer hover:underline"
            onClick={handleStudiAndaClick}
          >
            Studi Anda
          </h1>
          <Image src="/assets/Kelas_X/Primary_Direct.png" alt="Divider Icon" width={10} height={16} />
          <h2 className="text-xl font-bold text-gray-800">Kelas VIII</h2>
        </div>

        {/* Books Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {displayBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;