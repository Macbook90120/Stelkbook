'use client';
import React, { useState } from 'react';
import Image from 'next/image';

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: { id: string; name: string; nis: string };
  onConfirm: (userId: string) => void; // Prop untuk handle penghapusan
};

const HapusUserModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  user,
  onConfirm,
}) => {
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const [error, setError] = useState<string | null>(null); // State untuk error

  const handleConfirm = async () => {
    setIsLoading(true); // Set loading ke true
    setError(null); // Reset error

    try {
      await onConfirm(user.id); // Panggil fungsi onConfirm dengan user.id
      onClose(); // Tutup modal setelah berhasil
    } catch (err) {
      setError('Gagal menghapus user. Silakan coba lagi.'); // Set pesan error
      console.error('Error deleting user:', err);
    } finally {
      setIsLoading(false); // Set loading ke false
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] text-center">
        <p className="text-lg font-semibold mb-4 translate-y-[-14px]">
          Apakah Anda yakin <br></br> ingin menghapus user ini?
        </p>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="relative w-12 h-12 translate-x-[-75px] translate-y-[-5px]">
            <Image
              src="/assets/Class/icon_user.png"
              alt="User Icon"
              width={38}
              height={38}
              className="rounded-full"
            />
          </div>
          <div>
            <p className="font-bold translate-x-[-90px] translate-y-[-5px]">{user.name}</p>
            <p className="text-gray-500 translate-x-[-100px] translate-y-[-5px]">{user.nis}</p>
          </div>
        </div>

        {/* Tampilkan pesan error jika ada */}
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <div className="flex justify-around mt-4">
          <button
            onClick={handleConfirm}
            disabled={isLoading} // Nonaktifkan tombol saat loading
            className={`px-10 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Menghapus...' : 'Ya'}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading} // Nonaktifkan tombol saat loading
            className={`px-8 py-2 text-white bg-red rounded-lg hover:bg-red ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};

export default HapusUserModal;