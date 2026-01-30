'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar_Guru from '@/components/Navbar_Guru';

const classes = [
  { name: 'Kelas I', color: 'bg-pink-400', route: '/kelasI_guru' },
  { name: 'Kelas II', color: 'bg-blue-500', route: '/kelasII_guru' },
  { name: 'Kelas III', color: 'bg-teal-400', route: '/kelasIII_guru' },
  { name: 'Kelas IV', color: 'bg-purple-500', route: '/kelasIV_guru' },
  { name: 'Kelas V', color: 'bg-orange-500', route: '/kelasV_guru' },
  { name: 'Kelas VI', color: 'bg-yellow-500', route: '/kelasVI_guru' },
];

const HomePage_Guru = () => {
  const router = useRouter();

  const handleButtonClick = (destination: string) => {
    router.push(destination);
  };

  const handleStudiAndaClick = () => {
    router.push('/homepage_guru');
  };

  return (
    <div className="min-h-screen p-8 bg-white">
      <Navbar_Guru />
      <header className="flex justify-between items-center pt-20 px-8">
        <div>
          <p className="text-2xl font-semibold text-left font-poppins">
            <span
              className="cursor-pointer hover:underline"
              onClick={handleStudiAndaClick}
            >
              Studi Anda
            </span> &gt; <span className="font-bold">SD</span>
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 place-items-center mt-6 mx-auto max-w-4xl px-4">
        {classes.map((cls) => (
          <div
            key={cls.name}
            className={`relative ${cls.color} w-full aspect-square max-w-[160px] sm:max-w-[192px] md:max-w-[256px] rounded-xl text-white font-bold italic text-xl sm:text-2xl md:text-3xl shadow-xl hover:opacity-100 transition transform hover:scale-105 cursor-pointer overflow-hidden flex items-center justify-center`}
            onClick={() => handleButtonClick(cls.route)}
          >
            <div
              className="absolute inset-0 opacity-20 bg-center bg-cover pointer-events-none"
              style={{ backgroundImage: "url('/assets/texture/011.svg')" }}
            />
            <div className="relative z-10 text-center px-2">
              {cls.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage_Guru;
