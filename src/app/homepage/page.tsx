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
      case 'SD':
        router.push('/SD');
        break;
      case 'SMP':
        router.push('/SMP');
        break;
      case 'SMK':
        router.push('/SMK');
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
        {/* SD */}
        <div className="relative w-full h-56 md:h-64 mx-auto">
          <Image
            src="/assets/Class/Card_KelasX.png"
            alt="Kelas X"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold italic text-3xl lg:text-4xl">SD</p>
            <button
              onClick={() => handleButtonClick('SD')}
              className="mt-2 bg-white text-green-500 font-semibold text-sm py-2 px-8 rounded-full"
            >
              Lanjut
            </button>
          </div>
        </div>

        {/* SMP */}
        <div className="relative w-full h-56 md:h-64 mx-auto">
          <Image
            src="/assets/Class/Card_KelasXI.png"
            alt="Kelas XI"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold italic text-3xl lg:text-4xl">SMP</p>
            <button
              onClick={() => handleButtonClick('SMP')}
              className="mt-2 bg-white text-pink-500 font-semibold text-sm py-2 px-8 rounded-full"
            >
              Lanjut
            </button>
          </div>
        </div>

        {/* SMK */}
        <div className="relative w-full h-56 md:h-64 mx-auto">
          <Image
            src="/assets/Class/Card_KelasXII.png"
            alt="Kelas XII"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold italic text-3xl lg:text-4xl">SMK</p>
            <button
              onClick={() => handleButtonClick('SMK')}
              className="mt-2 bg-white text-blue-500 font-semibold text-sm py-2 px-8 rounded-full"
            >
              Lanjut
            </button>
          </div>
        </div>

        {/* Non Akademik */}
        <div className="relative w-full h-56 md:h-64 mx-auto">
          <Image
            src="/assets/Class/Card_Lainnya.png"
            alt="Non Akademik"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold italic text-3xl lg:text-4xl">Non Akademik</p>
            <button
              onClick={() => handleButtonClick('Non Akademik')}
              className="mt-2 bg-white text-red font-semibold text-sm py-2 px-8 rounded-full"
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
