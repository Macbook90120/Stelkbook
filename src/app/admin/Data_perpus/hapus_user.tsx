'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/authContext';

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  perpus: { id: string; name: string; nip: string; avatar?: string }; // avatar ditambahkan
  onSuccess?: () => void;
};

const HapusUserModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  perpus,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { deletePerpus } = useAuth();

  const handleConfirm = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await deletePerpus(perpus.id);
      console.log("Perpus berhasil dihapus");
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Error deleting perpus:', err);
      setError('Gagal menghapus perpus. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] text-center">
        <p className="text-lg font-semibold mb-4">
          Apakah Anda yakin ingin menghapus perpus ini?
        </p>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="relative w-12 h-12">
            <Image
              src={
                perpus.avatar
                  ? `http://localhost:8000/storage/${perpus.avatar}`
                  : "/assets/Class/icon_user.png"
              }
              alt="User Icon"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <p className="font-bold">{perpus.name}</p>
            <p className="text-gray-500">{perpus.nip}</p>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <div className="flex justify-around mt-4">
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`px-10 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Menghapus...' : 'Ya'}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
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
