'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar_Lainnya_Perpus2';
import useAuthMiddleware from '@/hooks/auth';
import { useAuth } from '@/context/authContext';
import { useEffect } from 'react';
function HomePage() {
  const router = useRouter();
 

  const handleButtonClick = (destination: string) => {
    switch (destination) {
      case 'User':
        router.push('/profile');
        break;
      case 'Siswa':
        router.push('/admin_perpus/Sekolah_Siswa');
        break;
      case 'Guru':
        router.push('/admin_perpus/Sekolah_Guru');
        break;
      case 'Pengurus Perpus':
        router.push('/admin_perpus/Data_perpus');
        break;
      case 'Membuat User':
        router.push('/admin_perpus/Create_User');
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
          <p className="text-xl font-semibold text-left font-poppins">Database Anda</p>
        </div>
      </header>

      <main className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-6 pt-4">
        {/* Siswa*/}
        <div className="relative w-full h-56 md:h-64 mx-auto">
          <Image
            src="/assets/Admin/Card_Admin.png"
            alt="Siswa"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold italic text-3xl lg:text-4xl">Siswa</p>
            <button
              onClick={() => handleButtonClick('Siswa')}
              className="mt-2 bg-white text-red font-semibold text-sm py-2 px-8 rounded-full"
            >
              Lanjut
            </button>
          </div>
        </div>

        {/* Guru */}
        <div className="relative w-full h-56 md:h-64 mx-auto">
          <Image
            src="/assets/Admin/Card_Admin.png"
            alt="Guru"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold italic text-3xl lg:text-4xl">Guru</p>
            <button
              onClick={() => handleButtonClick('Guru')}
              className="mt-2 bg-white text-red font-semibold text-sm py-2 px-8 rounded-full"
            >
              Lanjut
            </button>
          </div>
        </div>

        {/* Pengurus Perpustakaan */}
        <div className="relative w-full h-56 md:h-64 mx-auto">
          <Image
            src="/assets/Admin/Card_Admin.png"
            alt="Pengurus Perpus"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold italic text-3xl lg:text-4xl">Pengurus Perpustakaan</p>
            <button
              onClick={() => handleButtonClick('Pengurus Perpus')}
              className="mt-2 bg-white text-red font-semibold text-sm py-2 px-8 rounded-full"
            >
              Lanjut
            </button>
          </div>
        </div>

        {/* Membuat User */}
        <div className="relative w-full h-56 md:h-64 mx-auto">
          <Image
            src="/assets/Admin/Card_Admin.png"
            alt="Membuat User"
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <p className="text-white font-bold italic text-3xl lg:text-4xl">Membuat User</p>
            <button
              onClick={() => handleButtonClick('Membuat User')}
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
