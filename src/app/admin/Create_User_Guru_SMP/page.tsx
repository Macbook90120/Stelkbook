'use client';
import React, { ChangeEvent, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';

function Page() {
  const router = useRouter();
  const { register } = useAuth();
  
  // State for form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    kode: '',
    role: '',
    gender: '',
    sekolah: '',
    kelas: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleButtonClick = (destination: string) => {
    router.push(`/${destination}`);
  };

  const handleStelkbookClick = () => {
    router.push('/admin');
  };
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle avatar click
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Handle avatar upload
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSelesaiClick = async () => {
    setLoading(true);
    setError(null);

    try {
      // Prepare FormData
      const form = new FormData();
      form.append('username', formData.username);
      form.append('email', formData.email);
      form.append('password', formData.password);
      form.append('kode', formData.kode);
      form.append('role', formData.role);
      form.append('gender', formData.gender);
      form.append('sekolah', formData.sekolah);
      form.append('kelas', formData.kelas);
      if (avatarFile) form.append('avatar', avatarFile);

      // Call register function
      await register(
        formData.username,
        formData.email,
        formData.password,
        formData.kode,
        formData.role,
        formData.gender,
        formData.sekolah,
        formData.kelas,
        avatarFile
      );

      // Redirect on success
      router.push('/admin/Sekolah_Guru/Data_SMP');
    } catch (err: any) {
      console.error("Registrasi gagal:", err);
      setError(err.message || 'Registrasi gagal');
    } finally {
      setLoading(false);
    }
  };

  // Conditional rendering for sekolah/kelas fields
  const showSekolahField = ['Siswa', 'Guru'].includes(formData.role);
  const showKelasField = formData.role === 'Siswa' && formData.sekolah;

  // Render kelas options based on sekolah
  const renderKelasOptions = () => {
    switch(formData.sekolah) {
      case 'SD': return ['I', 'II', 'III', 'IV', 'V', 'VI'];
      case 'SMP': return ['VII', 'VIII', 'IX'];
      case 'SMK': return ['X', 'XI', 'XII'];
      default: return [];
    }
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
        <p 
          className="text-lg font-semibold text-gray-700 hover:underline cursor-pointer"
          onClick={() => handleButtonClick('admin/')}
        >
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
          
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center space-y-2">
            <div 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={handleAvatarClick}
            >
              {avatarPreview ? (
                <Image 
                  src={avatarPreview} 
                  alt="Avatar" 
                  width={128} 
                  height={128} 
                  quality={100}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-2">
                  <span className="text-gray-500 text-sm">Klik untuk mengupload foto</span>
                </div>
              )}
            </div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleAvatarChange} 
              ref={fileInputRef}
              className="hidden" 
            />
          </div>

          {/* Form Fields */}
          <div className="grid gap-4 w-full">
            {/* Username */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* NIS/NIP */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">NIS/NIP</label>
              <input
                type="text"
                name="kode"
                value={formData.kode}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Status (Role) */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Pilih Status</option>
                <option value="Siswa">Siswa</option>
                <option value="Guru">Guru</option>
                <option value="Perpus">Perpus</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Conditional Sekolah Field */}
            {showSekolahField && (
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Sekolah</label>
                <select
                  name="sekolah"
                  value={formData.sekolah}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Pilih Sekolah</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMK">SMK</option>
                </select>
              </div>
            )}

            {/* Conditional Kelas Field */}
            {showKelasField && (
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Kelas</label>
                <select
                  name="kelas"
                  value={formData.kelas}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Pilih Kelas</option>
                  {renderKelasOptions().map(kelas => (
                    <option key={kelas} value={kelas}>{kelas}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Gender */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Pilih Gender</option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSelesaiClick}
                disabled={loading}
                className="bg-red text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 translate-x-[-50px] disabled:opacity-50"
              >
                {loading ? 'Memproses...' : 'Selesai'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;