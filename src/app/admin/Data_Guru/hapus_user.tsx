'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/authContext'; // Impor useAuth

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  guru: { id: string; name: string; sekolah: string; nip: string };
};

const HapusUserModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  guru,
}) => {
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const [error, setError] = useState<string | null>(null); // State untuk error
  const { deleteGuru, fetchAllGuru } = useAuth(); // Ambil fungsi deleteGuru dan fetchGuru dari useAuth

  const handleConfirm = async () => {
    setIsLoading(true); // Set loading ke true
    setError(null); // Reset error

    try {
      // console.log("Menghapus guru dengan ID:", guru.id); // Log ID yang dikirim
      await deleteGuru(guru.id); // Panggil fungsi deleteGuru dengan ID guru
      // console.log("Guru berhasil dihapus"); // Log keberhasilan
      await fetchAllGuru(); // Refresh data guru setelah penghapusan
      onClose(); // Tutup modal setelah berhasil
    } catch (err) {
      console.error('Error deleting guru:', err); // Log error
      setError('Gagal menghapus guru. Silakan coba lagi.'); // Set pesan error
    } finally {
      setIsLoading(false); // Set loading ke false
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] text-center">
        <p className="text-lg font-semibold mb-4">
          Apakah Anda yakin ingin menghapus guru ini?
        </p>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="relative w-12 h-12">
            <Image
              src="/assets/Class/icon_user.png"
              alt="User Icon"
              width={38}
              height={38}
              className="rounded-full"
            />
          </div>
          <div>
            <p className="font-bold">{guru.name}</p>
            <p className="font-bold text-sm text-OldRed">{guru.sekolah}</p>
            <p className="text-gray-500">{guru.nip}</p>
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