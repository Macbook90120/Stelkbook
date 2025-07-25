'use client';
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import { MdEdit } from 'react-icons/md'; // Material Design
import { FaUser } from 'react-icons/fa';
import Image from "next/image";
import { Eye, EyeOff } from 'lucide-react';


function Page() {
  const router = useRouter();
  const { register2 } = useAuth(); // Changed from register to register2

  const [showPassword, setShowPassword] = useState(false);

  const [showWarning, setShowWarning] = useState(false);
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
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // Added for file upload
  const [errorMessage, setErrorMessage] = useState('');

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setStatus(selectedRole);
    setRole(selectedRole);

    if (selectedRole === 'Siswa' || selectedRole === 'Guru') {
      setShowSekolahField(true);
      setShowKelasField(selectedRole === 'Siswa');
    } else {
      setShowSekolahField(false);
      setShowKelasField(false);
    }
  };

  const handleSekolahChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSekolah = e.target.value;
    setSekolah(selectedSekolah);
    setKelas('');
  };

  const handleSelesaiClick = async () => {
    try {
      // Call register2 with all required parameters
      await register2(
        username,
        email,
        password,
        kode,
        role,
        gender,
        sekolah,
        kelas,
        avatarFile
      );
      
      // Show success message or redirect
      setShowWarning(true); // Show the approval waiting message
    } catch (e: any) {
      console.error("Registrasi gagal:", e);
      const msg = e.response?.data?.message || "Registrasi gagal. Silakan coba lagi.";
      setErrorMessage(msg);
    }
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
      <div className="mb-8 flex justify-center">
      <div className="flex items-center gap-4">
          <Image 
          src="/assets/icon/stelkbook-logo-navbar.svg" 
          alt="Logo" 
          width={148} height={88} />
          <h1 className="text-3xl font-bold text-gray-700">Registrasi</h1>
        </div>
      </div>

      <div className="flex justify-center">
  <div className="bg-white border border-gray-300 rounded-lg p-6 sm:p-8 shadow-lg w-full max-w-md flex flex-col items-center">
    
{/* Avatar Upload */}
<div className="relative group w-24 h-24 sm:w-32 sm:h-32">
  <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
    {avatar ? (
      <img
        src={avatar}
        alt="Avatar"
        className="w-full h-full object-cover rounded-full"
      />
    ) : (
      <FaUser className="text-gray-700 text-3xl sm:text-4xl" />
    )}
  </div>
  <label className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer transition duration-200">
    <MdEdit className="text-white text-xl opacity-0 group-hover:opacity-100 transition duration-200" />
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setAvatarFile(file);
          setAvatar(URL.createObjectURL(file));
        }
      }}
    />
  </label>
</div>

          {/* Form */}
          <div className="grid gap-4 w-full">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                required
              />
            </div>

            <div>
  <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
  <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red pr-10"
      required
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
</div>


            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Kode (NIS/NIP)</label>
              <input
                type="text"
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
              <select
                value={role}
                onChange={handleStatusChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                required
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
                  required
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
                  required
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
                required
              >
                <option value="">Pilih Gender</option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red text-OldRed px-4 py-2 rounded text-sm text-center">
                {errorMessage}
              </div>
            )}

            {/* Warning Dialog */}
            {showWarning && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                  <p className="text-gray-800 text-lg font-medium mb-4">
                    Silakan menunggu persetujuan dari pihak perpustakaan.
                  </p>
                  <button
                    onClick={() => {
                      setShowWarning(false);
                      router.push('/');
                    }}
                    className="bg-red text-white px-4 py-2 rounded-md hover:bg-OldRed"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-center mt-8">
              <button
                className="bg-red text-white px-6 py-2 rounded-lg shadow-md hover:bg-OldRed focus:outline-none focus:ring-2 focus:ring-red"
                onClick={handleSelesaiClick}
                disabled={!username || !email || !password || !kode || !role || !gender || 
                  (showSekolahField && !sekolah) || 
                  (showKelasField && !kelas)}
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