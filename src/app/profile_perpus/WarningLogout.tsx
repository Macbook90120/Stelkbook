import React from 'react';

interface WarningModalProps {
  onClose: () => void; // Tutup modal
  onConfirm: () => void; // Konfirmasi logout
  isLoading: boolean; // Status loading logout
}

const WarningModal: React.FC<WarningModalProps> = ({ onClose, onConfirm, isLoading }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md">
        {/* Judul Modal */}
        <h2 className="text-xl font-bold mb-4 text-center text-red-600">WARNING!</h2>

        {/* Pesan Modal */}
        <p className="text-gray-600 mb-6 text-center">
          Apakah kamu mau log out? Data yang belum disimpan akan hilang.
        </p>

        {/* Tombol Aksi */}
        <div className="flex justify-center space-x-4">
          {/* Tombol Batal */}
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            onClick={onClose}
            disabled={isLoading}
          >
            Tidak
          </button>

          {/* Tombol Logout */}
          <button
            className="px-4 py-2 bg-red text-white rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              'Log Out'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
