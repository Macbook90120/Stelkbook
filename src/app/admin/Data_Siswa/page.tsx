"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HapusUserModal from "./hapus_user";
import Navbar from "@/components/Navbar_Admin";
import { useAuth } from "@/context/authContext";

// Definisi tipe Siswa
interface Siswa {
  id: string;
  user_id: string;
  username: string; // Gunakan ini sebagai `name`
  nis: string;
  gender: string;
  sekolah: string;
  kelas:string;
}

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState({ id: "", name: "", sekolah: "", nis: "",kelas:"" });
  const { fetchAllSiswa, siswaData, } = useAuth(); // Ambil deleteSiswa dari useAuth
  const router = useRouter();

  // Ambil data siswa saat komponen dimuat
  useEffect(() => {
    const getSiswaData = async () => {
      try {
        await fetchAllSiswa();
      } catch (error) {
        console.error("Gagal mengambil data siswa:", error);
      }
    };

    getSiswaData();
  }, [fetchAllSiswa]);

  // Fungsi untuk membuka modal hapus user
  const handleDeleteUser = (siswa: Siswa) => {
    setSelectedSiswa({ id: siswa.id, name: siswa.username, sekolah: siswa.sekolah, nis: siswa.nis , kelas:siswa.kelas });
    setIsModalOpen(true);
  };

  // Filter siswa berdasarkan jenjang sekolah (case-sensitive)
  const siswaSD = siswaData?.filter((siswa: Siswa) => siswa.sekolah.includes("SD"));
  const siswaSMP = siswaData?.filter((siswa: Siswa) => siswa.sekolah.includes("SMP"));
  const siswaSMK = siswaData?.filter((siswa: Siswa) => siswa.sekolah.includes("SMK"));

  const handleEditUser = (siswa: Siswa) => {
    router.push(`/admin/Data_Siswa/Edit_user?id=${siswa.id}`);
  };
  
  return (
    <div className="min-h-screen p-8 bg-gray-50 overflow-y-auto">
      <header className="flex justify-between items-center mb-4 pt-20 px-8">
        <Navbar />
      </header>

      <div className="mb-8 flex items-center ">
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
          Siswa
        </p>
      </div>

      {/* Div untuk Siswa SD */}
      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <h2 className="text-xl text-OldRed font-semibold mb-4">SD</h2>
        {siswaSD?.map((siswa: Siswa) => (
          <div
            key={siswa.id}
            className="grid grid-cols-12 gap-4 items-center py-4 border-b"
          >
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
                <p className="font-semibold text-sm text-OldRed">{siswa.sekolah}</p>
                <p className="text-sm text-gray-500">{siswa.nis}</p>
                <p className="text-sm text-gray-500">Kelas {siswa.kelas}</p>
              </div>
            </div>
            <div className="col-span-8 flex justify-end space-x-2">
              <button
                className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                onClick={() => handleEditUser(siswa)}
              >
                <Image
                  src="/assets/icon/edit.svg"
                  alt="Edit Icon"
                  width={16}
                  height={16}
                  className="md:mr-2"
                />
                <span className="hidden md:block">Edit User</span>
              </button>
              <button
                className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-red rounded-lg hover:bg-red-600"
                onClick={() => handleDeleteUser(siswa)}
              >
                <Image
                  src="/assets/icon/delete.svg"
                  alt="Delete Icon"
                  width={16}
                  height={16}
                  className="md:mr-2"
                />
                <span className="hidden md:block">Hapus User</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Div untuk Siswa SMP */}
      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <h2 className="text-xl text-OldRed font-semibold mb-4">SMP</h2>
        {siswaSMP?.map((siswa: Siswa) => (
          <div
            key={siswa.id}
            className="grid grid-cols-12 gap-4 items-center py-4 border-b"
          >
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
                <p className="font-semibold text-sm text-OldRed">{siswa.sekolah}</p>
                <p className="text-sm text-gray-500">{siswa.nis}</p>
                <p className="text-sm text-gray-500">Kelas {siswa.kelas}</p>
              </div>
            </div>
            <div className="col-span-8 flex justify-end space-x-2">
              <button
                className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                onClick={() => handleEditUser(siswa)}
              >
                <Image
                  src="/assets/icon/edit.svg"
                  alt="Edit Icon"
                  width={16}
                  height={16}
                  className="md:mr-2"
                />
                <span className="hidden md:block">Edit User</span>
              </button>
              <button
                className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-red rounded-lg hover:bg-red-600"
                onClick={() => handleDeleteUser(siswa)}
              >
                <Image
                  src="/assets/icon/delete.svg"
                  alt="Delete Icon"
                  width={16}
                  height={16}
                  className="md:mr-2"
                />
                <span className="hidden md:block">Hapus User</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Div untuk Siswa SMK */}
      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <h2 className="text-xl text-OldRed font-semibold mb-4">SMK</h2>
        {siswaSMK?.map((siswa: Siswa) => (
          <div
            key={siswa.id}
            className="grid grid-cols-12 gap-4 items-center py-4 border-b"
          >
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
                <p className="font-semibold text-sm text-OldRed">{siswa.sekolah}</p>
                <p className="text-sm text-gray-500">{siswa.nis}</p>
                <p className="text-sm text-gray-500"> Kelas {siswa.kelas}</p>
              </div>
            </div>
            <div className="col-span-8 flex justify-end space-x-2">
              <button
                className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                onClick={() =>handleEditUser(siswa)}
              >
                <Image
                  src="/assets/icon/edit.svg"
                  alt="Edit Icon"
                  width={16}
                  height={16}
                  className="md:mr-2"
                />
                <span className="hidden md:block">Edit User</span>
              </button>
              <button
                className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-red rounded-lg hover:bg-red-600"
                onClick={() => handleDeleteUser(siswa)}
              >
                <Image
                  src="/assets/icon/delete.svg"
                  alt="Delete Icon"
                  width={16}
                  height={16}
                  className="md:mr-2"
                />
                <span className="hidden md:block">Hapus User</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Hapus User */}
      {isModalOpen && (
        <HapusUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          siswa={selectedSiswa}
        />
      )}
    </div>
  );
}

export default Page;