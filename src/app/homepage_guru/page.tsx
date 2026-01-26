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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const role = user.role.toLowerCase();
      if (role === 'admin' || role === 'perpus' || role === 'pengurusperpustakaan') {
        router.push('/perpustakaan');
      } else if (role === 'guru') {
        // tetap di halaman ini
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
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50 overflow-y-auto">
      <header className="flex justify-between items-center mb-4">
        <Navbar />
      </header>

      <div className="mb-8 flex items-center pt-20 px-2 sm:px-8">
        <p className="text-xl font-semibold font-poppins translate-y-[-15px]">
          Buku Ajar Anda
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
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
          {mappedBooks.map((book, index) => (
            <div
              key={book.id}
              className="text-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg w-full max-w-[180px]"
              onClick={() => handleBookClick(book.path!)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') handleBookClick(book.path!) }}
            >
              <div className="relative w-full pb-[133%] rounded-lg overflow-hidden shadow-md mx-auto">
                <Image
                  src={book.cover}
                  alt={book.judul}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 180px"
                  priority={index === 0}
                  className="object-cover rounded-lg"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/default-cover.png';
                  }}
                />
              </div>
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
