"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar_Guru";
import { useBook } from "@/context/bookContext";

interface Book {
  id: number;
  judul: string;
  cover: string;
  subject?: string;
  penulis?: string;
  kategori?: string;
  path?: string;
}

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  
  // Hanya menggunakan fetchBooks dari context
  const { books, loading, error, fetchBooks } = useBook();

  const navigateToBook = (id: number) => {
    router.push(`search_guru/books?id=${id}`);
  };

  useEffect(() => {
    fetchBooks(); // Memuat data buku saat komponen mount
  }, [fetchBooks]);

  useEffect(() => {
    if (query && books.length > 0) {
      // Proses data buku untuk menambahkan URL cover dan path
      const processedBooks = books.map((book: any) => {
        const coverUrl = book.cover 
          ? `http://localhost:8000/storage/${book.cover}` 
          : '/assets/default-cover.png';
        
        return {
          id: book.id,
          judul: book.judul,
          cover: coverUrl,
          subject: book.subject || "",
          penulis: book.penulis || "Unknown Author",
          kategori: book.kategori || "",
          path: `search/books?id=${book.id}`
        };
      });

      // Filter buku berdasarkan query
      const results = processedBooks.filter(
        (book:any) =>
          book.judul.toLowerCase().includes(query) ||
          (book.kategori && book.kategori.toLowerCase().includes(query)) ||
          (book.subject && book.subject.toLowerCase().includes(query)) ||
          (book.penulis && book.penulis.toLowerCase().includes(query))
      );
      
      setFilteredBooks(results);
    } else {
      setFilteredBooks([]);
    }
  }, [query, books]);

  <div className="flex flex-col items-center gap-3">
  <div className="w-10 h-10 border-4 border-red border-t-transparent rounded-full animate-spin"></div>
  <p className="text-gray-600">Memuat buku...</p>
</div>
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;

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
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => navigateToBook(book.id)}
              className="bg-white hover:bg-gray-100 hover:scale-105 transition-transform duration-200 rounded-lg p-4 cursor-pointer flex flex-col items-center"
            >
              <div className="w-[150px] h-[200px] relative">
                <Image
                  src={book.cover}
                  alt={book.judul}
                  width={150}
                  height={200}
                  className="rounded-md object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/default-cover.png';
                  }}
                />
              </div>
              <h3 className="mt-4 text-center text-sm font-semibold text-gray-800">
                {book.judul}
              </h3>
              {book.penulis && <p className="text-xs text-gray-500">{book.penulis}</p>}
              {book.kategori && (
                <p className="text-xs text-gray-500 font-medium">
                  {book.kategori}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">
            {query ? "Tidak ada hasil ditemukan." : "Masukkan kata kunci pencarian."}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;