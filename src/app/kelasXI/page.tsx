'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

const BookCard = ({ imageSrc, altText, title, onClick }: any) => (
  <div
    className="bg-white hover:bg-gray-100 rounded-lg p-4 cursor-pointer flex flex-col items-center transition-colors duration-200"
    onClick={onClick}
  >
    <Image src={imageSrc} alt={altText} width={150} height={200} className="rounded-md" />
    <p className="mt-4 text-center text-sm font-semibold font-poppins">{title}</p>
  </div>
);

function Page() {
  const router = useRouter();

  const navigateToBook = (bookName: string) => {
    router.push(`/kelasXI/${bookName}_XI`);
  };

  const handleStudiClick = () => {
    router.push('/SMK');
  };

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
            onClick={handleStudiClick}
          >
            Studi Anda
          </h1>
          <Image src="/assets/Kelas_X/Primary_Direct.png" alt="Divider Icon" width={10} height={16} />
          <h2 className="text-xl font-bold text-gray-800">Kelas XI</h2>
        </div>

        {/* Books Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          <BookCard
            imageSrc="/assets/Kelas_XI/Buku_Ekonomi.png"
            altText="Ekonomi SMA Kelas XI"
            title="Buku paket Ekonomi Kelas XI"
            onClick={() => navigateToBook('Ekonomi')}
          />
          <BookCard
            imageSrc="/assets/Kelas_XI/Buku_Matematika.png"
            altText="Matematika SMA Kelas XI"
            title="Buku paket Matematika Kelas XI"
            onClick={() => navigateToBook('Matematika')}
          />
          <BookCard
            imageSrc="/assets/Kelas_XI/Buku_Bahasa_Indonesia.png"
            altText="Bahasa Indonesia SMA Kelas XI"
            title="Buku paket Bahasa Indonesia Kelas XI"
            onClick={() => navigateToBook('BahasaIndonesia')}
          />
          <BookCard
            imageSrc="/assets/Kelas_XI/Buku_Sejarah.png"
            altText="Sejarah SMA Kelas XI"
            title="Buku paket Sejarah Kelas XI"
            onClick={() => navigateToBook('Sejarah')}
          />
          <BookCard
            imageSrc="/assets/Kelas_XI/Buku_Fisika.png"
            altText="Fisika SMA Kelas XI"
            title="Buku paket Fisika Kelas XI"
            onClick={() => navigateToBook('Fisika')}
          />
          <BookCard
            imageSrc="/assets/Kelas_XI/Buku_Kimia.png"
            altText="Kimia SMA Kelas XI"
            title="Buku paket Kimia Kelas XI"
            onClick={() => navigateToBook('Kimia')}
          />
          <BookCard
            imageSrc="/assets/Kelas_XI/Buku_Geografi.png"
            altText="Geografi SMA Kelas XI"
            title="Buku paket Geografi Kelas XI"
            onClick={() => navigateToBook('Geografi')}
          />
          <BookCard
            imageSrc="/assets/Kelas_XI/Buku_Pancasila.png"
            altText="Pancasila SMA Kelas XI"
            title="Buku paket Pancasila Kelas XI"
            onClick={() => navigateToBook('Pancasila')}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
