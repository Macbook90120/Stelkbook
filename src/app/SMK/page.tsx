'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

function HomePage() {
  const router = useRouter();

  const handleButtonClick = (destination: string) => {
    router.push(`/${destination}`);
  };

  return (
    <div className="min-h-screen p-4 bg-white">
      <Navbar />
      <header className="pt-20 px-8">
        <p className="text-xl font-semibold font-poppins">Studi Anda {'>'} SMA/SMK</p>
      </header>

      <main className="flex flex-col gap-6 pt-6 items-center">
        {/* Kelas X */}
        <button
          onClick={() => handleButtonClick('kelasX')}
          className="flex flex-col items-center pt-6 space-y- w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] py-12 text-white font-bold italic text-4xl text-center rounded-lg bg-green-500 shadow-lg transition-transform duration-300 transform scale-100 sm:scale-105 md:scale-110 lg:scale-115 hover:scale-125"
        >
          Kelas X
        </button>

        {/* Kelas XI */}
        <button
          onClick={() => handleButtonClick('kelasXI')}
          className="flex flex-col items-center pt-6 space-y- w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] py-12 text-white font-bold italic text-4xl text-center rounded-lg bg-fuchsia-700 shadow-lg transition-transform duration-300 transform scale-100 sm:scale-105 md:scale-110 lg:scale-115 hover:scale-125"
        >
          Kelas XI
        </button>

        {/* Kelas XII */}
        <button
          onClick={() => handleButtonClick('kelasXII')}
          className="flex flex-col items-center pt-6 space-y- w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] py-12 text-white font-bold italic text-4xl text-center rounded-lg bg-cyan-600 shadow-lg transition-transform duration-300 transform scale-100 sm:scale-105 md:scale-110 lg:scale-115 hover:scale-125"
        >
          Kelas XII
        </button>
      </main>
    </div>
  );
}

export default HomePage;
