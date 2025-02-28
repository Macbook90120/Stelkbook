'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import WarningModal from '@/app/profile/WarningLogout'; // Import the WarningModal component

function Page() {
  const router = useRouter();
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [profileImage, setProfileImage] = useState('/assets/Class/Icon_user.png');
  const fileInputRef = useRef<HTMLInputElement>(null); // Specify the type for useRef

  const handleChangePasswordClick = () => {
    router.push('/change-password'); // Navigate to the change password page
  };

  const handleLogoutClick = () => {
    setShowWarningModal(true); // Show the warning modal when logout is clicked
  };

  const handleConfirmLogout = () => {
    // Perform any logout logic here (e.g., clearing session, user data, etc.)
    router.push('http://localhost:3000/'); // Redirect to the home page
  };

  const handleCloseModal = () => {
    setShowWarningModal(false); // Close the modal
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Use optional chaining to safely access files
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleEditIconClick = () => {
    fileInputRef.current?.click(); // Safely access `current` using optional chaining
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-4">
        {/* Navbar */}
        <div className="mb-8"><Navbar /></div>
      </header>

      {/* Profile Section */}
      <div className="flex justify-center pt-12 px-8">
        <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg w-full max-w-3xl flex flex-col lg:flex-row lg:items-center lg:space-x-8">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start items-center mb-6 lg:mb-0 relative">
            <Image
              src={profileImage}
              alt="Profile Picture"
              width={128}
              height={128}
              className="rounded-full"
            />
            <Image
              src="/assets/Class/Edit_Icon.png"
              alt="Edit Icon"
              width={28}
              height={28}
              className="absolute bottom-0 right-0 bg-green-400 p-1 rounded-full cursor-pointer"
              onClick={handleEditIconClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

          {/* Profile Details */}
          <div className="flex flex-col w-full relative">
            <Image
              src="/assets/Class/Edit_Icon.png"
              alt="Edit Icon"
              width={24}
              height={24}
              className="absolute top-4 right-4 translate-x-5 translate-y-[-30px] cursor-pointer"
              onClick={() => console.log('Edit clicked')}
            />

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
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Sekolah</label>
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

      {/* Warning Modal */}
      {showWarningModal && (
        <WarningModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmLogout}
        />
      )}
    </div>
  );
}

export default Page;