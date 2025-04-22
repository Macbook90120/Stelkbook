'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar_Lainnya_Perpus';

const classes = [
  { name: 'Kelas I', color: 'bg-pink-400', route: '/kelasI_perpus' },
  { name: 'Kelas II', color: 'bg-blue-500', route: '/kelasII_perpus' },
  { name: 'Kelas III', color: 'bg-teal-400', route: '/kelasIII_perpus' },
  { name: 'Kelas IV', color: 'bg-purple-500', route: '/kelasIV_perpus' },
  { name: 'Kelas V', color: 'bg-orange-500', route: '/kelasV_perpus' },
  { name: 'Kelas VI', color: 'bg-yellow-400', route: '/kelasVI_perpus' },
];

const HomePage = () => {
  const router = useRouter();

  const handleButtonClick = (destination: string) => {
    router.push(destination);
  };

  return (
    <div className="min-h-screen p-8 bg-white">
      <Navbar />
      <header className="flex justify-between items-center pt-20 px-8">
        <div>
          <p className="text-2xl font-semibold text-left font-poppins">Studi Anda &gt; <span className="font-bold">SD</span></p>
        </div>
      </header>

      {/* Combined Grid for Kelas I - VI */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 place-items-center mt-6 mx-auto max-w-4xl">
        {classes.map((cls) => (
          <div
          key={cls.name}
          className={`relative ${cls.color} w-64 h-64 rounded-xl text-white font-bold italic text-3xl shadow-xl hover:opacity-100 transition transform hover:scale-110 cursor-pointer overflow-hidden`}
          onClick={() => handleButtonClick(cls.route)}
        >
          {/* Texture overlay */}
          <div
            className="absolute inset-0 opacity-20 bg-center bg-cover pointer-events-none"
            style={{ backgroundImage: "url('/assets/texture/011.svg')" }}
          />
           {/* Class name */}
           <div className="relative flex items-center justify-center h-full w-full">
              {cls.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
