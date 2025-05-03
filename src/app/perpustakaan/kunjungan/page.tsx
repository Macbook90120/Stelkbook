'use client';

import KunjunganChart from '@/components/KunjunganChart';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar_Lainnya_Perpus2';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';

const dataHari = [
  { name: 'Hari -6', pengunjung: 1 },
  { name: 'Hari -5', pengunjung: 3 },
  { name: 'Hari -4', pengunjung: 7 },
  { name: 'Hari -3', pengunjung: 4 },
  { name: 'Hari -2', pengunjung: 5 },
  { name: 'Hari -1', pengunjung: 2 },
  { name: 'Hari ini', pengunjung: 3 },
];

const dataBulan = [
  { name: 'Okt', pengunjung: 30 },
  { name: 'Nov', pengunjung: 42 },
  { name: 'Des', pengunjung: 35 },
  { name: 'Jan', pengunjung: 38 },
  { name: 'Feb', pengunjung: 25 },
  { name: 'Mar', pengunjung: 40 },
  { name: 'Apr', pengunjung: 50 },
];

const dataTahun = [
  { name: '2024', pengunjung: 130 },
  { name: '2025', pengunjung: 120 },
  { name: '2026', pengunjung: 150 },
  { name: '2027', pengunjung: 180 },
];

export default function KunjunganPage() {
  const [mode, setMode] = useState<'hari' | 'bulan' | 'tahun'>('hari');
  const router = useRouter();

  const getData = () => {
    switch (mode) {
      case 'bulan':
        return dataBulan;
      case 'tahun':
        return dataTahun;
      default:
        return dataHari;
    }
  };

  return (
    <div className="min-h-screen px-6 mt-6 pt-20 bg-gray-50 p-4">
  <Navbar />

  <button onClick={() => router.back()} className="mb-4 text-gray-600 hover:text-red-600 transition-colors">
    <ArrowLeft size={24} />
  </button>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Chart */}
    <div className="w-full h-64 bg-white shadow-lg rounded-xl p-4 border border-gray-200">
  <KunjunganChart data={getData()} />

      {/* Tombol Ganti Mode */}
      <div className="flex justify-center mt-6 gap-4">
        {['hari', 'bulan', 'tahun'].map((item) => (
          <button
            key={item}
            onClick={() => setMode(item as 'hari' | 'bulan' | 'tahun')}
            className={`px-5 py-2 rounded-full font-semibold shadow-sm transition-all duration-200 ${
              mode === item
                ? 'bg-red-600 text-white scale-105'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
    </div>

    <div className="w-full flex flex-col gap-6">
      {/* Box 1 - Kunjungan Hari Ini */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Kunjungan Hari ini: <span className="text-red-600 font-semibold">1 pengunjung</span>
        </h2>

        <div className="space-y-3">
          {[
            { name: 'Mac Renfred Matarru Mapandin', nis: '544231094' },
            { name: 'Nama User', nis: 'NIS User' },
            { name: 'Nama User', nis: 'NIS User' },
          ].map((user, i) => (
            <div key={i} className="flex items-center justify-between border-b pb-3 border-gray-200">
              <div className="flex items-center gap-3">
                <FaUserCircle size={32} className="text-red-500" />
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.nis}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Box 2 - Ringkasan Kunjungan */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <div className="space-y-2">
          <p className="font-medium text-gray-700">
            Kunjungan 7 Hari Lalu: <span className="text-red-600 font-semibold">3 pengunjung</span>
          </p>
          <p className="font-medium text-gray-700">
            Kunjungan 1 Bulan Lalu: <span className="text-red-600 font-semibold">10 pengunjung</span>
          </p>
          <p className="font-medium text-gray-700">
            Kunjungan 1 Tahun Lalu: <span className="text-red-600 font-semibold">27 pengunjung</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
