'use client';
import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useBook } from '@/context/bookContext';
import useAuthMiddleware from '@/hooks/auth';
import Pagination from '@/components/Pagination';
import SortFilter, { SortOption } from '@/components/SortFilter';

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
            sizes="300px"
            className="rounded-md object-cover"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/assets/default-cover.png';
            }}
          />
      </div>
      <p className="mt-4 text-center text-sm font-semibold font-poppins">{book.judul}</p>
    </div>
  );
};

function PageContent() {
  useAuthMiddleware();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { kelas10Books, kelas10Pagination, loading, error, fetchKelas10Books } = useBook();
  const [displayBooks, setDisplayBooks] = useState<Book[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>(null);

  const currentPage = Number(searchParams.get('page')) || 1;

  const handleStudiAndaClick = () => {
    router.push('/SMK');
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/kelasX?${params.toString()}`);
  };

  useEffect(() => {
    fetchKelas10Books(currentPage);
  }, [fetchKelas10Books, currentPage]);

  useEffect(() => {
    // Add keyboard listener for arrow keys
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (currentPage > 1) handlePageChange(currentPage - 1);
      } else if (e.key === 'ArrowRight') {
        if (kelas10Pagination && currentPage < kelas10Pagination.lastPage) {
          handlePageChange(currentPage + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, kelas10Pagination]);

  useEffect(() => {
    if (!kelas10Books) return;

    const processedBooks = kelas10Books.map((book: any) => {
      const coverUrl = book.cover 
        ? `http://localhost:8000/storage/${book.cover}` 
        : '/assets/default-cover.png';
      
      return {
        id: book.id,
        judul: book.judul,
        cover: coverUrl,
        path: `/kelasX/Buku?id=${book.id}`,
      };
    });

    if (sortOption === 'asc') {
      processedBooks.sort((a: Book, b: Book) => a.judul.localeCompare(b.judul));
    } else if (sortOption === 'desc') {
      processedBooks.sort((a: Book, b: Book) => b.judul.localeCompare(a.judul));
    }

    setDisplayBooks(processedBooks);
  }, [kelas10Books, sortOption]);

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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      <main className="pt-24 px-8 flex-grow flex flex-col pb-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <h1 
              className="text-xl font-bold text-gray-800 cursor-pointer hover:underline"
              onClick={handleStudiAndaClick}
            >
              Studi Anda
            </h1>
            <Image src="/assets/Kelas_X/Primary_Direct.png" alt="Divider Icon" width={10} height={16} />
            <h2 className="text-xl font-bold text-gray-800">Kelas X</h2>
          </div>
          <SortFilter 
            currentSort={sortOption} 
            onSortChange={setSortOption} 
          />
        </div>

        {/* Books Section */}
        <div className="flex-grow">
          {displayBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
              {displayBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64 text-gray-500">
              Tidak ada buku ditemukan.
            </div>
          )}
        </div>

        {/* Pagination Section */}
        {kelas10Pagination && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={kelas10Pagination.lastPage || 1}
              onPageChange={handlePageChange}
              isLoading={loading}
            />
          </div>
        )}
      </main>
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}

export default Page;
