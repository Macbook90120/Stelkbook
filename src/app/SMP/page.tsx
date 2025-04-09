'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

function HomePage() {
  const router = useRouter();

  const handleButtonClick = (destination: string) => {
    router.push(`/${destination}`);
  };

  const handleStudiAndaClick = () => {
    router.push('/homepage'); // or your homepage route if different
  };

  return (
    <div className="min-h-screen p-4 bg-white">
      <Navbar />
      <header className="pt-20 px-8">
        <p className="text-xl font-semibold font-poppins">
          <span
            className="cursor-pointer hover:underline"
            onClick={handleStudiAndaClick}
          >
            Studi Anda
          </span> {'>'} SMP
        </p>
      </header>

      <main className="flex flex-col gap-10 pt-6 items-center">
        {/* Kelas VII */}
        <button
          onClick={() => handleButtonClick('kelasVII')}
          className="relative flex flex-col items-center pt-8 space-y-4 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] py-16 text-white font-bold italic text-5xl text-center rounded-lg bg-pink-400 shadow-lg transition-transform duration-300 transform scale-100 sm:scale-105 md:scale-110 lg:scale-115 hover:scale-125 overflow-hidden"
        >
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-20 bg-center bg-cover pointer-events-none" style={{ backgroundImage: "url('/assets/texture/004.svg')" }} />

          {/* Button Text */}
          Kelas VII
        </button>


        {/* Kelas VIII */}
        <button
          onClick={() => handleButtonClick('kelasVIII')}
          className="relative flex flex-col items-center pt-8 space-y-4 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] py-16 text-white font-bold italic text-5xl text-center rounded-lg bg-blue-500 shadow-lg transition-transform duration-300 transform scale-100 sm:scale-105 md:scale-110 lg:scale-115 hover:scale-125 overflow-hidden"
        >
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-20 bg-center bg-cover pointer-events-none" style={{ backgroundImage: "url('/assets/texture/007.svg')" }} />

          {/* Button Text */}
          Kelas VIII
        </button>


        {/* Kelas IX */}
        <button
          onClick={() => handleButtonClick('kelasIX')}
          className="relative flex flex-col items-center pt-8 space-y-4 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] py-16 text-white font-bold italic text-5xl text-center rounded-lg bg-teal-500 shadow-lg transition-transform duration-300 transform scale-100 sm:scale-105 md:scale-110 lg:scale-115 hover:scale-125 overflow-hidden"
        >
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-20 bg-center bg-cover pointer-events-none" style={{ backgroundImage: "url('/assets/texture/008.svg')" }} />

          {/* Button Text */}
          Kelas IX
        </button>

      </main>
    </div>
  );
}

export default HomePage;