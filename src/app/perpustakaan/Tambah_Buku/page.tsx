'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import NotificationSuccessful from './NotificationSuccessful';
import Navbar from '@/components/Navbar_Perpus';

function Page() {
    const [showNotification, setShowNotification] = useState(false);
    const [pdfName, setPdfName] = useState<string | null>(null);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [penulis, setPenulis] = useState('');
    const [Tahun, setTahun] = useState('');
    const [isbn, setIsbn] = useState('');
    const [selectedKelas, setSelectedKelas] = useState('');
    const [selectedSekolah, setSelectedSekolah] = useState('');
    const [kelasOptions, setKelasOptions] = useState<string[]>([]);

    useEffect(() => {
        if (selectedSekolah === 'SD') {
            setKelasOptions(['I', 'II', 'III', 'IV', 'V', 'VI']);
        } else if (selectedSekolah === 'SMP') {
            setKelasOptions(['VII', 'VIII', 'IX']);
        } else if (selectedSekolah === 'SMK') {
            setKelasOptions(['X', 'XI', 'XII']);
        } else {
            setKelasOptions([]);
        }
    }, [selectedSekolah]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setShowNotification(true);
    };

    const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]?.type === 'application/pdf') {
            setPdfName(event.target.files[0].name);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            setCoverImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'auto';
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8 overflow-y-auto">
            <Navbar />
            <div className="mb-6 flex items-center text-gray-700 pt-20 px-8">
                <p className="text-xl font-semibold font-poppins">Perpus Anda</p>
                <div className="mx-2">
                    <Image
                        src="/assets/Kelas_X/Primary_Direct.png"
                        alt=">"
                        width={10}
                        height={16}
                    />
                </div>
                <p className="text-xl font-semibold font-poppins">Menambahkan Buku</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap gap-8">
                        <div className="flex-grow">
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Judul</label>
                                <input
                                    type="text"
                                    placeholder="(Isi Judul)"
                                    className="w-full border border-gray-300 bg-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Deskripsi</label>
                                <input
                                    type="text"
                                    placeholder="(Isi Judul)"
                                    className="w-full border border-gray-300 bg-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Sekolah</label>
                                <div className="flex space-x-4">
                                    {['SD', 'SMP', 'SMK'].map((Sekolah) => (
                                        <button
                                            key={Sekolah}
                                            type="button"
                                            onClick={() => setSelectedSekolah(Sekolah)}
                                            className={`py-2 px-4 text-sm font-semibold border rounded-lg transition ${
                                                selectedSekolah === Sekolah ? 'bg-red text-white border-red-500' : 'bg-white text-gray-700 border-gray-300'
                                            } focus:outline-none cursor-pointer`}
                                        >
                                            {Sekolah}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Kelas</label>
                                <div className="flex space-x-4">
                                    {kelasOptions.map((kelas) => (
                                        <button
                                            key={kelas}
                                            type="button"
                                            onClick={() => setSelectedKelas(kelas)}
                                            className={`py-2 px-4 text-sm font-semibold border rounded-lg transition ${
                                                selectedKelas === kelas ? 'bg-red text-white border-red-500' : 'bg-white text-gray-700 border-gray-300'
                                            } focus:outline-none cursor-pointer`}
                                        >
                                            {kelas}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Penerbit</label>
                                <input
                                    type="text"
                                    placeholder="(Isi Penerbit)"
                                    className="w-full border border-gray-300 bg-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Penulis</label>
                                <input
                                    type="text"
                                    value={penulis}
                                    onChange={(e) => setPenulis(e.target.value)}
                                    placeholder="(Isi Penulis)"
                                    className="w-full border border-gray-300 bg-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Tahun</label>
                                <input
                                    type="text"
                                    value={Tahun}
                                    onChange={(e) => setTahun(e.target.value)}
                                    placeholder="(Isi Tahun)"
                                    className="w-full border border-gray-300 bg-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">ISBN</label>
                                <input
                                    type="text"
                                    value={isbn}
                                    onChange={(e) => setIsbn(e.target.value)}
                                    placeholder="(Isi ISBN)"
                                    className="w-full border border-gray-300 bg-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="w-1/3 space-y-4">
                            <div className="relative">
                                <label className="block text-gray-700 font-medium mb-2">Cover Buku</label>
                                <div className="border border-gray-300 rounded-lg p-6 bg-gray-50 relative">
                                    {coverImage ? (
                                        <img src={coverImage} alt="Book Cover" className="w-full h-full object-cover rounded-lg" />
                                    ) : (
                                        <p className="text-gray-500">Upload dalam format .jpg/.png</p>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCoverUpload}
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-gray-700 font-medium mb-2">Isi Buku</label>
                                <div className="border border-gray-300 rounded-lg flex items-center justify-center p-6 bg-gray-50 cursor-pointer">
                                    <Image
                                        src="/assets/Perpustakaan/Format_file.png"
                                        alt="Book Content"
                                        width={48}
                                        height={45}
                                    />
                                    {!pdfName && <p className="text-gray-500 ml-4">Upload dalam format .pdf</p>}
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handlePdfUpload}
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {pdfName && <p className="mt-2 text-gray-700">{pdfName}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            className="w-32 bg-red text-white rounded-lg py-2 px-4 font-semibold text-sm hover:bg-red-600 shadow-md focus:outline-none focus:ring-2 focus:ring-red-300"
                        >
                            Selesai
                        </button>
                    </div>
                </form>
            </div>

            <NotificationSuccessful show={showNotification} />
        </div>
    );
}

export default Page;