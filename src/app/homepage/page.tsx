'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/authContext';
import useAuthMiddleware from '@/hooks/auth';


function HomePage() {
  useAuthMiddleware(); // Pastikan useAuthMiddleware sudah diimplementasikan dengan benar
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return; // Pastikan user sudah diinisialisasi

    // Redirect berdasarkan role
    switch (user.role) {
      case 'admin':
        router.push('/admin'); // Admin diarahkan ke dashboard admin
        break;
      case 'perpus':
        router.push('/perpustakaan'); // Perpus diarahkan ke dashboard perpustakaan
        break;
      case 'guru':
        router.push('/homepage_guru')
        break;
      case 'siswa':
        router.push('/homepage')
        // Siswa dan guru tetap di halaman ini
        break;
      default:
        router.push('/homepage'); // Role tidak valid, arahkan ke homepage default
    }
  }, [user, router]);

  const handleButtonClick = (destination: string) => {
    const routes: Record<string, string> = {
      'User': '/profile',
      'SD': '/SD',
      'SMP': '/SMP',
      'SMA/SMK': '/SMK',
      'Non Akademik': '/lainnya',
    };

    if (routes[destination]) {
      router.push(routes[destination]);
    } else {
      console.error('Unknown destination:', destination);
    }
  };

  // Jika role adalah admin atau perpus, jangan render konten SD, SMP, SMK
  if (user?.role === 'admin' || user?.role === 'perpus') {
    return null; // Atau tampilkan pesan "Anda tidak memiliki akses ke halaman ini"
  }

  return (
    <div className="min-h-screen p-4 bg-white">
      <Navbar />
      <header className="flex justify-between items-center pt-20 px-8">
        <div>
          <p className="text-xl font-semibold text-left font-poppins">Studi Anda</p>
        </div>
      </header>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-4">
        {[
          { title: 'SD', image: '/assets/Homepage-Front/sd.png' },
          { title: 'SMP', image: '/assets/Homepage-Front/smp.png' },
          { title: 'SMA/SMK', image: '/assets/Homepage-Front/smk.png' },
          { title: 'Non Akademik', image: '/assets/Homepage-Front/NonAkademik.png' },
        ].map(({ title, image }) => (
          <div key={title} className="flex w-full h-56 md:h-64 bg-OldRed rounded-lg overflow-hidden">
            <div className="flex flex-col justify-end p-4 w-1/2">
              <p className="text-white font-bold italic text-3xl lg:text-4xl">{title}</p>
              <button
                onClick={() => handleButtonClick(title)}
                className="mt-2 bg-white text-OldRed font-semibold text-sm py-2 px-8 rounded-full min-w-28 max-w-40"
              >
                Lanjut
              </button>
            </div>
            <div className="relative w-1/2 h-full">
              <Image src={image} alt={title} fill className="object-cover" />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default HomePage;