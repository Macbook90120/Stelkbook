"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const handleBookClick = (bookPath: string) => {
    router.push(bookPath);
  };

  const books = [
    {
      title: "Buku Paket Ekonomi",
      subtitle: "Kelas X SMA",
      imgSrc: "/assets/Kelas_XII/Buku_Ekonomi.png",
      path: "/kelasX/Ekonomi_X",
    },
    {
      title: "Pendidikan Pancasila",
      subtitle: "Kelas XI SMA",
      imgSrc: "/assets/Kelas_XI/Buku_Pancasila.png",
      path: "/homepage_guru/Buku_XI_Guru/Pancasila_XI_Guru",
    },
    {
      title: "Buku Paket Agama",
      subtitle: "Kelas XII SMA",
      imgSrc: "/assets/Kelas_XII/Buku_Agama.png",
      path: "/homepage_guru/Buku_X_Guru/Ekonomi_X_Guru",
    },
    {
      title: "Buku Paket Matematika",
      subtitle: "Kelas X SMA",
      imgSrc: "/assets/Kelas_X/Buku_Matematika.png",
      path: "/homepage_guru/Buku_X_Guru/Matematika_X_Guru",
    },
    {
      title: "Buku Paket Bahasa Indonesia",
      subtitle: "Kelas X SMA",
      imgSrc: "/assets/Kelas_X/Buku_Bahasa_Indonesia.png",
      path: "/homepage_guru/Buku_X_Guru/BahasaIndonesia_X_Guru",
    },
    {
      title: "Buku Paket Sejarah",
      subtitle: "Kelas X SMA",
      imgSrc: "/assets/Kelas_X/Buku_Sejarah.png",
      path: "/homepage_guru/Buku_X_Guru/Sejarah_X_Guru",
    },
    {
      title: "Buku Paket Fisika",
      subtitle: "Kelas X SMA",
      imgSrc: "/assets/Kelas_X/Buku_Fisika.png",
      path: "/homepage_guru/Buku_X_Guru/Fisika_X_Guru",
    },
    {
      title: "Buku Paket Kimia",
      subtitle: "Kelas X SMA",
      imgSrc: "/assets/Kelas_X/Buku_Kimia.png",
      path: "/homepage_guru/Buku_X_Guru/Kimia_X_Guru",
    },
    {
      title: "Buku Paket Geografi",
      subtitle: "Kelas X SMA",
      imgSrc: "/assets/Kelas_XII/Buku_Geografi.png",
      path: "/homepage_guru/Buku_X_Guru/Geografi_X_Guru",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      {/* Navbar */}
      <div className="mb-8">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="pt-20 px-8">
        {/* Studi Anda Section */}
        <div className="mb-8 flex items-center">
          <p className="text-xl font-semibold text-left font-poppins">
            Studi Anda
          </p>
        </div>

        {/* Book List Section */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {books.map((book, index) => (
            <div
              key={index}
              className="text-center cursor-pointer"
              onClick={() => handleBookClick(book.path)}
            >
              <Image
                src={book.imgSrc}
                alt={book.title}
                width={150}
                height={200}
                className="mx-auto rounded-lg shadow-md"
              />
              <p className="mt-2 text-sm font-poppins font-semibold">
                {book.title} <br /> {book.subtitle}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Page;