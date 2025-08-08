'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar_Guru';
import { useBook } from '@/context/bookContext';
import useAuthMiddleware from '@/hooks/auth';
import { useAuth } from '@/context/authContext';

interface Book {
  id: number;
  judul: string;
  cover: string;
  path?: string;
  kategori?: string;
  sekolah?: string;
}

function Page() {
  useAuthMiddleware();
  const router = useRouter();
  const { user } = useAuth();
  const { guruBooks, fetchGuruBooks } = useBook();
  const [mappedBooks, setMappedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true); // loading state

  useEffect(() => {
    if (user) {
      if (user.role === 'Admin') {
        router.push('/admin');
      } else if (user.role === 'Guru') {
        // tetap di halaman ini
      } else if (user.role === 'Perpus') {
        router.push('/perpustakaan');
      } else {
        router.push('/homepage');
      }
    }
  }, [user, router]);

  useEffect(() => {
    setIsLoading(true);
    fetchGuruBooks().finally(() => setIsLoading(false));
  }, [fetchGuruBooks]);

  useEffect(() => {
    if (guruBooks) {
      const processedBooks = guruBooks.map((book: Book) => {
        const coverUrl = book.cover
          ? `http://localhost:8000/storage/${book.cover}`
          : '/assets/default-cover.png';

        return {
          id: book.id,
          judul: book.judul,
          cover: coverUrl,
          path: `/homepage_guru/Buku?id=${book.id}`,
          kategori: book.kategori,
          sekolah: book.sekolah
        };
      });
      setMappedBooks(processedBooks);
    }
  }, [guruBooks]);

  const handleBookClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 overflow-y-auto">
      <header className="flex justify-between items-center mb-4">
        <Navbar />
      </header>

      <div className="mb-8 flex items-center pt-20 px-8">
        <p className="text-xl font-semibold text-left font-poppins translate-y-[-15px]">
          Buku Ajar Anda
        </p>
      </div>

      {isLoading ? (
        // Spinner Loading Merah di tengah
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {mappedBooks.map((book, index) => (
            <div
              key={index}
              className="text-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
              onClick={() => handleBookClick(book.path!)}
            >
              <Image
                src={book.cover}
                alt={book.judul}
                width={150}
                height={200}
                priority={index < 3} // Hilangkan warning LCP
                className="mx-auto rounded-lg shadow-md"
                onError={(e) => {
                  console.error(`Gagal memuat gambar: ${book.cover}`);
                  e.currentTarget.src = '/assets/default-cover.png';
                }}
              />
              <p className="mt-2 text-sm font-poppins font-semibold whitespace-pre-line text-center">
                {book.judul}
              </p>
              {book.kategori && (
                <p className="text-xs text-gray-500">Kelas {book.kategori}</p>
              )}
              {book.sekolah && (
                <p className="text-xs text-gray-500">{book.sekolah}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
