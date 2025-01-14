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

  const handleKelasXIClick = () => {
    router.push("/kelasXI"); // Navigate to kelasXII
  };

  const handleButtonClick = (button: string) => {
    if (button === "User") {
      router.push("/profile"); // Navigate to profile page
    }
  };

  // Chapter data
  const chapters = [
    "Menjiwai Pancasila",
    "Demokrasi Berdasarkan UUD NRI Tahun 1945",
    "Harmoni dalam Keberagaman",
    "Menjaga Keutuhan NKRI",
  ];

  // Direct route handler
  const handleBabClick = (chapterName: string) => {
    router.push(`/Buku_XI/Pancasila_XI/${chapterName}_Pancasila_XI`); // Navigate to chapter
  };

  return (
<<<<<<< HEAD
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

        {/* Text Title */}
        <div className="mb-8 flex items-center">
          <p className="text-xl font-semibold font-poppins cursor-pointer" onClick={handleStelkbookClick}>
            Studi Anda
          </p>
          <div className="mx-2">
            <Image src="/assets/Kelas_X/Primary_Direct.png" alt="Breadcrumb Divider" width={10} height={16} />
          </div>
          <p className="text-xl font-semibold font-poppins cursor-pointer" onClick={handleKelasXIClick}>
            Kelas XI
          </p>
          <div className="mx-2">
            <Image src="/assets/Kelas_X/Primary_Direct.png" alt="Breadcrumb Divider" width={10} height={16} />
          </div>
          <p className="text-xl font-semibold font-poppins">Pendidikan Pancasila</p>
        </div>

        {/* Book Details Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Book Cover and Metadata */}
          <div className="flex flex-col items-center lg:items-start">
            {/* Book Cover */}
            <div className="mb-6">
              <Image
                src="/assets/Kelas_XI/Buku_Pancasila.png"
                alt="Ekonomi SMA Kelas XII"
                width={200}
                height={280}
                className="rounded-lg shadow-md"
              />
            </div>

            {/* Book Metadata */}
            <div className="text-center lg:text-left">
              <h2 className="text-lg font-bold">
                Pendidikan Pancasila <br /> SMA/MA/SMK/MAK Kelas XI
              </h2>
              <ul className="mt-2 text-sm space-y-1">
                <li className="whitespace-nowrap">
                  <strong>Penerbit:</strong> Pusat Perbukuan
                </li>
                <li className="whitespace-nowrap">
                  <strong>Penulis:</strong> Sri Cahyati
                </li>
                <li className="whitespace-nowrap">
                  <strong>Tahun:</strong> 2023
                </li>
                <li className="whitespace-nowrap">
                  <strong>ISBN:</strong> 9786231946232
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
=======
    <div>
      <h1>Buku Pancasila Kelas XII</h1>
      <p>This is the content for Buku Pancasila Kelas XII. Laso</p>
Makna dan Hakikat Ideologi

1. Pengertian Ideologi

Ideologi berasal dari kata idea yang berarti 'gagasan, konsep, pengertian dasar, cita-cita'; sementara logos berarti 'ilmu. Secara harfiah, ideologi berarti 'ilmu pengetahuan mengenai ide-ide atau gagasan. Terdapat beberapa pengertian mengenai ideologi oleh para ahli, antara lain sebagai berikut.

a. Padmo Wahjono (1991) menyatakan bahwa ideologi adalah kesatuan yang bulat dan utuh dari ide-ide dasar.

b. Menurut W. White, ideologi merupakan asas pendapat, pandangan, atau keyakinan yang dipakai atau dicita-citakan oleh perorangan atau golongan dalam masyarakat atau oleh suatu bangsa (Ishaq, 2021).

c. A. S. Hornby mengatakan bahwa ideologi adalah seperangkat gagasan yang membentuk landasan teori ekonomi dan politik atau yang dipegangi oleh seorang atau sekelompok orang (Herdiawanto, dkk., 2019).

d. Manfred B. Steger (2003) mendefinisikan ideologi sebagai sistem ide-ide yang dimiliki bersama secara luas, keyakinan yang berpola, norma-norma dan nilai-nilai yang menjadi pedoman, dan cita-cita yang diterima sebagai kebenaran oleh sekelompok orang tertentu.

e. Menurut Mubyarto, ideologi adalah sejumlah doktrin, kepercayaan, dan simbol-simbol kelompok masyarakat atau suatu bangsa yang menjadi pegangan dan pedoman kerja atau perjuangan untuk mencapai tujuan masyarakat bangsa (Ishaq. 2021).

1. David Miller (Kusumohamidjojo, 2015) menyebut ideologi sebagai seperangkat keyakinan alam sosial dan politik yang secara bersamaan memberi makna kepada sesuatu yang berlangsung dalam masyarakat dan membimbing respons praktis masyarakat terhadapnya.

Berdasarkan berbagai definisi tersebut, terdapat beberapa unsur yang memberi batasan tentang ideologi, yaitu sebagai berikut (Herdiawanto, dkk., 2019).

a. Sekumpulan ide atau gagasan.

b. Tersusun secara sistematis.

c. Bersumber dari pikiran manusia.

d. Mempunyai tujuan dan arah yang jelas,

e. Pedoman tentang cara hidup.

F. Dianut oleh masyarakat 
    </div>


  )
>>>>>>> b47563c16c10e31acb94e1d49df847c879679dd7
}

export default Page;