  import React from 'react';

interface WarningModalProps {
  onClose: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4 translate-x-[10px]">SILAHKAN HUBUNGI ADMINISTRATOR!</h2>
        <p className="text-gray-600 mb-6">
          apakah anda lupa password dan username? silahkan hubungi administrator dibawah ini
          <br/>
          <br/>
          <br/>
          Nomor HP : 08123456789
          <br/>
          Email: admin20@gmail.com
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md translate-x-[-170px]"
            onClick={onClose}
          >
            Iya
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;