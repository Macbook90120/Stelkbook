'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import WarningModal from './WarningModal';
// import Navbar from './navbar';

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
        router.push('/profile'); // Navigasi untuk profil
        break;
      case 'Kelas X':
        router.push('/kelasX'); // Navigasi untuk kelas X
        break;
      case 'Kelas XI':
        router.push('/kelasXI'); // Navigasi untuk kelas XI
        break;
      case 'Kelas XII':
        router.push('/kelasXII'); // Navigasi untuk kelas XII
        break;
      case 'Lainnya':
        router.push('/lainnya'); // Navigasi untuk Lainnya
        break;
      default:
        console.error('Unknown destination:', destination);
    }
  };


  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-4">

        {/* Integrate Navbar here */}
        {/* <Navbar /> */}

        {/* Navbar */}
        <div className="flex-shrink-0 cursor-pointer translate-x-2 translate-y-[-2px] bg-transparent">
          <Image src="/assets/Class/Menu_Button.png" alt="Stelkbook" width={25} height={20} />
        </div>


        {/* Stelkbook Title */}
        <div className="flex-shrink-0 translate-x-[-150px] translate-y-[-4px]">
          <Image src="/assets/Class/Stelk_bookTitle.png" alt="Stelkbook" width={175} height={100} />
        </div>

        {/* Search Bar */}
        <div className="mx-4 flex-grow max-w-md relative translate-x-[-60px]">
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
          className="flex-shrink-0 cursor-pointer bg-transparent translate-x-[220px]"
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
        <WarningModal onClose={handleCloseWarning} />
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
        {/* Row for Kelas X and Kelas XI on top */}
        <div className="flex justify-between w-full max-w-md">
          <div className="flex-shrink-0 transform translate-y-[-30px] translate-x-[-350px] relative">
            <Image
              src="/assets/Class/Card_KelasX.png"
              alt="Kelas X"
              width={550}
              height={150}
            />
            <div className="absolute left-4 top-4 transform text-white font-bold text-4xl italic translate-x-[40px] translate-y-[70px]">
              Kelas X
            </div>
            <div
              onClick={() => handleButtonClick('Kelas X')}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2px bg-white text-green-500 font-semibold text-lg py-2 px-12 rounded-full shadow-xl w-180 h-53 translate-x-[-230px] cursor-pointer"
            >
              Lanjut
            </div>
          </div>

          <div className="flex-shrink-0 transform translate-y-[-30px] translate-x-[-310px] relative">
            <Image
              src="/assets/Class/Card_KelasXI.png"
              alt="Kelas XI"
              width={550}
              height={150}
            />
            <div className="absolute left-4 top-4 transform text-white font-bold text-4xl italic translate-x-[24px] translate-y-[70px]">
              Kelas XI
            </div>
            <div
              onClick={() => handleButtonClick('Kelas XI')}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2px bg-white text-pink-500 font-semibold text-lg py-2 px-12 rounded-full shadow-xl w-180 h-53 translate-x-[-240px] cursor-pointer"
            >
              Lanjut
            </div>
          </div>
        </div>

        {/* Lainnya container */}
        <div className="relative transform translate-y-[-30px] translate-x-[290px]">
          <Image
            src="/assets/Class/Card_Lainnya.png"
            alt="Lainnya"
            width={550}
            height={150}
          />
          <div className="absolute left-4 top-4 transform text-white font-bold text-4xl italic translate-x-[28px] translate-y-[70px]">
            Lainnya
          </div>
          <div
            onClick={() => handleButtonClick('Lainnya')}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2px bg-white text-red font-semibold text-lg py-2 px-12 rounded-full shadow-xl w-180 h-53 translate-y-[-5px] translate-x-[-240px] cursor-pointer"
          >
            Lanjut
          </div>
        </div>

        {/* Gambaran tengah untuk Kelas XII */}
        <div className="relative mt-4 transform translate-y-[-315px] translate-x-[-300px]">
          <Image
            src="/assets/Class/Card_KelasXII.png"
            alt="Kelas XII"
            width={550}
            height={200}
          />
          <div className="absolute left-4 top-4 transform text-white font-bold text-4xl italic translate-x-[30px] translate-y-[70px]">
            Kelas XII
          </div>
          <div
            onClick={() => handleButtonClick('Kelas XII')}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2px bg-white text-sky-500 font-semibold text-lg py-2 px-12 rounded-full shadow-xl w-180 h-53 translate-x-[-230px] cursor-pointer"
          >
            Lanjut
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;