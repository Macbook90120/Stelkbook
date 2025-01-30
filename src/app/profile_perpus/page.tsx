'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  const handleStelkbookClick = () => {
    router.push('/homepage'); // navigasi untuk homepage
  };

  const handleChangePasswordClick = () => {
    router.push('/change-password'); // navigasi untuk halaman ganti password
  };

  const handleLogoutClick = () => {
    router.push('http://localhost:3000/'); // navigasi untuk halaman logout
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-4">
        {/* Stelkbook Title */}
        <div className="flex-shrink-0 cursor-pointer" onClick={handleStelkbookClick}>
          <Image src="/assets/Class/Stelk_bookTitle.png" alt="Stelkbook" width={165} height={100} />
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
      <div className="mb-8 flex items-center space-x-2">
        <p className="text-lg font-semibold text-gray-700">Studi Anda</p>

        {/* Arrow Icon */}
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

        {/* "Profil" Text */}
        <p className="text-lg font-medium text-gray-900 font-poppins">Profil</p>
      </div>

      {/* Profile Section */}
      <div className="flex justify-center">
        <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg max-w-2xl w-full flex space-x-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center translate-y-[80px]">
            <Image
              src="/assets/Class/Icon_user.png"
              alt="Profile Picture"
              width={128} // Adjust width as needed
              height={128} // Adjust height as needed
              className="rounded-full" // Ensures the image is circular
            />
          </div>


          {/* Profile Details */}
          <div className="grid gap-4 w-full">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Nama</label>
              <input
                type="text"
                defaultValue=""
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">NIS</label>
              <input
                type="text"
                defaultValue=""
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
                <input
                  type="text"
                  defaultValue=""
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
                <input
                  type="text"
                  defaultValue=""
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleChangePasswordClick}
                className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 translate-x-[30px]"
              >
                Ganti Password
              </button>
              <button
                onClick={handleLogoutClick}
                className="bg-red text-white px-10 py-2 rounded-md hover:bg-red-600 translate-x-[50px]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
