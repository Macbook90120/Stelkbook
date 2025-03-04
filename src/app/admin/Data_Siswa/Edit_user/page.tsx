'use client';
import React, { ChangeEvent, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';

function Page() {
  const router = useRouter();
  const { siswaData, fetchSiswa, updateSiswa } = useAuth();
  const [showSekolahField, setShowSekolahField] = useState(false);
  const [status, setStatus] = useState('');
  const [sekolah, setSekolah] = useState('');
  const [kelas, setKelas] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [kode, setKode] = useState('');
  const [role, setRole] = useState('');

  // Ambil data siswa saat komponen dimuat
  useEffect(() => {
    if (!siswaData?.id) return; // Pastikan ID tersedia sebelum fetch

    const fetchData = async () => {
      try {
        const data = await fetchSiswa(siswaData.id);
        if (data) {
          setUsername(data.username);
          setEmail(data.email);
          setKode(data.nis);
          setGender(data.gender);
          setSekolah(data.sekolah);
          setKelas(data.kelas);
          setRole(data.role);
          setShowSekolahField(data.role === 'Siswa' || data.role === 'Guru');
        }
      } catch (error) {
        console.error('Gagal mengambil data siswa:', error);
      }
    };

    fetchData();
  }, [fetchSiswa, siswaData?.id]);

  // Handle perubahan status (role)
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setStatus(selectedRole);
    setRole(selectedRole);

    // Tampilkan field sekolah jika role adalah Siswa atau Guru
    if (selectedRole === 'Siswa' || selectedRole === 'Guru') {
      setShowSekolahField(true);
    } else {
      setShowSekolahField(false);
    }
  };

  // Handle perubahan sekolah
  const handleSekolahChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSekolah = e.target.value;
    setSekolah(selectedSekolah);
    setKelas(''); // Reset kelas ketika sekolah berubah
  };

  // Generate opsi kelas berdasarkan sekolah
  const renderKelasOptions = () => {
    if (sekolah === 'SD') {
      return ['I', 'II', 'III', 'IV', 'V', 'VI'].map((kelasOption) => (
        <option key={kelasOption} value={kelasOption}>
          {kelasOption}
        </option>
      ));
    } else if (sekolah === 'SMP') {
      return ['VII', 'VIII', 'IX'].map((kelasOption) => (
        <option key={kelasOption} value={kelasOption}>
          {kelasOption}
        </option>
      ));
    } else if (sekolah === 'SMK') {
      return ['X', 'XI', 'XII'].map((kelasOption) => (
        <option key={kelasOption} value={kelasOption}>
          {kelasOption}
        </option>
      ));
    }
    return null;
  };

  // Handle pembaruan data siswa
  const handleUpdateSiswa = async () => {
    if (!siswaData) return;

    const formData = {
      username,
      email,
      password, // Jika password tidak diubah, biarkan kosong atau ambil dari backend
      kode,
      role,
      gender,
      sekolah,
      kelas,
    };

    try {
      await updateSiswa(siswaData.id, formData);
      alert('Data siswa berhasil diperbarui!');
      router.push('/admin/Data_Siswa');
    } catch (error) {
      console.error('Gagal memperbarui data siswa:', error);
      alert('Gagal memperbarui data siswa.');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-4">
        {/* Logo Stelkbook */}
        <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push('/admin')}>
          <Image src="/assets/Class/Stelk_bookTitle.png" alt="Stelkbook" width={165} height={100} />
        </div>

        {/* Icon User */}
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
        <Image src="/assets/Class/Lines.png" alt="Header Line" width={3000} height={100} />
      </div>

      {/* Breadcrumb */}
      <div className="mb-8 flex items-center space-x-2">
        <p className="text-lg font-semibold text-gray-700">Database Anda</p>
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
        <p className="text-lg font-medium text-gray-900 font-poppins">Edit Siswa</p>
      </div>

      {/* Form Edit Siswa */}
      <div className="flex justify-center">
        <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg max-w-4xl w-full flex items-center space-x-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-full flex-shrink-0"></div>
          </div>

          {/* Form Fields */}
          <div className="grid gap-4 w-full">
            {/* Username Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>

            {/* NIS/NIP Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">NIS/NIP</label>
              <input
                type="text"
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
              <select
                value={role}
                onChange={handleStatusChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
              >
                <option value="">Pilih Status</option>
                <option value="Siswa">Siswa</option>
                <option value="Guru">Guru</option>
                <option value="Perpus">Perpus</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Sekolah Field */}
            {showSekolahField && (
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Sekolah</label>
                <select
                  value={sekolah}
                  onChange={handleSekolahChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                >
                  <option value="">Pilih Sekolah</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMK">SMK</option>
                </select>
              </div>
            )}

            {/* Kelas Field */}
            {showSekolahField && sekolah && (
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Kelas</label>
                <select
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                >
                  <option value="">Pilih Kelas</option>
                  {renderKelasOptions()}
                </select>
              </div>
            )}

            {/* Gender Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
              >
                <option value="">Pilih Gender</option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                className="bg-red text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 translate-x-[-50px]"
                onClick={handleUpdateSiswa}
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;