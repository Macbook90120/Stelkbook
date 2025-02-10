'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

function HomePage() {
  const router = useRouter();

  const handleButtonClick = (destination: string) => {
    switch (destination) {
      case 'User':
        router.push('/profile');
        break;
      case 'kelasI':
        router.push('/kelasI');
        break;
      case 'kelasII':
        router.push('/kelasII');
        break;
      case 'kelasIII':
        router.push('/kelasIII');
        break;
      case 'kelasIV':
        router.push('/kelasIV');
        break;
      case 'kelasV':
        router.push('/kelasV');
        break;
      case 'kelasVI':
        router.push('/kelasVI');
        break;
      default:
        console.error('Unknown destination:', destination);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-white">
      <Navbar />
      <header className="flex justify-between items-center pt-20 px-8">
        <div>
          <p className="text-xl font-semibold text-left font-poppins">Studi Anda</p>
        </div>
      </header>

      <main className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-6 pt-4">
        {/* Kelas I */}
        <div className="relative w-full h-56 md:h-64 mx-auto">
          <Image
            src="/assets/Class/Card_KelasX.png"
            alt="Kelas X"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold italic text-3xl lg:text-4xl">Kelas I</p>
            <button
              onClick={() => handleButtonClick('kelasI')}
              className="mt-2 bg-white text-green-500 font-semibold text-sm py-2 px-8 rounded-full"
            >
              Lanjut
            </button>
          </div>
        </div>

        {/* Kelas II */}
        <div className="relative w-full h-56 md:h-64 mx-auto">
          <Image
            src="/assets/Class/Card_KelasXI.png"
            alt="Kelas XI"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold italic text-3xl lg:text-4xl">Kelas II</p>
            <button
              onClick={() => handleButtonClick('kelasII')}
              className="mt-2 bg-white text-pink-500 font-semibold text-sm py-2 px-8 rounded-full"
            >
              Lanjut
            </button>
          </div>
        </div>

        {/* Kelas III */}
        <div className="relative w-full h-56 md:h-64 mx-auto">
          <Image
            src="/assets/Class/Card_KelasXII.png"
            alt="Kelas XII"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold italic text-3xl lg:text-4xl">Kelas III</p>
            <button
              onClick={() => handleButtonClick('kelasIII')}
              className="mt-2 bg-white text-blue-500 font-semibold text-sm py-2 px-8 rounded-full"
            >
              Lanjut
            </button>
          </div>
        </div>

        {/* Kelas IV */}
        <div className="relative w-full h-56 md:h-64 mx-auto">
          <Image
            src="/assets/Class/Card_Lainnya.png"
            alt="Non Akademik"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold italic text-3xl lg:text-4xl">Kelas IV</p>
            <button
              onClick={() => handleButtonClick('kelasIV')}
              className="mt-2 bg-white text-red font-semibold text-sm py-2 px-8 rounded-full"
            >
              Lanjut
            </button>
          </div>
        </div>

        {/* Kelas V */}
        <div className="relative w-full h-56 md:h-64 mx-auto">
          <Image
            src="/assets/Class/Card_KelasV.png"
            alt="Kelas XI"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold italic text-3xl lg:text-4xl">Kelas V</p>
            <button
              onClick={() => handleButtonClick('kelasV')}
              className="mt-2 bg-white text-pink-500 font-semibold text-sm py-2 px-8 rounded-full"
            >
              Lanjut
            </button>
          </div>
        </div>

        {/* Kelas VI */}
        <div className="relative w-full h-56 md:h-64 mx-auto">
          <Image
            src="/assets/Class/Card_KelasVI.png"
            alt="Kelas XII"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold italic text-3xl lg:text-4xl">Kelas VI</p>
            <button
              onClick={() => handleButtonClick('kelasVI')}
              className="mt-2 bg-white text-yellow-700 font-semibold text-sm py-2 px-8 rounded-full"
            >
              Lanjut
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;