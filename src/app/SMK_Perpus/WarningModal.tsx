import React from 'react';
import { useRouter } from 'next/navigation';

interface WarningModalProps {
  onClose: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ onClose }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing session, user data, etc.)
    router.push('/');
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">WARNING!</h2>
        <p className="text-gray-600 mb-6 text-center">
          Apakah kamu mau log out? data pun yang belum disimpan akan hilang.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors min-h-[44px]"
            onClick={onClose}
          >
            Tidak
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors min-h-[44px]"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
