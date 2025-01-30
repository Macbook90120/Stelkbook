'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ConfirmationModal from './hapus_user'; // Import the delete modal component
import ResetPasswordModal from './reset_user'; // Import the reset password modal component

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false); // State for reset password modal
  const [selectedUser, setSelectedUser] = useState({ name: '', nis: '' }); // Store user details for modal
  const router = useRouter();

  const handleButtonClick = (action: string) => {
    if (action === 'User') {
      router.push('/profile_admin');
    } else if (action === 'Edit_user') {
      router.push('/admin/Data_Guru/Edit_user_guru');
    }
  };


  const handleDeleteUser = (user: { name: string; nis: string }) => {
    setSelectedUser(user);
    setIsModalOpen(true); // Open the delete confirmation modal
  };

  const handleResetPassword = (user: { name: string; nis: string }) => {
    setSelectedUser(user);
    setIsResetModalOpen(true); // Open the reset password modal
  };

  const handleStelkbookClick = () => {
    router.push('/admin'); // navigasi untuk perpustakaan homepage
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 overflow-y-auto">
      <header className="flex justify-between items-center mb-4">
        {/* Stelkbook Title */}
        <div className="flex-shrink-0 cursor-pointer" onClick={handleStelkbookClick}>
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
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Image
              src="/assets/Class/Search_icon.png"
              alt="Search Icon"
              width={20}
              height={20}
            />
          </div>
        </div>

        {/* User Icon */}
        <div
          className="flex-shrink-0 cursor-pointer"
          onClick={() => handleButtonClick('User')}
        >
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

      {/* Database Anda Text */}
      <div className="mb-8 flex items-center">
        <p className="text-xl font-semibold text-left font-poppins translate-y-[-15px]">
          Database Anda
        </p>
        <div className="mx-2">
          <Image
            src="/assets/Kelas_X/Primary_Direct.png"
            alt="Divider Icon"
            width={10}
            height={16}
            className="translate-y-[-15px] translate-x-[1px]"
          />
        </div>
        <p className="text-xl font-semibold text-left font-poppins translate-y-[-15px]">
          Guru
        </p>
      </div>

      {/* User List */}
      <div className="bg-white rounded-lg shadow p-4">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 items-center py-4 border-b"
            >
              <div className="col-span-4 flex items-center">
                <Image
                  src="/assets/Class/icon_user.png"
                  alt="User Icon"
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">Nama User</p>
                  <p className="text-sm text-gray-500">NIS User</p>
                </div>
              </div>
              <div className="col-span-8 flex justify-end space-x-2">
                <button className="flex items-center px-16 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                  onClick={() => handleButtonClick('Edit_user')}>
                  <Image
                    src="/assets/Admin/Edit_user.png"
                    alt="Edit Icon"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  Edit User
                </button>
                <button
                  className="flex items-center px-16 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                  onClick={() =>
                    handleResetPassword({ name: 'Nama User', nis: 'NIS User' })
                  }
                >
                  <Image
                    src="/assets/Admin/Reset_user.png"
                    alt="Reset Icon"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  Reset Password
                </button>
                <button
                  className="flex items-center px-16 py-2 text-white bg-red rounded-lg hover:bg-red"
                  onClick={() =>
                    handleDeleteUser({ name: 'Nama User', nis: 'NIS User' })
                  }
                >
                  <Image
                    src="/assets/Admin/Delete_user.png"
                    alt="Delete Icon"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  Hapus User
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Confirmation Modals */}
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={selectedUser}
        />
      )}

      {isResetModalOpen && (
        <ResetPasswordModal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          user={selectedUser}
        />
      )}
    </div>
  );
}

export default Page;
