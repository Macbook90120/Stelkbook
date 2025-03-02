"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ConfirmationModal from "./hapus_user";
import Navbar from "@/components/Navbar_Admin";
import { useAuth } from "@/context/authContext";

// Definisi tipe Siswa
interface Perpus {
  id: string;
  user_id: string;
  username: string;
  nip: string;
  gender: string;
}

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ id: "", name: "", nip: "" });
  const { fetchPerpus, deleteUser, perpusData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const getPerpusData = async () => {
      try {
        const data = await fetchPerpus();
        console.log("Data siswa dari backend:", data);
      } catch (error) {
        console.error("Gagal mengambil data siswa:", error);
      }
    };

    getPerpusData();
  }, [fetchPerpus]);

  const handleButtonClick = (action: string) => {
    if (action === "User") {
      router.push("/profile_admin");
    } else if (action === "Edit_user") {
      router.push("/admin/Data_Siswa/Edit_user");
    }
  };

  const handleDeleteUser = (user: { id: string; name: string; nip: string }) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    try {
      await deleteUser(selectedUser.id);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Gagal menghapus user:", error);
    }
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

      <div className="bg-white rounded-lg shadow p-4">
        {perpusData?.map((perpus: Perpus) => (
          <div
            key={perpus.id}
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
                <p className="font-semibold">{perpus.username}</p>
                <p className="text-sm text-gray-500">{perpus.nip}</p>
              </div>
            </div>
            <div className="col-span-8 flex justify-end space-x-2">
              <button
                className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                onClick={() => handleButtonClick("Edit_user")}
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
                onClick={() =>
                  handleDeleteUser({ id: perpus.id, name: perpus.username, nip: perpus.nip })
                }
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

      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDeleteUser}
          user={selectedUser}
        />
      )}
    </div>
  );
}

export default Page;