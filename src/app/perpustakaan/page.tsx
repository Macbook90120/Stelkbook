'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  const handleButtonClick = (button: string) => {
    if (button === 'User') {
      router.push('/profile_perpus'); // Navigate to profile page
    }
  };

  const handleAddBookClick = () => {
    router.push('/Perpustakaan/Tambah_Buku'); // Navigasi ke halaman "Menambahkan Buku"
  };

  const handleAgamaClick = (bookName: string) => {
    router.push(`/Buku_XII/${bookName}_XII`); // Navigasi ke buku agama
  };

  const handlePancasilaClick = (bookName: string) => {
    router.push(`/Buku_XI/${bookName}_XI`); // Navigasi ke buku pancasila
  };

  const handleKimiaClick = (bookName: string) => {
    router.push(`/Buku_X/${bookName}_X`); // Navigasi ke buku Kimia
  };

  const handleSejarahClick = (bookName: string) => {
    router.push(`/Buku_X/${bookName}_X`); // Navigasi ke buku Sejarah
  };

  const handleFisikaClick = (bookName: string) => {
    router.push(`/Buku_X/${bookName}_X`); // Navigasi ke buku Fisika
  };

  const handleGeografiClick = (bookName: string) => {
    router.push(`/Buku_X/${bookName}_X`); // Navigasi ke buku geografi
  };

  const handleEkonomiClick = (bookName: string) => {
    router.push(`/Buku_X/${bookName}_X`); // Navigasi ke buku Ekonomi
  };

  const handleMatematikaClick = (bookName: string) => {
    router.push(`/Buku_X/${bookName}_X`); // Navigasi ke buku Matematika
  };

  const handleBahasaIndonesiaClick = (bookName: string) => {
    router.push(`/Buku_X/${bookName}_X`); // Navigasi ke buku Bahasa Indonesia
  };


  return (
    <div className="min-h-screen p-8 bg-gray-50 overflow-y-auto">
      <header className="flex justify-between items-center mb-4">
        {/* Stelkbook Title */}
        <div className="flex-shrink-0" >
          <Image
            src="/assets/Class/Stelk_bookTitle.png"
            alt="Stelkbook"
            width={165}
            height={100}
          />
        </div>

        {/* Search Bar */}
        <div className="mx-4 flex-grow max-w-md relative">
          <input
            type="text"
            placeholder="Pencarian disini"
            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Icon-Image */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Image
              src="/assets/Class/Search_icon.png"
              alt="Search Icon"
              width={20}
              height={20}
            />
          </div>
        </div>

        {/* Icon user */}
        <div className="flex-shrink-0 cursor-pointer" onClick={() => handleButtonClick('User')}>
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

      {/* Studi Anda Text */}
      <div className="mb-8 flex items-center">
        <p className="text-xl font-semibold text-left font-poppins translate-y-[-15px]">
          Perpus Anda
        </p>
      </div>


      {/* Buku Display Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
        {/* Menambahkan Buku Section */}
        <div className="text-center cursor-pointer translate-x-[175px]" onClick={() => handleAddBookClick()}>
          <Image
            src="/assets/Perpustakaan/Tambahan.png"
            alt="Menambahkan Buku"
            width={150}
            height={200}
            className="mx-auto"
          />
          <p className="mt-2 text-sm font-poppins font-semibold">Menambahkan Buku</p>
        </div>
        <div className="text-center cursor-pointer translate-x-[2px]" onClick={() => handleAgamaClick('Agama')}>
          <Image
            src="/assets/Kelas_XII/Buku_Agama.png"
            alt="Agama SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto"
          />
          <p className="mt-2 text-sm font-poppins font-semibold">
            Buku paket Agama <br /> Kelas XII SMA
          </p>
        </div>
        <div className="text-center cursor-pointer translate-x-[-180px]" onClick={() => handlePancasilaClick('Pancasila')}>
          <Image
            src="/assets/Kelas_XI/Buku_Pancasila.png"
            alt="Pancasila SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto"
          />
          <p className="mt-2 text-sm font-poppins font-semibold">
            Pendidikan Pancasila <br /> untuk SMA/MA/SMK/ <br /> MAK Kelas XI
          </p>
        </div>
      </div>

      {/* Tambahan Buku Display Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center mt-8">
        <div className="text-center cursor-pointer translate-x-[175px]" onClick={() => handleEkonomiClick('Ekonomi')}>
          <Image
            src="/assets/Kelas_X/Buku_Ekonomi.png"
            alt="Ekonomi SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto"
          />
          <p className="mt-2 text-sm font-poppins font-semibold">
            Buku paket Ekonomi SMA <br /> Kelas X
          </p>
        </div>
        <div className="text-center cursor-pointer " onClick={() => handleMatematikaClick('Matematika')}>
          <Image
            src="/assets/Kelas_X/Buku_Matematika.png"
            alt="Matematika SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto"
          />
          <p className="mt-2 text-sm font-poppins font-semibold">
            Buku paket Matematika <br /> Untuk SMA/MA Kelas X <br /> Kelompok Wajib
          </p>
        </div>
        <div className="text-center cursor-pointer translate-x-[-180px]" onClick={() => handleBahasaIndonesiaClick('BahasaIndonesia')}>
          <Image
            src="/assets/Kelas_X/Buku_Bahasa_Indonesia.png"
            alt="Bahasa Indonesia SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto"
          />
          <p className="mt-2 text-sm font-poppins font-semibold">
            Buku paket Bahasa <br /> Indonesia SMA Kelas X
          </p>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center mt-8">
        <div className="text-center cursor-pointer translate-x-[175px]" onClick={() => handleSejarahClick('Sejarah')}>
          <Image
            src="/assets/Kelas_X/Buku_Sejarah.png"
            alt="Sejarah SMA Kelas X"
            width={165}
            height={200}
            className="mx-auto"
          />
          <p className="mt-2 text-sm font-poppins font-semibold">
            Buku paket Sejarah <br /> Indonesia Untuk SMA/MA Kelas X
          </p>
        </div>
        <div className="text-center cursor-pointer" onClick={() => handleFisikaClick('Fisika')}>
          <Image
            src="/assets/Kelas_X/Buku_Fisika.png"
            alt="Fisika SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto"
          />
          <p className="mt-2 text-sm font-poppins font-semibold">
            Buku paket Mandiri <br /> Fisika SMA/MA Kelas X
          </p>
        </div>
        <div className="text-center cursor-pointer translate-x-[-180px]" onClick={() => handleKimiaClick('Kimia')}>
          <Image
            src="/assets/Kelas_X/Buku_Kimia.png"
            alt="Kimia SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto"
          />
          <p className="mt-2 text-sm font-poppins font-semibold">
            Buku paket Kimia 1 SMA <br /> Kelas X
          </p>
        </div>
      </div>

      {/* New Section with Geografi */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center mt-8">
        <div className="text-center cursor-pointer translate-x-[175px]" onClick={() => handleGeografiClick('Geografi')}>
          <Image
            src="/assets/Kelas_XII/Buku_Geografi.png"
            alt="Buku Geografi SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto"
          />
          <p className="mt-2 text-sm font-poppins font-semibold">
            Buku paket Mandiri <br /> Geografi Untuk SMA/MA <br /> Kelas X
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;