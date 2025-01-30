"use client";
import React from "react";
import Image from "next/image";

type WarningModalProps = {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const WarningModalBuku: React.FC<WarningModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* Modal Header */}
        <h2 className="text-xl font-semibold text-center mb-4">
          Apakah Anda yakin ingin menghapus buku ini?
        </h2>

        {/* Book Details */}
        <div className="flex items-center gap-4 mb-6">
          {/* Book Cover */}
          <div>
            <Image
              src="/assets/Kelas_X/Buku_Ekonomi.png"
              alt="Buku Paket Ekonomi"
              width={70}
              height={100}
              className="rounded shadow-md"
            />
          </div>

          {/* Book Metadata */}
          <div className="text-sm">
            <h3 className="font-bold">Buku paket Ekonomi SMA Kelas X</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <strong>Penerbit:</strong> Yudistira
              </li>
              <li>
                <strong>Penulis:</strong> Endang Mulyadi
              </li>
              <li>
                <strong>Tahun:</strong> 2018
              </li>
              <li>
                <strong>ISBN:</strong> 9786022995708
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Ya
          </button>
          <button
            onClick={onCancel}
            className="bg-red text-white px-4 py-2 rounded-md hover:bg-red transition"
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModalBuku;
