'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar_Perpus';

function HomePage() {
  const router = useRouter();

  const handleButtonClick = (destination: string) => {
    router.push(`/${destination}`);
  };

  const classes = [
    { name: 'Kelas VII', route: 'kelasVII_perpus', color: 'bg-pink-400', texture: '/assets/texture/004.svg' },
    { name: 'Kelas VIII', route: 'kelasVIII_perpus', color: 'bg-blue-500', texture: '/assets/texture/007.svg' },
    { name: 'Kelas IX', route: 'kelasIX_perpus', color: 'bg-teal-500', texture: '/assets/texture/008.svg' },
  ];

  return (
    <div className="min-h-screen p-4 bg-white">
      <Navbar />
      <header className="pt-20 px-8 text-center sm:text-left">
        <p className="text-xl font-semibold font-poppins">Studi Anda {'>'} SMP</p>
      </header>

      <main className="flex justify-center pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 place-items-center mt-6 mx-auto max-w-4xl px-4">
          {classes.map((cls) => (
            <div
              key={cls.name}
              className={`relative ${cls.color} w-full aspect-square max-w-[160px] sm:max-w-[192px] md:max-w-[256px] rounded-xl text-white font-bold italic text-xl sm:text-2xl md:text-3xl shadow-xl hover:opacity-100 transition transform hover:scale-105 cursor-pointer overflow-hidden flex items-center justify-center`}
              onClick={() => handleButtonClick(cls.route)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleButtonClick(cls.route);
                }
              }}
            >
              <div
                className="absolute inset-0 opacity-20 bg-center bg-cover pointer-events-none"
                style={{ backgroundImage: `url('${cls.texture}')` }}
              />
              <div className="relative z-10 text-center px-2">
                {cls.name}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;
