'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar_Admin';

function HomePage() {
  const router = useRouter();

  const handleButtonClick = (destination: string) => {
    router.push(`/${destination}`);
  };

  const handleButtonClicked = (destination: string) => {
    router.push(`/${destination}`);
  };

  return (
    <div className="min-h-screen p-4 bg-white">
      <Navbar />
      <header className="pt-20 px-8">
        <p className="text-xl font-semibold font-poppins hover:underline cursor-pointer"
        onClick={() => handleButtonClicked('admin/')}>
          Database anda {'>'} Guru</p>
      </header>

      <main className="flex flex-col gap-10 pt-6 items-center">
        {/* SD */}
        <button
          onClick={() => handleButtonClick('admin/Sekolah_Guru/Data_SD')}
          className="relative flex flex-col items-center pt-8 space-y-4 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] py-16 text-white font-bold italic text-5xl text-center rounded-lg bg-green-500 shadow-lg transition-transform duration-300 transform scale-100 sm:scale-105 md:scale-110 lg:scale-115 hover:scale-125 overflow-hidden"
        >
          {/* Texture overlay */}
          <div
            className="absolute inset-0 bg-center bg-cover opacity-10 pointer-events-none"
            style={{ backgroundImage: "url('/assets/texture/008.svg')" }}
          />

          {/* Text content */}
          <div className="relative z-10">
            SD
          </div>
        </button>


        {/* SMP */}
        <button
          onClick={() => handleButtonClick('admin/Sekolah_Guru/Data_SMP')}
          className="relative flex flex-col items-center pt-8 space-y-4 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] py-16 text-white font-bold italic text-5xl text-center rounded-lg bg-fuchsia-700 shadow-lg transition-transform duration-300 transform scale-100 sm:scale-105 md:scale-110 lg:scale-115 hover:scale-125 overflow-hidden"
        >
          {/* Texture overlay */}
          <div
            className="absolute inset-0 bg-center bg-cover opacity-10 pointer-events-none"
            style={{ backgroundImage: "url('/assets/texture/005.svg')" }}
          />

          {/* Text content */}
          <div className="relative z-10">
            SMP
          </div>
        </button>


        {/* SMA/SMK */}
        <button
          onClick={() => handleButtonClick('admin/Sekolah_Guru/Data_SMK')}
          className="relative flex flex-col items-center pt-8 space-y-4 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] py-16 text-white font-bold italic text-5xl text-center rounded-lg bg-cyan-600 shadow-lg transition-transform duration-300 transform scale-100 sm:scale-105 md:scale-110 lg:scale-115 hover:scale-125 overflow-hidden"
        >
          {/* Texture overlay */}
          <div
            className="absolute inset-0 bg-center bg-cover opacity-10 pointer-events-none"
            style={{ backgroundImage: "url('/assets/texture/004.svg')" }}
          />

          {/* Text content */}
          <div className="relative z-10">
            SMA/SMK
          </div>
        </button>

      </main>
    </div>
  );
}

export default HomePage;