'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar_Perpus';

function Page() {
  const router = useRouter();

  const handleNavigationClick = (path: string) => {
    router.push(path);
  };

  const books = [
    {
      title: 'Menambahkan Buku',
      image: '/assets/Perpustakaan/Tambahan.png',
      path: '/perpustakaan/Tambah_Buku',
    },
    {
      title: 'Buku paket Agama\nKelas XII SMA',
      image: '/assets/Kelas_XII/Buku_Agama.png',
      path: '/perpustakaan/Buku_XII_perpus/Agama_XII_perpus',
    },
    {
      title: 'Pendidikan Pancasila\nuntuk SMA/MA/SMK/\nMAK Kelas XI',
      image: '/assets/Kelas_XI/Buku_Pancasila.png',
      path: '/perpustakaan/Buku_XI_perpus/Pancasila_XI_perpus',
    },
    {
      title: 'Buku paket Ekonomi\nSMA Kelas X',
      image: '/assets/Kelas_X/Buku_Ekonomi.png',
      path: '/perpustakaan/Buku_X_perpus/Ekonomi_X_perpus',
    },
    {
      title: 'Buku paket Matematika\nUntuk SMA/MA Kelas X\nKelompok Wajib',
      image: '/assets/Kelas_X/Buku_Matematika.png',
      path: '/perpustakaan/Buku_X_perpus/Matematika_X_perpus',
    },
    {
      title: 'Buku paket Bahasa\nIndonesia SMA Kelas X',
      image: '/assets/Kelas_X/Buku_Bahasa_Indonesia.png',
      path: '/perpustakaan/Buku_X_perpus/BahasaIndonesia_X_perpus',
    },
    {
      title: 'Buku paket Sejarah\nIndonesia Untuk SMA/MA\nKelas X',
      image: '/assets/Kelas_X/Buku_Sejarah.png',
      path: '/perpustakaan/Buku_X_perpus/Sejarah_X_perpus',
    },
    {
      title: 'Buku paket Mandiri\nFisika SMA/MA Kelas X',
      image: '/assets/Kelas_X/Buku_Fisika.png',
      path: '/perpustakaan/Buku_X_perpus/Fisika_X_perpus',
    },
    {
      title: 'Buku paket Kimia 1\nSMA Kelas X',
      image: '/assets/Kelas_X/Buku_Kimia.png',
      path: '/perpustakaan/Buku_X_perpus/Kimia_X_perpus',
    },
    {
      title: 'Buku paket Mandiri\nGeografi Untuk SMA/MA\nKelas X',
      image: '/assets/Kelas_XII/Buku_Geografi.png',
      path: '/perpustakaan/Buku_X_perpus/Geografi_X_perpus',
    },
  ];

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
        {books.map((book, index) => (
          <div
            key={index}
            className="text-center cursor-pointer hover:bg-gray-100"
            onClick={() => handleNavigationClick(book.path)}
          >
            <Image
              src={book.image}
              alt={book.title}
              width={150}
              height={200}
              className="mx-auto rounded-lg shadow-md"
            />
            <p className="mt-2 text-sm font-poppins font-semibold whitespace-pre-line text-center">{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
