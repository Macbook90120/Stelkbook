'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NotificationSuccess from './notification_success';

function Page() {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    // Disable scroll when the component is mounted
    document.body.style.overflow = 'hidden';

    // Cleanup: Enable scroll when the component is unmounted
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleStelkbookClick = () => {
    router.push('http://localhost:3000/');
  };

  const togglePasswordVisibility = (field: string) => {
    if (field === 'newPassword') setShowNewPassword(!showNewPassword);
    if (field === 'confirmPassword') setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match!');
      return;
    }

    // Simulate password change success
    setIsPopupVisible(true);
    setPasswordError('');
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    // Redirect or perform other actions if needed
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-4">
        <div className="flex-shrink-0 cursor-pointer" onClick={handleStelkbookClick}>
          <Image src="/assets/Class/Stelk_bookTitle.png" alt="Stelkbook" width={165} height={100} />
        </div>
        <div className="flex-shrink-0">
          <span
            className="font-semibold text-lg"
            style={{
              color: '#FF0000',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            LOG IN
          </span>
        </div>
      </header>
      <div className="mb-8">
        <Image src="/assets/Class/Lines.png" alt="Header Line" width={3000} height={100} />
      </div>
      <div className="flex justify-center min-h-screen p-20">
        <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg max-w-96 w-96 h-auto translate-y-[-70px]">
          <div className="w-32 h-32 bg-white rounded-full flex-shrink-0 mx-auto mb-6 translate-y-[10px]">
            <Image
              src="/assets/Forgot-password/icon_guest.png"
              alt="Profile Image"
              width={128}
              height={128}
              className="rounded-full"
            />
          </div>
          <div className="text-center mb-6">
            <h2
              className="font-semibold text-xl"
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#333',
              }}
            >
              Ganti Password
            </h2>
            <p className="text-sm text-gray-600">
              Masukkan Email Anda dan Kata sandi anda, harus minimal 6 karakter dan harus mencakup kombinasi angka, huruf, dan karakter khusus (!@$%).
            </p>
          </div>
          <div className="grid gap-4">
            {/* Email anda Field */}
            <div className="relative">
              <input
                type="email"
                placeholder="Masukkan Password Lama"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* New Password Field */}
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

            {/* Confirm New Password Field */}
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
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">{passwordError}</p>
            )}
          </div>
          <div className="mt-6">
            <button
              className="w-full bg-red text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition"
              onClick={handleChangePassword}
              disabled={newPassword !== confirmPassword || !newPassword || !confirmPassword || !oldPassword}
            >
              Ganti Password
            </button>
          </div>
        </div>
      </div>

      {/* Notification Popup */}
      {isPopupVisible && (
        <NotificationSuccess
          message="Password telah Terganti"
          description="Silahkan Login menggunakan password yang telah diganti."
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default Page;