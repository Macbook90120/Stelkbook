'use client'
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import ConfirmationModal from "./hapus_user";
import Navbar from "@/components/Navbar_Admin_Guru_SMP";

interface Guru {
  id: string;
  username: string;
  nip: string;
  sekolah: string;
  avatar?:string;
}

const SearchGuruSD: React.FC = () => {
  const { guruSmpData, fetchAllGuruSmp } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuru, setSelectedGuru] = useState<Guru | null>(null);
  const [filteredGuru, setFilteredGuru] = useState<Guru[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  useEffect(() => {
    fetchAllGuruSmp(); // Ambil semua data guru SD
  }, [fetchAllGuruSmp]);

  useEffect(() => {
    if (query && guruSmpData?.length > 0) {
      const results = guruSmpData.filter(
        (guru: Guru) =>
          guru.username.toLowerCase().includes(query) ||
          guru.nip.toLowerCase().includes(query) ||
          (guru.sekolah && guru.sekolah.toLowerCase().includes(query))
      );
      setFilteredGuru(results);
    } else {
      setFilteredGuru(guruSmpData || []);
    }
  }, [query, guruSmpData]);

  const handleDeleteGuru = (guru: Guru) => {
    setSelectedGuru(guru);
    setIsModalOpen(true);
  };

  const handleButtonClick = (destination: string) => {
    router.push(`/${destination}`);
  };

  const handleDeleteSuccess = async () => {
    try {
      await fetchAllGuruSmp();
    } catch (error) {
      console.error("Gagal refresh data guru:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 overflow-y-auto">
      <header className="flex justify-between items-center mb-4 pt-20 px-8">
        <Navbar />
      </header>
      <div className="mb-8 flex items-center">
        <p 
          className="text-xl font-semibold text-left font-poppins translate-y-[-15px] hover:underline cursor-pointer"
          onClick={() => handleButtonClick('admin/Sekolah_Guru')}
        >
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
          Guru SMP {query && `- Hasil pencarian: "${query}"`}
        </p>
      </div>

      {/* Tambah Guru Button */}
      <div className="relative mb-4">
        <button
          className="absolute right-0 top-0 w-10 h-10 bg-red text-white text-xl rounded-full flex items-center justify-center shadow translate-y-[-60px]"
          onClick={() => router.push("/admin/Create_User_Guru_SMP")}
          title="Create_User"
        >
          +
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        {filteredGuru?.length > 0 ? (
          filteredGuru.map((guru: Guru) => (
            <div key={guru.id} className="grid grid-cols-12 gap-4 items-center py-4 border-b">
              <div className="col-span-4 flex items-center">
               <Image
                                 src={
                                   guru.avatar
                                     ? `http://localhost:8000/storage/${guru.avatar}`
                                     : "/assets/Class/icon_user.png"
                                 }
                                 alt="User Icon"
                                 width={40}
                                 height={40}
                                 className="w-12 h-12 object-cover rounded-full mr-3"
                               />
                <div>
                  <p className="font-semibold">{guru.username}</p>
                  <p className="font-semibold text-OldRed">{guru.sekolah}</p>
                  <p className="text-sm text-gray-500">{guru.nip}</p>
                </div>
              </div>
              <div className="col-span-8 flex justify-end space-x-2">
                <button
                  className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                  onClick={() => router.push(`/admin/Sekolah_Guru/Data_SMP/Edit_user?id=${guru.id}`)}
                >
                  <Image
                    src="/assets/Admin/Edit_user.png"
                    alt="Edit Icon"
                    width={16}
                    height={16}
                    className="md:mr-2"
                  />
                  <span className="hidden md:block">Edit Guru</span>
                </button>
                <button
                  className="flex flex-col items-center justify-center w-12 h-12 md:w-auto md:h-auto md:flex-row md:px-8 md:py-2 text-white bg-red rounded-lg hover:bg-red"
                  onClick={() => handleDeleteGuru(guru)}
                >
                  <Image
                    src="/assets/Admin/Delete_user.png"
                    alt="Delete Icon"
                    width={16}
                    height={16}
                    className="md:mr-2"
                  />
                  <span className="hidden md:block">Hapus Guru</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">
            {query ? "Tidak ada hasil ditemukan untuk pencarian Anda." : "Tidak ada data guru tersedia."}
          </p>
        )}
      </div>

      {isModalOpen && selectedGuru && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          guru={selectedGuru}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default SearchGuruSD;