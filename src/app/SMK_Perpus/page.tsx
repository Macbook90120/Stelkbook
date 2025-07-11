'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar_Perpus';

function HomePage() {
  const router = useRouter();

  const handleButtonClick = (destination: string) => {
    router.push(`/${destination}`);
  };

  return (
    <div className="min-h-screen p-4 bg-white">
      <Navbar />
      <header className="pt-20 px-8">
        <p className="text-xl font-semibold font-poppins">Studi Anda {'>'} SMK</p>
      </header>

      <main className="flex flex-col gap-10 pt-6 items-center">
        {/* Kelas X */}
        <button
          onClick={() => handleButtonClick('kelasX_perpus')}
          className="flex flex-col items-center pt-8 space-y-4 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] py-16 text-white font-bold italic text-5xl text-center rounded-lg bg-green-500 shadow-lg transition-transform duration-300 transform scale-100 sm:scale-105 md:scale-110 lg:scale-115 hover:scale-125 overflow-hidden"
        >
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-20 bg-center bg-cover pointer-events-none" style={{ backgroundImage: "url('/assets/texture/001.svg')" }} />

          {/* Button Text */}
          Kelas X
        </button>

        {/* Kelas XI */}
        <button
          onClick={() => handleButtonClick('kelasXI_perpus')}
          className="flex flex-col items-center pt-8 space-y-4 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] py-16 text-white font-bold italic text-5xl text-center rounded-lg bg-fuchsia-700 shadow-lg transition-transform duration-300 transform scale-100 sm:scale-105 md:scale-110 lg:scale-115 hover:scale-125 overflow-hidden"
        >
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-20 bg-center bg-cover pointer-events-none" style={{ backgroundImage: "url('/assets/texture/002.svg')" }} />

          {/* Button Text */}
          Kelas XI
        </button>

        {/* Kelas XII */}
        <button
          onClick={() => handleButtonClick('kelasXII_perpus')}
          className="flex flex-col items-center pt-8 space-y-4 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] py-16 text-white font-bold italic text-5xl text-center rounded-lg bg-cyan-600 shadow-lg transition-transform duration-300 transform scale-100 sm:scale-105 md:scale-110 lg:scale-115 hover:scale-125 overflow-hidden"
        >
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-20 bg-center bg-cover pointer-events-none" style={{ backgroundImage: "url('/assets/texture/003.svg')" }} />

          {/* Button Text */}
          Kelas XII
        </button>
      </main>
    </div>
  );
}

export default HomePage;