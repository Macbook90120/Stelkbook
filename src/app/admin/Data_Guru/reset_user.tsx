'use client';
import React from 'react';
import Image from 'next/image';

type ResetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; nis: string };
};

const ResetModal: React.FC<ResetModalProps> = ({ isOpen, onClose, user }) => {
  const handleConfirm = () => {
    console.log(`Resetting password for user: ${user.name} with NIS: ${user.nis}`);
    // Implement the reset password logic here
    onClose(); // Close the modal after confirmation
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] text-center">
        <p className="text-lg font-semibold mb-4 translate-y-[-14px]">
          Apakah Anda yakin <br /> ingin mereset password user ini?
        </p>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="relative w-12 h-12 translate-x-[-75px] translate-y-[-5px]">
            <Image
              src="/assets/Class/icon_user.png" // Path to the image
              alt="User Icon"
              width={38} // Explicitly set the width
              height={38} // Explicitly set the height
              className="rounded-full"
            />
          </div>
          <div>
            <p className="font-bold translate-x-[-90px] translate-y-[-5px]">{user.name}</p>
            <p className="text-gray-500 translate-x-[-100px] translate-y-[-5px]">{user.nis}</p>
          </div>
        </div>
        <div className="flex justify-around mt-4">
          <button
            onClick={handleConfirm}
            className="px-10 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Ya
          </button>
          <button
            onClick={onClose}
            className="px-8 py-2 text-white bg-red rounded-lg hover:bg-red"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetModal;