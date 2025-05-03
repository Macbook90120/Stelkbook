'use client';

import Image from 'next/image';
import { FaUserCircle, FaCheck, FaTimes, FaPlus, FaBook } from 'react-icons/fa';
import Navbar from '@/components/Navbar_Lainnya_Perpus2';
import { useRouter } from 'next/navigation';
import useAuthMiddleware from '@/hooks/auth';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';

export default function Home() {
  useAuthMiddleware();
  const router = useRouter();
  const { user, fetchPendingUsers, approveUser, rejectUser } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const loadPendingUsers = async () => {
      try {
        const users = await fetchPendingUsers();
        setPendingUsers(users);
      } catch (error) {
        console.error("Failed to fetch pending users:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPendingUsers();
  }, [fetchPendingUsers]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleApprove = async (id: number) => {
    try {
      await approveUser(id);
      // Refresh the pending users list
      const updatedUsers = await fetchPendingUsers();
      setPendingUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to approve user:", error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectUser(id);
      // Refresh the pending users list
      const updatedUsers = await fetchPendingUsers();
      setPendingUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to reject user:", error);
    }
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
                className="mt-2 bg-white text-red font-semibold text-sm py-2 px-8 rounded-full hover:bg-red hover:text-white transition-colors duration-200"
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
            
            {loading ? (
              <div className="flex justify-center py-4">
                <p>Memuat data...</p>
              </div>
            ) : pendingUsers.length === 0 ? (
              <div className="flex justify-center py-4">
                <p>Tidak ada permintaan registrasi</p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto pr-2">
                {pendingUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between border-b border-gray-200 py-3">
                    <div className="flex items-center gap-3">
                      <FaUserCircle size={30} className="text-gray-500" />
                      <div>
                        <p className="font-semibold text-sm text-gray-700">{user.username}</p>
                        <p className="text-xs text-gray-500">
                          {user.role === 'Siswa' ? `NIS: ${user.kode}` : `NIP: ${user.kode}`}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleApprove(user.id)}
                        className="text-green-500 hover:text-green-600 transition-colors duration-200"
                        title="Setujui"
                      >
                        <FaCheck />
                      </button>
                      <button 
                        onClick={() => handleReject(user.id)}
                        className="text-red-500 hover:text-red-600 transition-colors duration-200"
                        title="Tolak"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                onClick={() => handleNavigation('/admin_perpus')}
                className="mt-2 bg-white text-red font-semibold text-sm py-2 px-8 rounded-full hover:bg-red hover:text-white transition-colors duration-200"
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