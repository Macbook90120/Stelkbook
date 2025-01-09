"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  // Handlers
  const handleStelkbookClick = () => {
    router.push("/homepage"); // Navigate to homepage
  };

  const handleKelasXIIClick = () => {
    router.push("/kelasXII"); // Navigate to kelasXII
  };

  const handleButtonClick = (button: string) => {
    if (button === "User") {
      router.push("/profile"); // Navigate to profile page
    }
  };

  // Chapter data
  const chapters = [
    "Menghayati dan Mengamalkan 7 Asmaul Husna",
    "Amal Saleh, Toleransi, Musawah, dan Ukhuwah",
    "Nifak dan Keras Hati (Pemarah)",
    "Adab Bergaul",
    "Imam Al-Ghazali dan Ibnu Sina",
    "Kompetisi dalam Kebaikan, Optimis, Dinamis, Inovatif, dan Kreatif",
    "Fitnah Namimah, dan Gibah",
    "Membaca Al-Qur’an dan Berdoa",
    "Ibnu Rusyd dan Muhammad Iqbal",
  ];

  // Direct route handler
  const handleBabClick = (chapterName: string) => {
    router.push(`/Buku_XII/Agama_XII/${chapterName}_Agama_XII`); // Navigate to chapter
  };

  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <div className="h-screen p-8 bg-gray-50 overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          {/* Stelkbook Logo */}
          <div onClick={handleStelkbookClick} className="flex-shrink-0 cursor-pointer">
            <Image
              src="/assets/Class/Stelk_bookTitle.png"
              alt="Stelkbook"
              width={165}
              height={100}
            />
          </div>

          {/* Search Bar */}
          <div className="relative flex-grow max-w-md mx-4">
            <input
              type="text"
              placeholder="Pencarian disini"
              className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Image
                src="/assets/Class/Search_icon.png"
                alt="Search Icon"
                width={20}
                height={20}
              />
            </div>
          </div>

          {/* User Icon */}
          <div onClick={() => handleButtonClick("User")} className="flex-shrink-0 cursor-pointer">
            <Image
              src="/assets/Class/icon_user.png"
              alt="User Icon"
              width={45}
              height={40}
              className="rounded-full"
            />
          </div>
        </header>

        {/* Header Divider */}
        <div className="mb-8">
          <Image src="/assets/Class/Lines.png" alt="Header Divider" width={3000} height={100} />
        </div>

        {/* Text title Navigation */}
        <div className="mb-8 flex items-center cursor-pointer">
          <p
            className="text-xl font-semibold font-poppins cursor-pointer"onClick={handleStelkbookClick}
          >
            Studi Anda
          </p>
          <div className="mx-2">
            <Image src="/assets/Kelas_X/Primary_Direct.png" alt="Breadcrumb Divider" width={10} height={16} />
          </div>
          <p
            onClick={handleKelasXIIClick}
            className="text-xl font-semibold font-poppins cursor-pointer"
          >
            Kelas XII
          </p>
          <div className="mx-2">
            <Image src="/assets/Kelas_X/Primary_Direct.png" alt="Breadcrumb Divider" width={10} height={16} />
          </div>
          <p className="text-xl font-semibold font-poppins">Buku Paket Akidah</p>
        </div>

        {/* Book Details Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Book Cover and Metadata */}
          <div className="flex flex-col items-center lg:items-start">
            {/* Book Cover */}
            <div className="mb-6">
              <Image
                src="/assets/Kelas_XII/Buku_Agama.png"
                alt="Ekonomi SMA Kelas XII"
                width={200}
                height={280}
                className="rounded-lg shadow-md"
              />
            </div>

            {/* Book Metadata */}
            <div className="text-center lg:text-left">
              <h2 className="text-lg font-bold">
                Buku Paket <br /> Akidah Akhlak <br /> Kelas XII SMA
              </h2>
              <ul className="mt-2 text-sm space-y-1">
                <li className="whitespace-nowrap">
                  <strong>Penerbit:</strong> Yudistira
                </li>
                <li className="whitespace-nowrap">
                  <strong>Penulis:</strong> Drs. Margiono, M.Pd
                </li>
                <li className="whitespace-nowrap">
                  <strong>Tahun:</strong> 2018
                </li>
                <li className="whitespace-nowrap">
                  <strong>ISBN:</strong> 9786022993858
                </li>
              </ul>
            </div>
          </div>

          {/* Bab List */}
          <div
            className="bg-white shadow-md rounded-lg overflow-hidden w-full"
            style={{ transform: "scale(0.9)", transformOrigin: "top center" }}
          >
            {chapters.map((chapter, index) => (
              <div
                key={index}
                onClick={() => handleBabClick(`Bab_${index + 1}`)} // Navigate to each chapter
                className="flex items-center gap-4 px-6 py-4 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center justify-center bg-transparent rounded-md p-2">
                  <Image
                    src="/assets/Kelas_details/Book.png"
                    alt={`Bab ${index + 1} Icon`}
                    width={14}
                    height={30}
                  />
                </div>
                <p className="text-sm font-medium text-gray-800 font-poppins">{`Bab ${index + 1}: ${chapter}`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;