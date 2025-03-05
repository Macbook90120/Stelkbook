"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HapusUserModal from "./hapus_user";
import Navbar from "@/components/Navbar_Admin";
import { useAuth } from "@/context/authContext";

// Definisi tipe Guru
interface Guru {
  id: string;
  user_id: string;
  username: string; // Gunakan ini sebagai `name`
  nip: string;
  gender: string;
  sekolah: string;
}

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuru, setSelectedGuru] = useState({ id: "", name: "", sekolah: "", nip: "" });
  const { fetchAllGuru, guruData, deleteGuru } = useAuth(); // Ambil fetchGuru, guruData, dan deleteGuru dari useAuth
  const router = useRouter();

  // Ambil data guru saat komponen dimuat
  useEffect(() => {
    const getGuruData = async () => {
      try {
        await fetchAllGuru();
      } catch (error) {
        console.error("Gagal mengambil data guru:", error);
      }
    };

    getGuruData();
  }, [fetchAllGuru]);

  // Fungsi untuk membuka modal hapus user
  const handleDeleteUser = (guru: Guru) => {
    setSelectedGuru({ id: guru.id, name: guru.username, sekolah: guru.sekolah, nip: guru.nip });
    setIsModalOpen(true);
  };

  // Filter guru berdasarkan jenjang sekolah (case-sensitive)
  const guruSD = guruData?.filter((guru: Guru) => guru.sekolah.includes("SD"));
  const guruSMP = guruData?.filter((guru: Guru) => guru.sekolah.includes("SMP"));
  const guruSMK = guruData?.filter((guru: Guru) => guru.sekolah.includes("SMK"));


  const handleEditUser = (guru: Guru) => {
    router.push(`/admin/Data_Guru/Edit_user_guru?id=${guru.id}`);
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
          Guru
        </p>
      </div>

      {/* Div untuk Guru SD */}
      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <h2 className="text-xl text-OldRed font-semibold mb-4">SD</h2>
        {guruSD?.map((guru: Guru) => (
          <div
            key={guru.id}
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
                <p className="font-semibold">{guru.username}</p>
                <p className="font-semibold text-sm text-OldRed">{guru.sekolah}</p>
                <p className="text-sm text-gray-500">{guru.nip}</p>
              </div>
            </div>
            <div className="col-span-8 flex justify-end space-x-2">
              <button
                className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                onClick={() => handleEditUser(guru)}
              >
                <Image
                  src="/assets/Admin/Edit_user.png"
                  alt="Edit Icon"
                  width={16}
                  height={16}
                  className="md:mr-2"
                />
                <span className="hidden md:block">Edit User</span>
              </button>
              <button
                className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-red rounded-lg hover:bg-red-600"
                onClick={() => handleDeleteUser(guru)}
              >
                <Image
                  src="/assets/Admin/Delete_user.png"
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

      {/* Div untuk Guru SMP */}
      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <h2 className="text-xl text-OldRed font-semibold mb-4">SMP</h2>
        {guruSMP?.map((guru: Guru) => (
          <div
            key={guru.id}
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
                <p className="font-semibold">{guru.username}</p>
                <p className="font-semibold text-sm text-OldRed">{guru.sekolah}</p>
                <p className="text-sm text-gray-500">{guru.nip}</p>
              </div>
            </div>
            <div className="col-span-8 flex justify-end space-x-2">
              <button
                className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                onClick={() => handleEditUser(guru)}
              >
                <Image
                  src="/assets/Admin/Edit_user.png"
                  alt="Edit Icon"
                  width={16}
                  height={16}
                  className="md:mr-2"
                />
                <span className="hidden md:block">Edit User</span>
              </button>
              <button
                className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-red rounded-lg hover:bg-red-600"
                onClick={() => handleDeleteUser(guru)}
              >
                <Image
                  src="/assets/Admin/Delete_user.png"
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

      {/* Div untuk Guru SMK */}
      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <h2 className="text-xl text-OldRed font-semibold mb-4">SMK</h2>
        {guruSMK?.map((guru: Guru) => (
          <div
            key={guru.id}
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
                <p className="font-semibold">{guru.username}</p>
                <p className="font-semibold text-sm text-OldRed">{guru.sekolah}</p>
                <p className="text-sm text-gray-500">{guru.nip}</p>
              </div>
            </div>
            <div className="col-span-8 flex justify-end space-x-2">
              <button
                className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                onClick={() => handleEditUser(guru)}
              >
                <Image
                  src="/assets/Admin/Edit_user.png"
                  alt="Edit Icon"
                  width={16}
                  height={16}
                  className="md:mr-2"
                />
                <span className="hidden md:block">Edit User</span>
              </button>
              <button
                className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-red rounded-lg hover:bg-red-600"
                onClick={() => handleDeleteUser(guru)}
              >
                <Image
                  src="/assets/Admin/Delete_user.png"
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
          guru={selectedGuru}
        />
      )}
    </div>
  );
}

export default Page;