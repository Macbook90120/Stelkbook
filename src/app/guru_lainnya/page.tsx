'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar_Lainnya from '@/components/Navbar_Lainnya_Guru';

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
    router.push(`/guru_lainnya/${bookName}_Lainnya`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar_Lainnya />

      <main className="pt-20 px-8"></main> {/* Added padding to avoid overlap with navbar */}

      {/* Page Header */}
      <div className="p-8">
        <div className="flex items-center space-x-2 mb-6">
          <h1 className="text-xl font-bold text-gray-800">Studi Anda</h1>
          <Image src="/assets/Kelas_X/Primary_Direct.png" alt="Divider Icon" width={10} height={16} />
          <h2 className="text-xl font-bold text-gray-800">Lainnya</h2>
        </div>

        {/* Books Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          <BookCard
            imageSrc="/assets/Lainnya/History_math.jpeg"
            altText="Buku Sejarah Matematika  "
            title="History of Mathematics Third Edition"
            onClick={() => navigateToBook('History_Math')}
          />
          <BookCard
            imageSrc="/assets/Lainnya/History_math2.jpeg"
            altText="Buku Sejarah Matematika Perkenalan"
            title="History of Mathematics Introduction"
            onClick={() => navigateToBook('History_Math2')}
          />
          <BookCard
            imageSrc="/assets/Lainnya/History_Math3.png"
            altText="Buku Sejarah Matematika"
            title="History of Mathematics Brief Edition"
            onClick={() => navigateToBook('History_Math3')}
          />
          <BookCard
            imageSrc="/assets/Lainnya/Physics_Enginner.jpg"
            altText="Physics Enginner"
            title="Enginnering Physics"
            onClick={() => navigateToBook('Physics_Enginner')}
          />
           <BookCard
            imageSrc="/assets/Lainnya/Chemistry.jpg"
            altText="Chemistry"
            title="Chemistry"
            onClick={() => navigateToBook('Chemistry')}
          />
           <BookCard
            imageSrc="/assets/Lainnya/Organic_Chemistry.jpg"
            altText="Sejarah SMA Kelas X"
            title="Organic Chemistry Second Edition"
            onClick={() => navigateToBook('Organic_Chemistry')}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
