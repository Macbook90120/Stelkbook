'use client';

import KunjunganChart from '@/components/KunjunganChart';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar_Lainnya_Perpus2';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '@/context/authContext';

interface KunjunganUser {
  username: string;
  kode?: string;
  tanggal?: string;
}

export default function KunjunganPage() {
  const [mode, setMode] = useState<'hari' | 'bulan' | 'tahun'>('hari');
  const router = useRouter();
  const { 
    rekapKunjunganData, 
    fetchRekapKunjungan,
    kunjunganData,
    fetchKunjungan
  } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchRekapKunjungan();
        await fetchKunjungan();
      } catch (error) {
        console.error("Gagal memuat data:", error);
      }
    };
    loadData();
  }, [fetchRekapKunjungan, fetchKunjungan]);

  // Fungsi untuk mengubah bulan menjadi nama bulan dalam bahasa Indonesia
  const getMonthName = (month: string) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return months[parseInt(month) - 1] || month;
  };

  const getData = () => {
    if (!rekapKunjunganData) return [];
    
    switch (mode) {
      case 'bulan':
        // Hanya transform data bulan ke bahasa Indonesia
        return (rekapKunjunganData.bulan || []).map((item: any) => ({
          ...item,
          name: getMonthName(item.bulan),
        }));
      case 'tahun':
        return rekapKunjunganData.tahun || [];
      default:
        return rekapKunjunganData.hari || [];
    }
  };

  // Hitung total pengunjung dengan pengecekan ketat
  const total7Hari = rekapKunjunganData?.hari?.reduce(
    (sum: number, item: { pengunjung: number }) => sum + (item.pengunjung || 0),
    0
  ) || 0;

  const totalBulan = rekapKunjunganData?.bulan?.reduce(
    (sum: number, item: { pengunjung: number }) => sum + (item.pengunjung || 0),
    0
  ) || 0;

  const totalTahun = rekapKunjunganData?.tahun?.reduce(
    (sum: number, item: { pengunjung: number }) => sum + (item.pengunjung || 0),
    0
  ) || 0;

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
  {rekapKunjunganData ? (
    <KunjunganChart data={getData()} />
  ) : (
    <div className="flex items-center justify-center h-64">
      <p>Memuat data chart...</p>
    </div>
  )}

  {/* Mode Selector Buttons - DIPINDAH KE SINI */}
  <div className="flex justify-center mt-6 gap-4 flex-wrap">
    {['hari', 'bulan', 'tahun'].map((item) => (
      <button
        key={item}
        onClick={() => setMode(item as 'hari' | 'bulan' | 'tahun')}
        className={`px-5 py-2 rounded-full font-semibold shadow-sm transition-all duration-200 ${
          mode === item
            ? 'bg-OldRed text-white scale-105'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        {item === 'hari' ? 'Hari' : 
         item === 'bulan' ? 'Bulan' : 
         'Tahun'}
      </button>
    ))}
  </div>
</div>

        <div className="w-full flex flex-col gap-6">
          {/* Today's Visitors Box */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Kunjungan Hari ini: <span className="text-red font-semibold">
                {kunjunganData?.length || 0} pengunjung
              </span>
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {kunjunganData && kunjunganData.length > 0 ? (
                kunjunganData.map((user: KunjunganUser, index: number) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 border-gray-200">
                    <div className="flex items-center gap-3">
                      <FaUserCircle size={32} className="text-red" />
                      <div>
                        <p className="font-medium text-gray-800">{user.username}</p>
                        <p className="text-sm text-gray-500">{user.kode || 'N/A'}</p>
                      </div>
                    </div>
                    {user.tanggal && (
                      <span className="text-xs text-gray-400">
                        {new Date(user.tanggal).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Belum ada kunjungan hari ini</p>
              )}
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Ringkasan Kunjungan</h3>
            <div className="space-y-2">
              <p className="font-medium text-gray-700">
                Kunjungan 7 Hari Terakhir: <span className="text-OldRed font-semibold">{total7Hari} pengunjung</span>
              </p>
              <p className="font-medium text-gray-700">
                Kunjungan Bulan Ini: <span className="text-OldRed font-semibold">{totalBulan} pengunjung</span>
              </p>
              <p className="font-medium text-gray-700">
                Kunjungan Tahun Ini: <span className="text-OldRed font-semibold">{totalTahun} pengunjung</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}