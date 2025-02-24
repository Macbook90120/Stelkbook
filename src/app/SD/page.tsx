'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

const classesTop = [
  { name: 'Kelas I', color: 'bg-pink-400', route: '/kelasI' },
  { name: 'Kelas II', color: 'bg-blue-500', route: '/kelasII' },
  { name: 'Kelas III', color: 'bg-teal-400', route: '/kelasIII' },
];

const classesBottom = [
  { name: 'Kelas IV', color: 'bg-purple-500', route: '/kelasIV' },
  { name: 'Kelas V', color: 'bg-orange-500', route: '/kelasV' },
  { name: 'Kelas VI', color: 'bg-yellow-400', route: '/kelasVI' },
];

const HomePage = () => {
  const router = useRouter();

  const handleButtonClick = (destination: string) => {
    router.push(destination);
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <Navbar />
      <header className="flex justify-between items-center pt-20 px-8">
        <div>
          <p className="text-xl font-semibold text-left font-poppins">Studi Anda &gt; <span className="font-bold">SD</span></p>
        </div>
      </header>

      {/* Grid for Kelas I, II, III */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center mt-4 mx-auto max-w-3xl translate-y-[20px]">
        {classesTop.map((cls) => (
          <div
            key={cls.name}
            className={`${cls.color} w-52 h-52 flex items-center justify-center rounded-lg text-white font-bold italic text-xl shadow-lg hover:opacity-80 transition transform hover:scale-105 cursor-pointer`}
            onClick={() => handleButtonClick(cls.route)}
          >
            {cls.name}
          </div>
        ))}
      </div>

      {/* Grid for Kelas IV, V, VI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center mt-6 mx-auto max-w-3xl translate-y-[38px]">
        {classesBottom.map((cls) => (
          <div
            key={cls.name}
            className={`${cls.color} w-52 h-52 flex items-center justify-center rounded-lg text-white font-bold italic text-xl shadow-lg hover:opacity-80 transition transform hover:scale-105 cursor-pointer`}
            onClick={() => handleButtonClick(cls.route)}
          >
            {cls.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;