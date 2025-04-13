"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const books = [
  {
    title: "Buku paket Ekonomi",
    subject: "ekonomi",
    imageSrc: "/assets/Kelas_X/Buku_Ekonomi.png",
    altText: "Ekonomi SMA",
    author: "Sri Mulyani",
    grade: "10",
  },
  {
    title: "Buku paket Matematika",
    subject: "matematika",
    imageSrc: "/assets/Kelas_X/Buku_Matematika.png",
    altText: "Matematika SMA",
    author: "Budi Santoso",
    grade: "10",
  },
  {
    title: "Bahasa Indonesia Kelas X",
    subject: "bahasa indonesia",
    imageSrc: "/assets/Kelas_X/Buku_Bahasa_Indonesia.png",
    altText: "Bahasa Indonesia SMA",
    author: "Tri Retno Muniarsih",
    grade: "10",
  },
  {
    title: "Sejarah Indonesia",
    subject: "sejarah",
    imageSrc: "/assets/Kelas_X/Buku_Sejarah.png",
    altText: "Sejarah SMA",
    author: "Eka Prasetya",
    grade: "10",
  },
  {
    title: "Fisika Dasar",
    subject: "fisika",
    imageSrc: "/assets/Kelas_X/Buku_Fisika.png",
    altText: "Fisika SMA",
    author: "Andi Wijaya",
    grade: "10",
  },
  {
    title: "Kimia SMA",
    subject: "kimia",
    imageSrc: "/assets/Kelas_X/Buku_Kimia.png",
    altText: "Kimia SMA",
    author: "Fitri Ramadhani",
    grade: "10",
  },
  {
    title: "Geografi Nusantara",
    subject: "geografi",
    imageSrc: "/assets/Kelas_X/Buku_Geografi.png",
    altText: "Geografi SMA",
    author: "Dewi Kartika",
    grade: "10",
  },
];

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const [filteredBooks, setFilteredBooks] = useState<typeof books>([]);

  const navigateToBook = (subject: string) => {
    router.push(`books/${subject}`);
  };  

  useEffect(() => {
    if (query) {
      const results = books.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.grade.toLowerCase().includes(query) ||
          book.subject.toLowerCase().includes(query)
      );
      setFilteredBooks(results);
    } else {
      setFilteredBooks([]);
    }
  }, [query]);

  return (
    <div className="pt-28 px-6 md:px-16 lg:px-32 min-h-screen bg-white">
      <Navbar />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Kami memiliki {filteredBooks.length} buku untukmu
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Menampilkan buku untuk:{" "}
          <span className="text-blue-600 font-medium">"{query}"</span>
        </p>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book, index) => (
            <div
              key={index}
              onClick={() => navigateToBook(book.subject)}
              className="bg-white hover:bg-gray-100 hover:scale-105 transition-transform duration-200 rounded-lg p-4 cursor-pointer flex flex-col items-center"
            >
              <Image
                src={book.imageSrc}
                alt={book.altText}
                width={150}
                height={200}
                className="rounded-md"
              />
              <h3 className="mt-4 text-center text-sm font-semibold text-gray-800">
                {book.title}
              </h3>
              <p className="text-xs text-gray-500">{book.author}</p>
              <p className="text-xs text-gray-500 font-medium">
                Kelas: {book.grade}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">Tidak ada hasil ditemukan.</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;