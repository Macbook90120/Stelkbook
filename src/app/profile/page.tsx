'use client';
import React, { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== null && user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  const handleLogoutClick = () => {
    setShowWarningModal(true);
  };

  const handleConfirmLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowWarningModal(false);
  };

  // Loading spinner
  if (isLoading || !user) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <header className="flex justify-between items-center mb-4">
          <div className="mb-8"><Navbar /></div>
        </header>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-4">
        <div className="mb-8"><Navbar /></div>
      </header>

      {/* Profile Section */}
      <div className="flex justify-center pt-12 px-8">
        <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg w-full max-w-3xl flex flex-col lg:flex-row lg:items-center lg:space-x-8">
          
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start items-center mb-6 lg:mb-0">
            <Image
              src={user.avatar ? `http://localhost:8000/storage/${user.avatar}` : "/assets/Class/Icon_user.png"}
              alt="Profile Picture"
              width={200}
              height={200}
              quality={100}
              className="w-48 h-48 object-cover rounded-full"
              priority
              style={{ width: 'auto', height: 'auto' }}
              onError={(e) => {
                e.currentTarget.src = "/assets/Class/Icon_user.png";
              }}
            />
          </div>

          {/* Profile Details */}
          <div className="flex flex-col w-full">
            <div className="grid gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Nama</label>
                <input
                  type="text"
                  value={user.username || ''}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">NIS</label>
                <input
                  type="text"
                  value={user.kode || ''}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                <input
                  type="text"
                  value={user.email || ''}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Sekolah</label>
                <input
                  type="text"
                  value={user.sekolah || ''}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">Kelas</label>
                <input
                  type="text"
                  value={user.kelas || ''}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Status</label>
                  <input
                    type="text"
                    value={user.role || ''}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Gender</label>
                  <input
                    type="text"
                    value={user.gender || ''}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLogoutClick}
                disabled={isLoading}
                className="w-full md:w-auto bg-red text-white px-24 py-2 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Image
                  src="/assets/Class/logout.png"
                  alt="Logout Icon"
                  width={16}
                  height={16}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
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
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default Page;
