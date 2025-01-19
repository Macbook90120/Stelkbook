'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import WarningModal_admin from './WarningModal_admin';

function HomePage() {
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);

  const handleLogoutClick = () => {
    setShowWarning(true); // Show the warning modal
  };

  const handleCloseWarning = () => {
    setShowWarning(false); // Close the warning modal
  };

  // Disable scroll on mount and enable on unmount
  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = 'hidden';

    // Re-enable scroll on unmount (to avoid global impact)
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleButtonClick = (destination: string) => {
    switch (destination) {
      case 'User':
        router.push('/profile_admin'); // Navigasi untuk profil
        break;
      case 'Membuat user':
        router.push('/admin/Create_User'); // Navigasi untuk Membuat user
        break;
      case 'Siswa':
        router.push('/admin/Data_Siswa'); // Navigasi untuk Siswa (correct destination)
        break;
      case 'Guru':
        router.push('/admin/Data_Guru'); // Navigasi untuk Guru (correct destination)
        break;
      case 'Pengurus Perpustakaan':
        router.push('/admin/Data_perpus'); // Navigasi untuk Pengurus Perpustakaan (correct destination)
        break;
      default:
        console.error('Unknown destination:', destination);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-4">
        {/* Stelkbook Title */}
        <div className="flex-shrink-0 translate-x-[10px] translate-y-[-4px]">
          <Image src="/assets/Class/Stelk_bookTitle.png" alt="Stelkbook" width={175} height={100} />
        </div>

        {/* Search Bar */}
        <div className="mx-4 flex-grow max-w-md relative translate-x-[90px]">
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

        {/* Log out user */}
        <div
          className="flex-shrink-0 cursor-pointer bg-transparent translate-x-[290px]"
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

        {/* Icon user */}
        <div className="flex-shrink-0 cursor-pointer translate-x-[-60px]" onClick={() => handleButtonClick('User')}>
          <Image src="/assets/Class/icon_user.png" alt="Icon-User" width={45} height={40} className="rounded-full translate-y-[-0px] translate-x-[-20px]" />
        </div>
      </header>

      {/* Warning Modal */}
      {showWarning && (
        <WarningModal_admin onClose={handleCloseWarning} />
      )}

      {/* Header */}
      <div className="mb-8">
        <Image src="/assets/Class/Lines.png" alt="Header Line" width={3000} height={100} />
      </div>

      {/* Studi Anda Text */}
      <div className="mb-4">
        <p className="text-xl font-semibold text-left font-poppins translate-y-[-15px]">Studi Anda</p>
      </div>

      <main className="flex flex-col items-center space-y-4">
        {/* Row on top */}
        <div className="flex justify-between w-full max-w-md">
          <div className="flex-shrink-0 transform translate-y-[-30px] translate-x-[-350px] relative">
            <Image
              src="/assets/Admin/Card_Admin.png"
              alt="Siswa"
              width={550}
              height={150}
            />
            <div className="absolute left-4 top-4 transform text-white font-bold text-4xl italic translate-x-[30px] translate-y-[70px]">
              Siswa
            </div>
            <div
              onClick={() => handleButtonClick('Siswa')} // Updated destination
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2px bg-white text-red font-semibold text-lg py-2 px-12 rounded-full shadow-xl w-180 h-53 translate-y-[-5px] translate-x-[-240px] cursor-pointer"
            >
              Lanjut
            </div>
          </div>

          <div className="flex-shrink-0 transform translate-y-[-30px] translate-x-[-310px] relative">
            <Image
              src="/assets/Admin/Card_Admin.png"
              alt="Guru"
              width={550}
              height={150}
            />
            <div className="absolute left-4 top-4 transform text-white font-bold text-4xl italic translate-x-[24px] translate-y-[70px]">
              Guru
            </div>
            <div
              onClick={() => handleButtonClick('Guru')} // Updated destination
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2px bg-white text-red font-semibold text-lg py-2 px-12 rounded-full shadow-xl w-180 h-53 translate-y-[-5px] translate-x-[-240px] cursor-pointer"
            >
              Lanjut
            </div>
          </div>
        </div>

        {/* Lainnya container */}
        <div className="relative transform translate-y-[-30px] translate-x-[290px]">
          <Image
            src="/assets/Admin/Card_Admin.png"
            alt="Lainnya"
            width={550}
            height={150}
          />
          <div className="absolute left-4 top-4 transform text-white font-bold text-4xl italic translate-x-[28px] translate-y-[70px]">
            Membuat User
          </div>
          <div
            onClick={() => handleButtonClick('Membuat user')}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2px bg-white text-red font-semibold text-lg py-2 px-12 rounded-full shadow-xl w-180 h-53 translate-y-[-5px] translate-x-[-240px] cursor-pointer"
          >
            Lanjut
          </div>
        </div>

        {/* Gambaran tengah untuk Kelas XII */}
        <div className="relative mt-4 transform translate-y-[-315px] translate-x-[-300px]">
          <Image
            src="/assets/Admin/Card_Admin.png"
            alt="Pengurus Perpustakaan"
            width={550}
            height={200}
          />
          <div className="absolute left-4 top-4 transform text-white font-bold text-4xl italic translate-x-[30px] translate-y-[70px]">
            Pengurus Perpustakaan
          </div>
          <div
            onClick={() => handleButtonClick('Pengurus Perpustakaan')} // Updated destination
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2px bg-white text-red font-semibold text-lg py-2 px-12 rounded-full shadow-xl w-180 h-53 translate-y-[-5px] translate-x-[-240px] cursor-pointer"
          >
            Lanjut
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;