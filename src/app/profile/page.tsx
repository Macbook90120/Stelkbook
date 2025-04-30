'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar_Lainnya';
import WarningModal from '@/app/profile/WarningLogout';
import { useAuth } from '@/context/authContext';
import useAuthMiddleware from '@/hooks/auth';

function Page() {
  useAuthMiddleware();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleLogoutClick = () => {
    setShowWarningModal(true);
  };

  const handleConfirmLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleCloseModal = () => {
    setShowWarningModal(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-4">
        <div className="mb-8"><Navbar /></div>
      </header>

      <div className="flex justify-center pt-12 px-8">
        <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg w-full max-w-3xl flex flex-col lg:flex-row lg:items-center lg:space-x-8">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start items-center mb-6 lg:mb-0">
            <Image
              src={user?.avatar ? `http://localhost:8000/storage/${user?.avatar}` : "/assets/Class/Icon_user.png"}
              alt="Profile Picture"
              width={200}
              height={200}
              quality={100}
                  className="w-48 h-48 object-cover rounded-full mr-3"
            />
          </div>

          {/* Profile Details */}
          <div className="flex flex-col w-full">
            <div className="grid gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Nama</label>
                <input
                  type="text"
                  defaultValue={user?.username || ''}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">NIS</label>
                <input
                  type="text"
                  defaultValue={user?.kode || ''}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                <input
                  type="text"
                  defaultValue={user?.email || ''}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Sekolah</label>
                <input
                  type="text"
                  defaultValue={user?.sekolah || ''}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Kelas</label>
                <input
                  type="text"
                  defaultValue={user?.kelas || ''}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
                  <input
                    type="text"
                    defaultValue={user?.role || ''}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
                  <input
                    type="text"
                    defaultValue={user?.gender || ''}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Logout Button - Centered */}
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLogoutClick}
                className="bg-red text-white px-24 py-2 rounded-md hover:bg-red-600 flex items-center justify-center space-x-2"
              >
                <Image
                  src="/assets/Class/logout.png"
                  alt="Logout Icon"
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
