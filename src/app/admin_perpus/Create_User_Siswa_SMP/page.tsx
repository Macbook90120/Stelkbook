'use client';
import React, { ChangeEvent, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import Head from 'next/head';

function Page() {
  const router = useRouter();
  const { register } = useAuth();

  // State
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

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle form changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle avatar click
  const handleAvatarClick = () => fileInputRef.current?.click();

  // Handle avatar upload
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Submit handler
  const handleSelesaiClick = async () => {
    setLoading(true);
    setError(null);

    try {
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

      router.push('/admin_perpus/Sekolah_Siswa/Data_SMP');
    } catch (err: any) {
      console.error("Registrasi gagal:", err);
      setError(err.message || 'Registrasi gagal');
    } finally {
      setLoading(false);
    }
  };

  // Conditional fields
  const showSekolahField = ['Siswa', 'Guru'].includes(formData.role);
  const showKelasField = formData.role === 'Siswa' && formData.sekolah;

  const renderKelasOptions = () => {
    switch (formData.sekolah) {
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

      {/* Header */}
      <header className="flex justify-center items-center mb-4 md:mb-6">
        <div className="cursor-pointer" onClick={() => router.push('/admin_perpus')}>
          <div className="relative w-[120px] h-[36px] md:w-[165px] md:h-[50px]">
            <Image 
              src="/assets/Class/Stelk_bookTitle.png"
              alt="Stelkbook"
              width={165}
              height={50}
              priority
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </header>

      {/* Header Decoration */}
      <div className="mb-6 md:mb-8">
        <div className="relative w-full h-[16px] md:h-[20px]">
          <Image 
            src="/assets/Class/Lines.png" 
            alt="Header decoration" 
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mb-6 md:mb-8 flex items-center space-x-2">
        <p 
          className="text-sm md:text-lg font-semibold text-gray-700 hover:underline cursor-pointer"
          onClick={() => router.push('/admin_perpus/Sekolah_Siswa/Data_SMP')}
        >
          Database Anda
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <p className="text-sm md:text-lg font-medium text-gray-900">Membuat User</p>
      </div>

      {/* Form */}
      <div className="flex justify-center">
        <div className="bg-white border border-gray-300 rounded-lg p-4 md:p-8 shadow-lg w-full max-w-4xl flex flex-col md:flex-row md:items-center md:space-x-6 space-y-6 md:space-y-0">
          
          {/* Avatar */}
          <div className="flex flex-col items-center space-y-2">
            <div 
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={handleAvatarClick}
            >
              {avatarPreview ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={avatarPreview} 
                    alt="Avatar" 
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

          {/* Fields */}
          <div className="grid gap-3 md:gap-4 w-full">
            {['username','email','password','kode'].map((field) => (
              <div key={field}>
                <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2 capitalize">
                  {field === 'kode' ? 'NIS/NIP' : field}
                </label>
                <input
                  type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base border border-gray-300 rounded-md"
                  required
                />
              </div>
            ))}

            {/* Role */}
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

            {/* Gender */}
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

            {error && (
              <div className="text-red-500 text-xs md:text-sm mt-1 md:mt-2">
                {error}
              </div>
            )}

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
