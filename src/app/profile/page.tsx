'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

function Page() {
  const router = useRouter();

  const handleChangePasswordClick = () => {
    router.push('/change-password'); // navigasi untuk halaman ganti password
  };

  const handleLogoutClick = () => {
    router.push('http://localhost:3000/'); // navigasi untuk halaman logout
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
            <header className="flex justify-between items-center mb-4">
        {/* Navbar */}
        <div className="mb-8"><Navbar /></div>
      </header>

      {/* Studi Anda Text */}
      {/* <div className="mb-8 flex items-center space-x-2">
        <p className="text-lg font-semibold text-gray-700">Profil</p> */}

        {/* Arrow Icon */}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg> */}

        {/* "Profil" Text */}
        {/* <p className="text-lg font-medium text-gray-900 font-poppins">Profil</p>
      </div> */}

      {/* Profile Section */}
      <div className="flex justify-center pt-12 px-8">
        <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg w-full max-w-3xl flex flex-col lg:flex-row lg:items-center lg:space-x-8">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start items-center mb-6 lg:mb-0">
            <Image
              src="/assets/Class/Icon_user.png"
              alt="Profile Picture"
              width={128}
              height={128}
              className="rounded-full"
            />
          </div>

          {/* Profile Details */}
          <div className="flex flex-col w-full">
            {/* Input Fields */}
            <div className="grid gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
                  <input
                    type="text"
                    defaultValue=""
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
                  <input
                    type="text"
                    defaultValue=""
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

             {/* Action Buttons */}
            <div className="flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0 mt-6">
              <button
                onClick={handleChangePasswordClick}
                className="w-full md:w-auto bg-yellow-500 text-white px-14 py-2 rounded-md hover:bg-yellow-600 flex items-center justify-center space-x-2"
              >
                <Image
                  src="/assets/Admin/Reset_user.png"
                  alt="Reset Icon"
                  width={16}
                  height={16}
                />
                <span>Ganti Password</span>
              </button>
              <button
                onClick={handleLogoutClick}
                className="w-full md:w-auto bg-red text-white px-24 py-2 rounded-md hover:bg-red-600 flex items-center justify-center space-x-2"
              >
                <Image
                  src="/assets/Class/logout.png"
                  alt="Reset Icon"
                  width={16}
                  height={16}
                />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
