'use client';
import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar_Guru';
import { useBook } from '@/context/bookContext';
import useAuthMiddleware from '@/hooks/auth';
import { useAuth } from '@/context/authContext';
import Pagination from '@/components/Pagination';
import SortFilter, { SortOption } from '@/components/SortFilter';

interface Book {
  id: number;
  judul: string;
  cover: string;
  path?: string;
}

function BookContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { nonAkademikBooks, nonAkademikPagination, loading, error, fetchNonAkademikBooks } = useBook();
  const [displayBooks, setDisplayBooks] = useState<Book[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>(null);

  const currentPage = Number(searchParams.get('page')) || 1;

  // Fetch books on component mount and when page changes
  useEffect(() => {
    fetchNonAkademikBooks(currentPage);
  }, [fetchNonAkademikBooks, currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/guru_lainnya?${params.toString()}`);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (currentPage > 1) handlePageChange(currentPage - 1);
      } else if (e.key === 'ArrowRight') {
        if (nonAkademikPagination && currentPage < nonAkademikPagination.lastPage) {
          handlePageChange(currentPage + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, nonAkademikPagination]);

  // Process books data when it changes
  useEffect(() => {
    if (!nonAkademikBooks) return;

    const processedBooks = nonAkademikBooks.map((book: Book) => {
      const coverUrl = book.cover
        ? `http://localhost:8000/storage/${book.cover}`
        : '/assets/default-cover.png';

      return {
        id: book.id,
        judul: book.judul,
        cover: coverUrl,
        path: `/guru_lainnya/Buku_NA?id=${book.id}`,
      };
    });

    if (sortOption === 'asc') {
      processedBooks.sort((a: Book, b: Book) => a.judul.localeCompare(b.judul));
    } else if (sortOption === 'desc') {
      processedBooks.sort((a: Book, b: Book) => b.judul.localeCompare(a.judul));
    }

    setDisplayBooks(processedBooks);
  }, [nonAkademikBooks, sortOption]);

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
    <>
      <div className="mb-8 flex items-center justify-between relative z-10">
        <p className="text-xl font-semibold text-left font-poppins translate-y-[-15px]">
          Buku Non-Akademik
        </p>
        <div className="translate-y-[-15px]">
          <SortFilter
            currentSort={sortOption}
            onSortChange={setSortOption}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center min-h-[400px]">
        {displayBooks.length > 0 ? (
          displayBooks.map((book) => (
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
                  sizes="300px"
                  className="rounded-md object-cover shadow-md"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/default-cover.png';
                  }}
                />
              </div>
              <p className="mt-2 text-sm font-poppins font-semibold line-clamp-2">
                {book.judul}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
            <p className="text-lg">Tidak ada buku ditemukan.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {nonAkademikPagination && (
        <div className="mt-8 mb-4">
          <Pagination
            currentPage={currentPage}
            totalPages={nonAkademikPagination.lastPage || 1}
            onPageChange={handlePageChange}
            isLoading={loading}
          />
        </div>
      )}
    </>
  );
}

function Page() {
  useAuthMiddleware();

  return (
    <div className="min-h-screen p-8 bg-gray-50 overflow-y-auto">
      <header className="flex justify-between items-center mb-4">
        <Navbar />
      </header>

      <div className="pt-20 px-8">
        <Suspense fallback={
          <div className="h-[50vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-red border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600">Memuat halaman...</p>
            </div>
          </div>
        }>
          <BookContent />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
