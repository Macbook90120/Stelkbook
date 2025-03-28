'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/authContext';

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchGuruSmp, guruSmpDetail, updateGuruSmp } = useAuth();
  
  const [form, setForm] = useState({
    id: '',
    username: '',
    email: '',
    password: '',
    nip: '',
    gender: '',
    sekolah: 'SMP',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const id = searchParams.get('id');

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        await fetchGuruSmp(id);
      }
    };
    loadData();
  }, [id, fetchGuruSmp]);

  useEffect(() => {
    if (guruSmpDetail) {
      setForm({
        id: guruSmpDetail.id || '',
        username: guruSmpDetail.username || '',
        email: guruSmpDetail.email || '',
        password: guruSmpDetail.password || '',
        nip: guruSmpDetail.nip || '',
        gender: guruSmpDetail.gender || '',
        sekolah: 'SMP',
      });
    }
  }, [guruSmpDetail]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await updateGuruSmp(id, form);
      alert('Data guru SMP berhasil diperbarui!');
      router.push('/admin/Sekolah_Guru/Data_SMP');
    } catch (error: any) {
      alert('Gagal memperbarui data guru SMP: ' + (error.message || 'Terjadi kesalahan'));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleStelkbookClick = () => {
    router.push('/admin');
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-4">
        <div className="flex-shrink-0 cursor-pointer" onClick={handleStelkbookClick}>
          <Image src="/assets/Class/Stelk_bookTitle.png" alt="Stelkbook" width={165} height={100} />
        </div>

        <div className="mx-4 flex-grow max-w-md relative">
          <input
            type="text"
            placeholder="Pencarian disini"
            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Image
              src="/assets/Class/Search_icon.png"
              alt="Search Icon"
              width={20}
              height={20}
            />
          </div>
        </div>

        <div className="flex-shrink-0 cursor-pointer">
          <Image
            src="/assets/Class/icon_user.png"
            alt="Icon-User"
            width={45}
            height={40}
            className="rounded-full translate-y-[-0px] translate-x-[-20px]"
          />
        </div>
      </header>

      <div className="mb-8">
        <Image
          src="/assets/Class/Lines.png"
          alt="Header Line"
          width={3000}
          height={100}
        />
      </div>

      <div className="mb-8 flex items-center space-x-2">
        <p className="text-lg font-semibold text-gray-600">Database Anda</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <p className="text-lg font-semibold text-gray-600">Guru SMP</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <p className="text-lg font-medium text-black">Edit User</p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg max-w-4xl w-full flex items-center space-x-8">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-full flex-shrink-0"></div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 w-full">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red pr-10"
                required
              />
              <Image
                src={showPassword ? '/assets/Forgot-password/unhide2.png' : '/assets/Forgot-password/hide.png'}
                alt="Toggle Visibility"
                width={20}
                height={20}
                className="absolute top-1/2 right-3 transform -translate-y-[-6px] cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">NIP</label>
              <input
                type="text"
                name="nip"
                value={form.nip}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Sekolah</label>
              <input
                type="text"
                name="sekolah"
                value="SMP"
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red bg-gray-100"
              />
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
                <input
                  type="text"
                  value="Guru"
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                  required
                >
                  <option value="">Pilih Gender</option>
                  <option value="Laki-Laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-red text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 translate-x-[-50px]"
              >
                Selesai
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;