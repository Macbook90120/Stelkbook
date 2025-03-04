'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  const handleStelkbookClick = () => {
    router.push('/admin'); // navigasi untuk perpustakaan homepage
  };

  const handleSelesaiClick = () => {
    // Navigate to the target page after clicking 'Selesai'
    router.push('/admin/Data_Guru');
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

      {/* Breadcrumb Text */}
      <div className="mb-8 flex items-center space-x-2">
        <p className="text-lg font-semibold text-gray-600">Database Anda</p>

        {/* First Arrow Icon */}
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

        {/* "Guru" Text */}
        <p className="text-lg font-semibold text-gray-600">Guru</p>

        {/* Second Arrow Icon */}
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

        {/* "Edit User" Text */}
        <p className="text-lg font-medium text-black">Edit User</p>
      </div>

      {/* Profile Section */}
      <div className="flex justify-center">
        <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg max-w-4xl w-full flex items-center space-x-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-full flex-shrink-0"></div>
          </div>

          {/* Profile Details */}
          <div className="grid gap-4 w-full">
            {/* Username Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                defaultValue=""
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="text"
                defaultValue=""
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="text"
                defaultValue=""
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* NIS/NIK Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">NIS/NIP</label>
              <input
                type="email"
                defaultValue=""
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status and Gender Fields */}
            <div className="flex space-x-4">
              {/* Status Field */}
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
                <input
                  type="text"
                  defaultValue="Siswa"
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Gender Field */}
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
                <input
                  type="text"
                  defaultValue=""
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button className="bg-red text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 translate-x-[-50px]" onClick={handleSelesaiClick}>
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
