'use client'
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ConfirmationModal from "./hapus_user";
import Navbar from "@/components/Navbar_Admin";

interface Siswa {
  id: string;
  username: string;
  nis: string;
  sekolah: string;
  kelas: string;
}

const DataSiswaSMP: React.FC = () => {
  const { siswaSmpData, fetchAllSiswaSmp } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState<Siswa | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchAllSiswaSmp(); // Ambil semua data siswa SMP
  }, [fetchAllSiswaSmp]);

  const handleDeleteSiswa = (siswa: Siswa) => {
    setSelectedSiswa(siswa);
    setIsModalOpen(true); // Buka modal hapus
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 overflow-y-auto">
      <header className="flex justify-between items-center mb-4 pt-20 px-8">
        <Navbar />
      </header>
      <div className="mb-8 flex items-center">
        <p className="text-xl font-semibold text-left font-poppins translate-y-[-15px]">
          Database Anda
        </p>
        <div className="mx-2">
          <Image
            src="/assets/Kelas_X/Primary_Direct.png"
            alt="Divider Icon"
            width={10}
            height={16}
            className="translate-y-[-15px] translate-x-[1px]"
          />
        </div>
        <p className="text-xl font-semibold text-left font-poppins translate-y-[-15px]">
          Siswa SMP
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        {siswaSmpData?.length > 0 ? (
          siswaSmpData.map((siswa: Siswa) => (
            <div key={siswa.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b">
              <div className="col-span-4 flex items-center">
                <Image
                  src="/assets/Class/icon_user.png"
                  alt="User Icon"
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{siswa.username}</p>
                  <p className="font-semibold text-OldRed">{siswa.sekolah}</p>
                  <p className="font-semibold text-OldRed">Kelas {siswa.kelas}</p>
                  <p className="text-sm text-gray-500">{siswa.nis}</p>
                </div>
              </div>
              <div className="col-span-8 flex justify-end space-x-2">
                <button
                  className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                  onClick={() => router.push(`/admin/Sekolah_Siswa/Data_SMP/Edit_user?id=${siswa.id}`)}
                >
                  <Image
                    src="/assets/Admin/Edit_user.png"
                    alt="Edit Icon"
                    width={16}
                    height={16}
                    className="md:mr-2"
                  />
                  <span className="hidden md:block">Edit Siswa</span>
                </button>
                <button
                  className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-red rounded-lg hover:bg-red"
                  onClick={() => handleDeleteSiswa(siswa)}
                >
                  <Image
                    src="/assets/Admin/Delete_user.png"
                    alt="Delete Icon"
                    width={16}
                    height={16}
                    className="md:mr-2"
                  />
                  <span className="hidden md:block">Hapus Siswa</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">Tidak ada data siswa tersedia.</p>
        )}
      </div>
      {isModalOpen && selectedSiswa && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          siswa={selectedSiswa}
        />
      )}
    </div>
  );
};

export default DataSiswaSMP;
