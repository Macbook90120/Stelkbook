"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ConfirmationModal from "./hapus_user"; // Import the delete modal component
import Navbar from "@/components/Navbar_Admin";
import { useAuth } from "@/context/authContext"; // Import useAuth

interface Guru {
  id: string;
  user_id: string;
  username: string;
  nip: string;
  gender: string;
  sekolah: string;
}

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ id: "", name: "", nip: "" }); // Store user details for modal
  const { fetchGuru, deleteUser, guruData} = useAuth(); // Use fetchSiswa, deleteUser, and siswaData from authContext
  const router = useRouter();

  // Fetch siswa data on component mount
  useEffect(() => {
    const getGuruData = async () => {
      try {
        const data = await fetchGuru();
        console.log("Data siswa dari backend:", data); // Debug data
      } catch (error) {
        console.error("Gagal mengambil data siswa:", error);
      }
    };

    getGuruData();
  }, [fetchGuru]);

  const handleButtonClick = (action: string) => {
    if (action === "User") {
      router.push("/profile_admin");
    } else if (action === "Edit_user") {
      router.push("/admin/Data_Siswa/Edit_user");
    }
  };

  const handleDeleteUser = (user: { id: string; name: string; nip: string }) => {
    setSelectedUser(user);
    setIsModalOpen(true); // Open the delete confirmation modal
  };

  const confirmDeleteUser = async () => {
    try {
      await deleteUser(selectedUser.id); // Call deleteUser with user ID
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Gagal menghapus user:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 overflow-y-auto">
      <header className="flex justify-between items-center mb-4 pt-20 px-8">
        <Navbar />
      </header>

      {/* Database Anda Text */}
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

      {/* User List */}
      <div className="bg-white rounded-lg shadow p-4">
        {guruData?.map((guru:Guru) => (
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
                <p className="text-sm text-gray-500">{guru.nip}</p>
              </div>
            </div>
            <div className="col-span-8 flex justify-end space-x-2">
              <button
                className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                onClick={() => handleButtonClick(`/admin/Data_Guru/Edit_user_guru/${guru.id}`)}
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
                  handleDeleteUser({ id: guru.id, name: guru.username, nip: guru.nip })
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

      {/* Confirmation Modals */}
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