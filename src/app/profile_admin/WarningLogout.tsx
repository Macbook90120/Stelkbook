import React from 'react';

interface WarningModalProps {
  onClose: () => void; // Function to close the modal
  onConfirm: () => void; // Function to confirm the logout action
  isLoading: boolean; // ← TAMBAHKAN INI
}

const WarningModal: React.FC<WarningModalProps> = ({ onClose, onConfirm,isLoading }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md">
        {/* Modal Title */}
        <h2 className="text-xl font-bold mb-4 text-center text-red-600">WARNING!</h2>

        {/* Modal Message */}
        <p className="text-gray-600 mb-6 text-center">
          Apakah kamu mau log out? Data yang belum disimpan akan hilang.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          {/* Cancel Button */}
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            onClick={onClose}
          >
            Tidak
          </button>

          {/* Confirm Logout Button */}
          <button
            className="px-4 py-2 bg-red text-white rounded-md hover:bg-red-600 transition-colors"
            onClick={onConfirm}
            disabled={isLoading}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;