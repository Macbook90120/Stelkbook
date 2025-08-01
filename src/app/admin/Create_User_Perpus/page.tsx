'use client';
import React, { ChangeEvent, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import Head from 'next/head';

function Page() {
  const router = useRouter();
  const { register } = useAuth();
  
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
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSelesaiClick = async () => {
    setLoading(true);
    setError(null);

    try {
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

      router.push('/admin/Data_perpus');
    } catch (err: any) {
      console.error("Registrasi gagal:", err);
      setError(err.message || 'Registrasi gagal');
    } finally {
      setLoading(false);
    }
  };

  const showSekolahField = ['Siswa', 'Guru'].includes(formData.role);
  const showKelasField = formData.role === 'Siswa' && formData.sekolah;

  const renderKelasOptions = () => {
    switch(formData.sekolah) {
      case 'SD': return ['I', 'II', 'III', 'IV', 'V', 'VI'];
      case 'SMP': return ['VII', 'VIII', 'IX'];
      case 'SMK': return ['X', 'XI', 'XII'];
      default: return [];
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <Head>
        <link 
          rel="preload" 
          href="/assets/Class/Stelk_bookTitle.png" 
          as="image"
          media="(min-width: 768px)"
        />
      </Head>

      {/* Header with LCP-optimized logo */}
      <header className="flex justify-center items-center mb-4 md:mb-6">
        <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push('/admin')}>
          <div className="relative w-[120px] h-[36px] md:w-[165px] md:h-[50px]">
            <Image 
              src="/assets/Class/Stelk_bookTitle.png"
              alt="Stelkbook"
              width={165}
              height={50}
              priority={true}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </header>

      {/* Non-critical decorative line */}
      <div className="mb-6 md:mb-8">
        <div className="relative w-full h-[16px] md:h-[20px]">
          <Image 
            src="/assets/Class/Lines.png" 
            alt="Header decoration" 
            fill
            sizes="100vw"
            className="object-cover"
            priority={true}
          />
        </div>
      </div>

      {/* Breadcrumb navigation */}
      <div className="mb-6 md:mb-8 flex items-center space-x-2">
        <p className="text-sm md:text-lg font-semibold text-gray-700 hover:underline cursor-pointer"
          onClick={() => router.push('/admin/Data_perpus')}>
          Database Anda
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <p className="text-sm md:text-lg font-medium text-gray-900 font-poppins">Membuat User</p>
      </div>

      {/* Main form container */}
      <div className="flex justify-center">
        <div className="bg-white border border-gray-300 rounded-lg p-4 md:p-8 shadow-lg w-full max-w-4xl flex flex-col md:flex-row md:items-center md:space-x-6 space-y-6 md:space-y-0">
          
          {/* Avatar upload section */}
          <div className="flex flex-col items-center space-y-2 mx-auto md:mx-0">
            <div 
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={handleAvatarClick}
            >
              {avatarPreview ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={avatarPreview} 
                    alt="User avatar" 
                    fill
                    sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 128px"
                    className="object-cover"
                    quality={95}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-2">
                  <span className="text-xs md:text-sm text-gray-500">Klik untuk upload foto</span>
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

          {/* Form fields */}
          <div className="grid gap-3 md:gap-4 w-full">
            {/* Username field */}
            <div>
              <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Email field */}
            <div>
              <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Password field */}
            <div>
              <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* NIS/NIP field */}
            <div>
              <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">NIS/NIP</label>
              <input
                type="text"
                name="kode"
                value={formData.kode}
                onChange={handleChange}
                className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Role selection */}
            <div>
              <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Status</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 rounded-md"
                required
              >
                <option value="">Pilih Status</option>
                <option value="Siswa">Siswa</option>
                <option value="Guru">Guru</option>
                <option value="Perpus">Perpus</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Conditional sekolah field */}
            {showSekolahField && (
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Sekolah</label>
                <select
                  name="sekolah"
                  value={formData.sekolah}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Pilih Sekolah</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMK">SMK</option>
                </select>
              </div>
            )}

            {/* Conditional kelas field */}
            {showKelasField && (
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Kelas</label>
                <select
                  name="kelas"
                  value={formData.kelas}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Pilih Kelas</option>
                  {renderKelasOptions().map(kelas => (
                    <option key={kelas} value={kelas}>{kelas}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Gender selection */}
            <div>
              <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 rounded-md"
                required
              >
                <option value="">Pilih Gender</option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Error message display */}
            {error && (
              <div className="text-red-500 text-xs md:text-sm mt-1 md:mt-2">
                {error}
              </div>
            )}

            {/* Submit button */}
            <div className="flex justify-center mt-4 md:mt-6">
              <button
                onClick={handleSelesaiClick}
                disabled={loading}
                className="bg-red-500 text-white px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-base rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50 w-full md:w-auto transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </span>
                ) : 'Selesai'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;