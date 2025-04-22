'use client';
import React, { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';

function Page() {
  const router = useRouter();
  const { register } = useAuth();
  const [showSekolahField, setShowSekolahField] = useState(false);
  const [showKelasField, setShowKelasField] = useState(false);
  const [status, setStatus] = useState('');
  const [sekolah, setSekolah] = useState('');
  const [kelas, setKelas] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [kode, setKode] = useState('');
  const [role, setRole] = useState('');

  const handleStelkbookClick = () => {
    router.push('/admin');
  };

  const handleSelesaiClick = async () => {
    try {
      await register(username, email, password, kode, role, gender, sekolah, kelas);
      router.push('/admin/Sekolah_Siswa/Data_SMK');
    } catch (error) {
      console.error("Registrasi gagal:", error);
    }
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setStatus(selectedRole);
    setRole(selectedRole);

    if (selectedRole === 'Siswa' || selectedRole === 'Guru') {
      setShowSekolahField(true);
      setShowKelasField(selectedRole === 'Siswa'); // Hanya tampilkan kelas jika Siswa
    } else {
      setShowSekolahField(false);
      setShowKelasField(false);
    }
  };

  const handleSekolahChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSekolah = e.target.value;
    setSekolah(selectedSekolah);
    setKelas(''); // Reset kelas ketika sekolah berubah
  };

  const handleButtonClick = (destination: string) => {
    router.push(`/${destination}`);
  };

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

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-4">
        <div className="flex-shrink-0 cursor-pointer" onClick={handleStelkbookClick}>
          <Image src="/assets/Class/Stelk_bookTitle.png" alt="Stelkbook" width={165} height={100} />
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
        <Image src="/assets/Class/Lines.png" alt="Header Line" width={3000} height={100} />
      </div>

      <div className="mb-8 flex items-center space-x-2">
        <p className="text-lg font-semibold text-gray-700 hover:underline cursor-pointer"
        onClick={() => handleButtonClick('admin/')}>

          Database Anda
          </p>
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
        <p className="text-lg font-medium text-gray-900 font-poppins">Membuat User</p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg max-w-4xl w-full flex items-center space-x-8">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-full flex-shrink-0"></div>
          </div>

          <div className="grid gap-4 w-full">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">NIS/NIP</label>
              <input
                type="text"
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
              />
            </div>

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

            {showKelasField && sekolah && (
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

            <div className="flex justify-center mt-8">
              <button
                className="bg-red text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 translate-x-[-50px]"
                onClick={handleSelesaiClick}
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