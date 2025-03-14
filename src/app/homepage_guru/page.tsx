"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar_Guru";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useBook } from "@/context/bookContext";
import useAuthMiddleware from "@/hooks/auth";
import { useAuth } from "@/context/authContext";

function Page() {
  useAuthMiddleware();
  const router = useRouter();
   const { user } = useAuth();
  
    useEffect(() => {
      // Check if user is not null before accessing its properties
      if (user) {
        if (user.role === 'Admin') {
          router.push('/admin');
        } else if (user.role === 'Guru') {
          router.push('/homepage_guru');
        } else if (user.role === 'Perpus') {
          router.push('/perpustakaan');
        } else {
          router.push('/homepage');
        }
      }
    }, [user, router]); 

  const handleBookClick = (bookPath: string) => {
    router.push(bookPath);
  };

  const books = [
    {
      title: "Buku Paket Ekonomi",
      subtitle: "Kelas X SMA",
      imgSrc: "/assets/Kelas_XII/Buku_Ekonomi.png",
      path: "/homepage_guru/KelasGuru/Ekonomi_X",
    },
    {
      title: "Pendidikan Pancasila",
      subtitle: "Kelas XI SMA",
      imgSrc: "/assets/Kelas_XI/Buku_Pancasila.png",
      path: "/homepage_guru/KelasGuru/Pancasila_XI",
    },
    {
      title: "Buku Paket Agama",
      subtitle: "Kelas XII SMA",
      imgSrc: "/assets/Kelas_XII/Buku_Agama.png",
      path: "/homepage_guru/KelasGuru/Agama_XII",
    },
    {
      title: "Buku Paket Matematika",
      subtitle: "Kelas X SMA",
      imgSrc: "/assets/Kelas_X/Buku_Matematika.png",
      path: "/homepage_guru/KelasGuru/Matematika_X",
    },
    {
      title: "Buku Paket Bahasa Indonesia",
      subtitle: "Kelas X SMA",
      imgSrc: "/assets/Kelas_X/Buku_Bahasa_Indonesia.png",
      path: "/homepage_guru/KelasGuru/BahasaIndonesia_X",
    },
    {
      title: "Buku Paket Sejarah",
      subtitle: "Kelas X SMA",
      imgSrc: "/assets/Kelas_X/Buku_Sejarah.png",
      path: "/homepage_guru/KelasGuru/Sejarah_X",
    },
    {
      title: "Buku Paket Fisika",
      subtitle: "Kelas X SMA",
      imgSrc: "/assets/Kelas_X/Buku_Fisika.png",
      path: "/homepage_guru/KelasGuru/Fisika_X",
    },
    {
      title: "Buku Paket Kimia",
      subtitle: "Kelas X SMA",
      imgSrc: "/assets/Kelas_X/Buku_Kimia.png",
      path: "/homepage_guru/KelasGuru/Kimia_X",
    },
    {
      title: "Buku Paket Geografi",
      subtitle: "Kelas X SMA",
      imgSrc: "/assets/Kelas_XII/Buku_Geografi.png",
      path: "/homepage_guru/KelasGuru/Geografi_X",
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