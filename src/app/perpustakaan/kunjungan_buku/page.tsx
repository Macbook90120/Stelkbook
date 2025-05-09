'use client';

import KunjunganChart from '@/components/KunjunganChart_Books';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar_Lainnya_Perpus2';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBook } from '@/context/bookContext';

interface RekapKunjunganBook {
  book_id: number;
  judul: string;
  cover: string;
  kategori: string;
  sekolah: string;
  total_kunjungan: number;
  cover_url: string;
}

export default function KunjunganPage() {
  const [jenjang, setJenjang] = useState<'SD' | 'SMP' | 'SMK' | 'NA' | null>(null);
  const [kelas, setKelas] = useState<number | null>(null);
  const router = useRouter();

  const {
    fetchRekapKunjunganBooks,
    rekapKunjunganBooks,
    loading
  }: {
    fetchRekapKunjunganBooks: () => void;
    rekapKunjunganBooks: RekapKunjunganBook[];
    loading: boolean;
  } = useBook();

  useEffect(() => {
    fetchRekapKunjunganBooks();
  }, [fetchRekapKunjunganBooks]);

  const toRoman = (num: number): string => {
    const roman: { [key: number]: string } = {
      1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI',
      7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII',
    };
    return roman[num] || `${num}`;
  };

  const renderKelasButtons = () => {
    if (!jenjang || jenjang === 'NA') return null;

    let range: number[] = [];
    if (jenjang === 'SD') range = [1, 2, 3, 4, 5, 6];
    if (jenjang === 'SMP') range = [7, 8, 9];
    if (jenjang === 'SMK') range = [10, 11, 12];

    return (
      <div className="flex gap-2 mt-2 flex-wrap justify-center">
        {range.map((num) => (
          <button
            key={num}
            onClick={() => setKelas(num)}
            className={`px-4 py-2 rounded-full font-medium transition-all border border-gray-300 shadow-sm ${
              kelas === num ? 'bg-OldRed text-white' : 'bg-white text-gray-700'
            }`}
          >
            Kelas {num}
          </button>
        ))}
      </div>
    );
  };

  // Buku dengan sekolah sesuai jenjang atau kategori 'NA'
  const bukuFilteredByJenjang = jenjang
    ? jenjang === 'NA'
      ? rekapKunjunganBooks.filter(book => book.kategori === 'NA')  // Filter berdasarkan kategori NA
      : rekapKunjunganBooks.filter(book => book.sekolah === jenjang)
    : [];

  const bukuPalingSeringDibaca = bukuFilteredByJenjang[0];

  const filteredChartData = bukuFilteredByJenjang
    .filter(book => {
      if (!kelas) return true;
      return book.kategori === toRoman(kelas);
    })
    .map(book => ({
      name: book.judul,
      total_kunjungan: book.total_kunjungan,
    }));

  return (
    <div className="min-h-screen px-6 mt-6 pt-20 bg-gray-50 p-4">
      <Navbar />

      <button
        onClick={() => router.back()}
        className="mb-4 text-gray-600 hover:text-red transition-colors"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="w-full h-fit bg-white shadow-lg rounded-xl p-4 border border-gray-200">
          {!loading && filteredChartData.length > 0 ? (
            <KunjunganChart data={filteredChartData} />
          ) : (
            <div className="flex items-center justify-center h-64">
              <p>Tidak ada Data</p>
            </div>
          )}

          {/* Jenjang Selector */}
          <div className="flex justify-center mt-6 gap-4 flex-wrap">
            {['SD', 'SMP', 'SMK', 'NA'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setJenjang(item as any);
                  setKelas(null);
                }}
                className={`px-5 py-2 rounded-full font-semibold shadow-sm transition-all duration-200 ${
                  jenjang === item
                    ? 'bg-OldRed text-white scale-105'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {renderKelasButtons()}
        </div>

        {/* Buku Paling Sering Dibaca */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Buku yang paling sering dibaca
          </h2>

          {bukuPalingSeringDibaca ? (
            <>
              <img
                src={`http://localhost:8000${bukuPalingSeringDibaca.cover_url}`}
                alt={bukuPalingSeringDibaca.judul}
                className="w-28 h-40 object-cover rounded mb-4"
              />
              <p className="text-lg font-semibold text-gray-700 mb-2 max-w-xs">
                {bukuPalingSeringDibaca.judul}
              </p>
              <p className="text-red font-bold">
                sebanyak {bukuPalingSeringDibaca.total_kunjungan} pembaca
              </p>
            </>
          ) : (
            <p className="text-gray-500">Belum ada data buku dari jenjang ini</p>
          )}
        </div>
      </div>
    </div>
  );
}
