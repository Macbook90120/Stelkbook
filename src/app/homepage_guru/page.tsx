'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import WarningModal_2 from './WarningModal_2';

function Page() {
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);

  const handleLogoutClick = () => {
    setShowWarning(true); // Show the warning modal
  };

  const handleCloseWarning = () => {
    setShowWarning(false); // Close the warning modal
  };

  const handleButtonClick = (button: string) => {
    if (button === 'User') {
      router.push('/profile_guru'); // Navigate to profile page
    }
  };

  const handleAgamaClick = (bookName: string) => {
    router.push(`/homepage_guru/Buku_XII_Guru/${bookName}_XII_Guru`); // Navigasi ke buku agama
  };

  const handlePancasilaClick = (bookName: string) => {
    router.push(`/homepage_guru/Buku_XI_Guru/${bookName}_XI_Guru`); // Navigasi ke buku pancasila
  };

  const handleKimiaClick = (bookName: string) => {
    router.push(`/homepage_guru/Buku_X_Guru/${bookName}_X_Guru`); // Navigasi ke buku Kimia
  };

  const handleSejarahClick = (bookName: string) => {
    router.push(`/homepage_guru/Buku_X_Guru/${bookName}_X_Guru`); // Navigasi ke buku Sejarah
  };

  const handleFisikaClick = (bookName: string) => {
    router.push(`/homepage_guru/Buku_X_Guru/${bookName}_X_Guru`); // Navigasi ke buku Fisika
  };

  const handleGeografiClick = (bookName: string) => {
    router.push(`/homepage_guru/Buku_X_Guru/${bookName}_X_Guru`); // Navigasi ke buku geografi
  };

  const handleEkonomiClick = (bookName: string) => {
    router.push(`/homepage_guru/Buku_X_Guru/${bookName}_X_Guru`); // Navigasi ke buku Ekonomi
  };

  const handleMatematikaClick = (bookName: string) => {
    router.push(`/homepage_guru/Buku_X_Guru/${bookName}_X_Guru`); // Navigasi ke buku Matematika
  };

  const handleBahasaIndonesiaClick = (bookName: string) => {
    router.push(`/homepage_guru/Buku_X_Guru/${bookName}_X_Guru`); // Navigasi ke buku Bahasa Indonesia
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
        <div className="mx-4 flex-grow max-w-md relative translate-y-[20px]">
          <input
            type="text"
            placeholder="Pencarian disini"
            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

           {/* Log out user */}
                  <div
                    className="flex-shrink-0 cursor-pointer bg-transparent translate-x-[870px] translate-y-[-35px]"
                    onClick={handleLogoutClick}
                  >
                    <Image
                      src="/assets/Class/Log_out.png"
                      alt="Icon-User"
                      width={30}
                      height={40}
                      className="rounded-full translate-y-[-0px] translate-x-[-20px]"
                    />
                  </div>

          {/* Icon-Image */}
          <div className="absolute left-3 top-1/2 transform -translate-y-[25px]">
            <Image
              src="/assets/Class/Search_icon.png"
              alt="Search Icon"
              width={20}
              height={20}
            />
          </div>
        </div>

        {/* Icon user */}
        <div className="flex-shrink-0 cursor-pointer translate-x-[-45px] translate-y-[5px]" onClick={() => handleButtonClick('User')}>
          <Image
            src="/assets/Class/icon_user.png"
            alt="Icon-User"
            width={45}
            height={40}
            className="rounded-full translate-y-[-0px] translate-x-[-20px]"
          />
        </div>
      </header>

      {/* Warning Modal */}
      {showWarning && (
        <WarningModal_2 onClose={handleCloseWarning} />
      )}

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
          Studi Anda
        </p>
      </div>


      {/* Buku Display Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
        <div className="text-center cursor-pointer" onClick={() => handleAgamaClick('Agama')}>
          <Image
            src="/assets/Kelas_XII/Buku_Agama.png"
            alt="Agama SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto translate-x-[140px]"
          />
          <p className="mt-2 text-sm font-poppins font-semibold translate-x-[140px]">
          Buku paket Agama <br /> Kelas XII SMA
          </p>
        </div>
        <div className="text-center cursor-pointer" onClick={() => handlePancasilaClick('Pancasila')}>
          <Image
            src="/assets/Kelas_XI/Buku_Pancasila.png"
            alt="Pancasila SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto translate-x-[28px]"
          />
          <p className="mt-2 text-sm font-poppins font-semibold translate-x-[28px]">
            Pendidikan Pancasila  <br /> untuk SMA/MA/SMK/ <br /> MAK Kelas XI 
          </p>
        </div>
        <div className="text-center cursor-pointer " onClick={() => handleEkonomiClick('Ekonomi')}>
          <Image
            src="/assets/Kelas_X/Buku_Ekonomi.png"
            alt="Ekonomi SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto translate-x-[-80px]"
          />
          <p className="mt-2 text-sm font-poppins font-semibold translate-x-[-80px]">
            Buku paket Ekonomi SMA  <br /> Kelas X
          </p>
        </div>
      </div>

      {/* Tambahan Buku Display Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center mt-8">
        <div className="text-center cursor-pointer" onClick={() => handleMatematikaClick('Matematika')}>
          <Image
            src="/assets/Kelas_X/Buku_Matematika.png"
            alt="Matematika SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto translate-x-[140px]"
          />
          <p className="mt-2 text-sm translate-x-[140px] font-poppins font-semibold">
            Buku paket Matematika  <br /> Untuk SMA/MA Kelas X  <br /> Kelompok Wajib
          </p>
        </div>
        <div className="text-center cursor-pointer" onClick={() => handleBahasaIndonesiaClick('BahasaIndonesia')}>
          <Image
            src="/assets/Kelas_X/Buku_Bahasa_Indonesia.png"
            alt="Biologi SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto translate-x-[28px]"
          />
          <p className="mt-2 text-sm translate-x-[28px] font-poppins font-semibold">
            Buku paket Bahasa  <br /> Indonesia SMA Kelas X
          </p>
        </div>
        <div className="text-center cursor-pointer" onClick={() => handleSejarahClick('Sejarah')}>
          <Image
            src="/assets/Kelas_X/Buku_Sejarah.png"
            alt="Sejarah SMA Kelas X"
            width={165}
            height={200}
            className="mx-auto translate-x-[-80px] translate-y-[-5px]"
          />
          <p className="mt-2 text-sm translate-x-[-80px] translate-y-[-10px] font-poppins font-semibold">
            Buku paket Sejarah  <br /> Indonesia Untuk SMA/MA Kelas X
          </p>
        </div>
      </div>

      {/* Tambahan Buku */}
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center mt-8">
        <div className="text-center cursor-pointer" onClick={() => handleFisikaClick('Fisika')}>
          <Image
            src="/assets/Kelas_X/Buku_Fisika.png"
            alt="Fisika SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto translate-x-[10px]"
          />
          <p className="mt-2 text-sm translate-x-[10px] font-poppins font-semibold">
            Buku paket Mandiri  <br /> Fisika SMA/MA Kelas X
          </p>
        </div>
        {/* New Book Section */}
        <div className="text-center cursor-pointer" onClick={() => handleKimiaClick('Kimia')}>
          <Image
            src="/assets/Kelas_X/Buku_Kimia.png"
            alt="Buku Kimia SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto translate-x-[-335px]"
          />
          <p className="mt-2 text-sm translate-x-[-335px] font-poppins font-semibold">
            Buku paket Kimia 1 SMA  <br /> Kelas X
          </p>
        </div>
        <div className="text-center cursor-pointer" onClick={() => handleGeografiClick('Geografi')}>
          <Image
            src="/assets/Kelas_XII/Buku_Geografi.png"
            alt="Buku Geografi SMA Kelas X"
            width={150}
            height={200}
            className="mx-auto translate-x-[770px] translate-y-[-270px]"
          />
          <p className="mt-2 text-sm translate-x-[770px] translate-y-[-275px] font-poppins font-semibold">
            Buku paket Mandiri  <br /> Geografi Untuk SMA/MA <br /> Kelas X
          </p>
        </div>


      </div>
    </div>
  );
}

export default Page;