'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/authContext'; // Import useAuth

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchSiswaSmk, siswaSmkDetail, updateSiswaSmk } = useAuth(); // Ambil fungsi dan state dari AuthContext
  const [form, setForm] = useState({
    id: '',
    username: '',
    email: '',
    password: '',
    nis: '',
    gender: '',
    sekolah: 'SMK', // Set default sekolah ke "SD"
    kelas: '',
  });
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility

  // Ambil ID dari query parameter
  const id = searchParams.get('id');

  // Ambil data siswa berdasarkan ID saat komponen dimuat
  useEffect(() => {
    if (id) {
      fetchSiswaSmk(id); // Ambil data siswa spesifik berdasarkan ID
    }
  }, [id, fetchSiswaSmk]);

  // Isi form dengan data siswa saat siswaDetail berubah
  useEffect(() => {
    if (siswaSmkDetail) {
      setForm({
        id: siswaSmkDetail.id || '',
        username: siswaSmkDetail.username || '',
        email: siswaSmkDetail.email || '',
        password: siswaSmkDetail.password || '', // Biarkan kosong untuk keamanan
        nis: siswaSmkDetail.nis || '',
        gender: siswaSmkDetail.gender || '',
        sekolah: 'SMK', // Tetap set ke "SD"
        kelas: siswaSmkDetail.kelas || '',
      });
    }
  }, [siswaSmkDetail]);

  // Handle perubahan input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateSiswaSmk(id, form); // Update data siswa
        alert('Data siswa berhasil diperbarui!');
        router.push('/admin/Sekolah_Siswa/Data_SMK'); // Redirect ke halaman data siswa
      }
    } catch (error: any) {
      alert('Gagal memperbarui data siswa: ' + (error.message || 'Terjadi kesalahan'));
    }
  };

  // Fungsi untuk menghasilkan pilihan kelas khusus SD
  const generateKelasOptions = () => {
    return ['VII', 'VIII', 'IX']; // Kelas untuk SD
  };

  const handleStelkbookClick = () => {
    router.push('/admin'); // Navigasi ke homepage admin
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-4">
        {/* Stelkbook Title */}
        <div className="flex-shrink-0 cursor-pointer" onClick={handleStelkbookClick}>
          <Image src="/assets/Class/Stelk_bookTitle.png" alt="Stelkbook" width={165} height={100} />
        </div>

      

        {/* Icon user */}
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

      {/* Header Line */}
      <div className="mb-8">
        <Image
          src="/assets/Class/Lines.png"
          alt="Header Line"
          width={3000}
          height={100}
        />
      </div>

      {/* Breadcrumb Text */}
      <div className="mb-8 flex items-center space-x-2">
        <p className="text-lg font-semibold text-gray-600">Database Anda</p>

        {/* First Arrow Icon */}
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

        {/* "Guru" Text */}
        <p className="text-lg font-semibold text-gray-600">Siswa SMK</p>

        {/* Second Arrow Icon */}
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

        {/* "Edit User" Text */}
        <p className="text-lg font-medium text-black">Edit User</p>
      </div>

      {/* Profile Section */}
      <div className="flex justify-center">
        <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg max-w-4xl w-full flex items-center space-x-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-full flex-shrink-0"></div>
          </div>

          {/* Profile Details */}
          <form onSubmit={handleSubmit} className="grid gap-4 w-full">
            {/* Username Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red pr-10"
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

            {/* NIS/NIK Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">NIS</label>
              <input
                type="text"
                name="nis"
                value={form.nis}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>

            {/* Sekolah Field (Disabled karena khusus SD) */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Sekolah</label>
              <input
                type="text"
                name="sekolah"
                value="SMK"
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red bg-gray-100"
              />
            </div>

            {/* Kelas Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Kelas</label>
              <select
                name="kelas"
                value={form.kelas}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
              >
                <option value="">Pilih Kelas</option>
                {generateKelasOptions().map((kelas) => (
                  <option key={kelas} value={kelas}>
                    {kelas}
                  </option>
                ))}
              </select>
            </div>

            {/* Status and Gender Fields */}
            <div className="flex space-x-4">
              {/* Status Field */}
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
                <input
                  type="text"
                  value="Siswa"
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                />
              </div>

              {/* Gender Field */}
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                >
                  <option value="">Pilih Gender</option>
                  <option value="Laki-Laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
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