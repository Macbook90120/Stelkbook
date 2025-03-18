'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar_Admin';
import useAuthMiddleware from '@/hooks/auth';
import { useAuth } from '@/context/authContext';
import { useEffect } from 'react';
function HomePage() {
  useAuthMiddleware();
  const router = useRouter();
  const {user} = useAuth();
   useEffect(() => {
          // Check if user is not null before accessing its properties
          if (user) {
            if (user.role === 'Admin') {
              router.push('/admin');
            } else if (user.role === 'Guru') {
              router.push('/homepage_guru');
            } else if (user.role === 'Perpus') {
              router.push('/perpustakaan');
            } else {
              router.push('/homepage');
            }
          }
        }, [user, router]); 

  const handleButtonClick = (destination: string) => {
    switch (destination) {
      case 'User':
        router.push('/profile');
        break;
      case 'Siswa':
        router.push('/admin/Sekolah_Siswa');
        break;
      case 'Guru':
        router.push('/admin/Data_Guru');
        break;
      case 'Pengurus Perpus':
        router.push('/admin/Data_perpus');
        break;
      case 'Membuat User':
        router.push('/admin/Create_User');
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
