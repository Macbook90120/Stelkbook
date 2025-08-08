'use client';

import Image from 'next/image';
import { FaUserCircle, FaCheck, FaTimes, FaPlus, FaBook } from 'react-icons/fa';
import Navbar from '@/components/Navbar_Lainnya_Perpus2';
import { useRouter } from 'next/navigation';
import useAuthMiddleware from '@/hooks/auth';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { FaBookOpen } from 'react-icons/fa6';

export default function Home() {
  useAuthMiddleware();
  const router = useRouter();
  const { user, fetchPendingUsers, approveUser, rejectUser } = useAuth();
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPending, setLoadingPending] = useState(true);

  // Cek status user & redirect
  useEffect(() => {
    if (user) {
      setLoadingUser(false); // user sudah siap
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

  // Ambil pending users
  useEffect(() => {
    const loadPendingUsers = async () => {
      try {
        const users = await fetchPendingUsers();
        setPendingUsers(users);
      } catch (error) {
        console.error("Failed to fetch pending users:", error);
      } finally {
        setLoadingPending(false);
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
      const updatedUsers = await fetchPendingUsers();
      setPendingUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to approve user:", error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectUser(id);
      const updatedUsers = await fetchPendingUsers();
      setPendingUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to reject user:", error);
    }
  };

  const loading = loadingUser || loadingPending;

  return (
    <main className="min-h-screen bg-gray-50 pb-10">
      {/* Spinner merah full halaman sampai user & pendingUsers siap */}
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-red-500 font-semibold">Memuat...</p>
        </div>
      )}

      <Navbar />

      {!loading && (
        <div className="px-6 mt-6 pt-20 space-y-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Selamat datang, {user?.username}
          </h1>

          {/* Atas: Tambah Buku, Daftar Buku, Pengunjung, Kunjungan Buku */}
          <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl w-full">
              {[
                {
                  title: 'Tambah Buku',
                  icon: <FaPlus size={36} />,
                  path: '/perpustakaan/Tambah_Buku',
                  gradient: 'from-indigo-700 to-purple-600',
                },
                {
                  title: 'Daftar Buku',
                  icon: <FaBook size={36} />,
                  path: '/perpustakaan/Daftar_Buku',
                  gradient: 'from-rose-600 to-red-500',
                },
                {
                  title: 'Pengunjung',
                  icon: <FaUserCircle size={36} />,
                  path: '/perpustakaan/kunjungan',
                  gradient: 'from-green-600 to-emerald-500',
                },
                {
                  title: 'Review Buku',
                  icon: <FaBookOpen size={36} />,
                  path: '/perpustakaan/kunjungan_buku',
                  gradient: 'from-blue-600 to-cyan-500',
                },
              ].map(({ title, icon, path, gradient }, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(path)}
                  className={`relative cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center aspect-square md:h-64 bg-gradient-to-tr ${gradient} text-white`}
                >
                  <div className="absolute inset-0">
                    <Image
                      src="/assets/texture/008.svg"
                      alt="texture"
                      fill
                      className="object-cover opacity-10 rounded-2xl"
                      priority
                    />
                  </div>
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {icon}
                    </div>
                    <p className="mt-3 font-bold italic text-2xl lg:text-3xl leading-snug group-hover:underline text-center">
                      {title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bawah: Persetujuan Registrasi & Daftar Database */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 max-w-6xl w-full">
              
              {/* Persetujuan Registrasi */}
              <div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 p-5 rounded-2xl w-full max-w-[672px]">
                <h2 className="text-lg font-bold mb-4 text-center text-gray-800">
                  Persetujuan Registrasi
                </h2>

                {pendingUsers.length === 0 ? (
                  <div className="flex justify-center py-4">
                    <p>Tidak ada permintaan registrasi</p>
                  </div>
                ) : (
                  <div className="max-h-[240px] overflow-y-auto pr-2">
                    {pendingUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between border-b border-gray-200 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <FaUserCircle size={30} className="text-gray-500" />
                          <div>
                            <p className="font-semibold text-sm text-gray-700">{user.username}</p>
                            <p className="text-xs text-gray-500">
                              {user.role === 'Siswa'
                                ? `NIS: ${user.kode}`
                                : `NIP: ${user.kode}`}
                            </p>
                            <p className="text-xs text-gray-500 font-semibold">
                              {user.sekolah}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                              {user.role.toLowerCase()}
                            </p>
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
                  <p className="text-white font-bold italic text-3xl lg:text-4xl">
                    Daftar Database
                  </p>
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
        </div>
      )}
    </main>
  );
}
