'use client';
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';

function Page() {
  const router = useRouter();
  const { register2 } = useAuth(); // Changed from register to register2

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
        <h1 className="text-3xl font-bold text-gray-700">Registrasi</h1>
      </div>

      <div className="flex justify-center">
        <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg max-w-4xl w-full flex items-center space-x-8">
          {/* Avatar upload */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-xs"></span>
              )}
            </div>
            <label className="mt-2 cursor-pointer text-sm text-blue-500 hover:underline">
              Pilih Icon
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setAvatarFile(file); // Store the file object
                    setAvatar(URL.createObjectURL(file)); // Create preview URL
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
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                required
              />
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