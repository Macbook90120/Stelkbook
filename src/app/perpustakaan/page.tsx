'use client';

import Image from 'next/image';
import { FaUserCircle, FaCheck, FaTimes, FaPlus, FaBook } from 'react-icons/fa';
import Navbar from '@/components/Navbar_Lainnya_Perpus2';
import { useRouter } from 'next/navigation';
import useAuthMiddleware from '@/hooks/auth';
import { useAuth } from '@/context/authContext';
import { useEffect } from 'react';

export default function Home() {
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

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-10">
      <Navbar />

      <div className="px-6 mt-6 pt-20 space-y-6">
        <h1 className="text-xl font-semibold text-gray-800">Selamat datang, {user?.username}</h1>

        {/* Atas: Buku & Kunjungan Hari Ini */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kiri: Tambah Buku dan Daftar Buku */}
          <div className="flex gap-4">
{/* Tambah Buku */}
<div className="w-[324px] h-56 md:h-64 bg-gradient-to-tr from-indigo-700 to-purple-600 text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group">
  <FaPlus size={36} className="group-hover:scale-110 transition-transform duration-300" />
  <p className="mt-3 text-white font-bold italic text-2xl lg:text-3xl leading-snug group-hover:underline"
  onClick={() => handleNavigation('/perpustakaan/Tambah_Buku')}>
    Tambah Buku
  </p>
</div>

{/* Daftar Buku */}
<div className="w-[324px] h-56 md:h-64 bg-gradient-to-tr from-rose-600 to-red-500 text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group">
  <FaBook size={36} className="group-hover:scale-110 transition-transform duration-300" />
  <p className="mt-3 text-white font-bold italic text-2xl lg:text-3xl leading-snug group-hover:underline"
  onClick={() => handleNavigation('/perpustakaan/Daftar_Buku')}>
    Daftar Buku
  </p>
</div>
          </div>

          {/* Kunjungan Hari Ini */}
          <div className="relative w-full h-56 md:h-64 mx-auto rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
            <Image
              src="/assets/Admin/Card_Admin.png"
              alt="Kunjungan Hari Ini"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <p className="text-white font-bold italic text-2xl lg:text-3xl leading-snug">
                Kunjungan Hari ini: {'\n'} 1 Pengunjung
              </p>
              <button
                onClick={() => handleNavigation('perpustakaan/kunjungan')}
                className="mt-2 bg-white text-red-600 font-semibold text-sm py-2 px-8 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-200"
              >
                Lanjut
              </button>
            </div>
          </div>
        </div>

        {/* Bawah: Persetujuan Registrasi & Daftar Database */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Persetujuan Registrasi */}
          <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 p-5 rounded-2xl w-full max-w-[672px]">
            <h2 className="text-lg font-bold mb-4 text-center text-gray-800">
              Persetujuan Registrasi
            </h2>
            {[
              { name: 'Mac Renfred Matarru Mapandin', nis: '544231094' },
              { name: 'Nama User', nis: 'NIS User' },
              { name: 'Nama User', nis: 'NIS User' },
            ].map((user, i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-200 py-3">
                <div className="flex items-center gap-3">
                  <FaUserCircle size={30} className="text-gray-500" />
                  <div>
                    <p className="font-semibold text-sm text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.nis}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-green-500 hover:text-green-600 transition-colors duration-200">
                    <FaCheck />
                  </button>
                  <button className="text-red-500 hover:text-red-600 transition-colors duration-200">
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Daftar Database */}
          <div className="relative w-full h-56 md:h-64 mx-auto rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
            <Image
              src="/assets/Admin/Card_Admin.png"
              alt="Daftar Database"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <p className="text-white font-bold italic text-3xl lg:text-4xl">Daftar Database</p>
              <button
                onClick={() => handleNavigation('/admin')}
                className="mt-2 bg-white text-red-600 font-semibold text-sm py-2 px-8 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-200"
              >
                Lanjut
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}