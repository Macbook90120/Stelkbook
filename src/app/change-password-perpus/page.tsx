'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NotificationSuccess from './notification_success';
import { useAuth } from '@/context/authContext';

function Page() {
  const router = useRouter();
  const { changePassword } = useAuth();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleStelkbookClick = () => {
    router.push('/');
  };

  const togglePasswordVisibility = (field: 'oldPassword' | 'newPassword' | 'confirmPassword') => {
    if (field === 'oldPassword') setShowOldPassword((prev) => !prev);
    if (field === 'newPassword') setShowNewPassword((prev) => !prev);
    if (field === 'confirmPassword') setShowConfirmPassword((prev) => !prev);
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError('Semua kolom harus diisi!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Password baru dan konfirmasi tidak cocok!');
      return;
    }

    setIsLoading(true);
    setPasswordError('');
    try {
      await changePassword(oldPassword, newPassword, confirmPassword);
      setIsPopupVisible(true);
    } catch (error: any) {
      console.error("Gagal mengubah password:", error);
      if (error.response?.data?.message) {
        setPasswordError(error.response.data.message);
      } else {
        setPasswordError('Terjadi kesalahan saat mengubah password.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-4">
        <div className="flex-shrink-0 cursor-pointer" onClick={handleStelkbookClick}>
          <Image src="/assets/Class/Stelk_bookTitle.png" alt="Stelkbook" width={165} height={100} />
        </div>
        <div className="flex-shrink-0">
          <span className="font-semibold text-lg text-red">LOG IN</span>
        </div>
      </header>

      <div className="mb-8">
        <Image src="/assets/Class/Lines.png" alt="Header Line" width={3000} height={100} />
      </div>

      <div className="flex justify-center min-h-screen p-20">
        <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg max-w-96 w-96 h-auto">
          <div className="w-32 h-32 bg-white rounded-full flex-shrink-0 mx-auto mb-6">
            <Image src="/assets/Forgot-password/icon_guest.png" alt="Profile" width={128} height={128} className="rounded-full" />
          </div>

          <div className="text-center mb-6">
            <h2 className="font-semibold text-xl text-gray-800">Ganti Password</h2>
            <p className="text-sm text-gray-600">Masukkan Password Lama dan Password Baru.</p>
          </div>

          <div className="grid gap-4">
            <div className="relative">
              <input 
                type={showOldPassword ? 'text' : 'password'}
                placeholder="Masukkan Password Lama" 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Image
              src={showOldPassword ? '/assets/Forgot-password/unhide2.png' : '/assets/Forgot-password/hide.png'}
              alt="Toggle Visibility"
              width={20}
              height={20}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => togglePasswordVisibility('oldPassword')}
              />
            </div>
            <div className="relative">
              <input 
                type={showNewPassword ? 'text' : 'password'} 
                placeholder="Masukkan Password Baru" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Image
              src={showNewPassword ? '/assets/Forgot-password/unhide2.png' : '/assets/Forgot-password/hide.png'}
              alt="Toggle Visibility"
              width={20}
              height={20}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => togglePasswordVisibility('newPassword')}
              />
            </div>
            <div className="relative">
              <input 
                type={showConfirmPassword ? 'text' : 'password'} 
                placeholder="Ulangi Password Baru" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Image
              src={showConfirmPassword ? '/assets/Forgot-password/unhide2.png' : '/assets/Forgot-password/hide.png'}
              alt="Toggle Visibility"
              width={20}
              height={20}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => togglePasswordVisibility('confirmPassword')}
              />
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
          </div>

          <div className='mt-6'>
            <button 
              className="w-full bg-red text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition flex justify-center items-center" 
              onClick={handleChangePassword} 
              disabled={isLoading || !oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
              ) : (
                'Ganti Password'
              )}
            </button>
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <NotificationSuccess 
          message="Password telah terganti" 
          description="Silahkan Login menggunakan password yang telah diganti." 
          onClose={handleClosePopup} 
        />
      )}
    </div>
  );
}

export default Page;
