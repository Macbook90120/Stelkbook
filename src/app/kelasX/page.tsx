  'use client';
  import React from 'react';
  import Image from 'next/image';
  import { useRouter } from 'next/navigation';

  function Page() {
    const router = useRouter();

    const handleButtonClick = (button: string) => {
      if (button === 'User') {
        router.push('/profile'); // Navigate to profile page
      }
    };

    const handleStelkbookClick = () => {
      router.push('/homepage'); // Navigate to homepage
    };

    const handleKimiaClick = (bookName: string) => {
      router.push(`/Buku_X/${bookName}_X`); // Navigasi ke buku Kimia
    };

    const handleSejarahClick = (bookName: string) => {
      router.push(`/Buku_X/${bookName}_X`); // Navigasi ke buku Sejarah
    };

    const handleFisikaClick = (bookName: string) => {
      router.push(`/Buku_X/${bookName}_X`); // Navigasi ke buku Fisika
    };

    const handleGeografiClick = (bookName: string) => {
      router.push(`/Buku_X/${bookName}_X`); // Navigasi ke buku geografi
    };

    const handleEkonomiClick = (bookName: string) => {
      router.push(`/Buku_X/${bookName}_X`); // Navigasi ke buku Ekonomi
    };

    const handleMatematikaClick = (bookName: string) => {
      router.push(`/Buku_X/${bookName}_X`); // Navigasi ke buku Matematika
    };

    const handleBahasaIndonesiaClick = (bookName: string) => {
      router.push(`/Buku_X/${bookName}_X`); // Navigasi ke buku Bahasa Indonesia
    };

    return (
      <div className="min-h-screen p-8 bg-gray-50 overflow-y-auto">
        <header className="flex justify-between items-center mb-4">
          {/* Stelkbook Title */}
          <div className="flex-shrink-0 cursor-pointer" onClick={handleStelkbookClick}>
            <Image
              src="/assets/Class/Stelk_bookTitle.png"
              alt="Stelkbook"
              width={165}
              height={100}
            />
          </div>

          {/* Search Bar */}
          <div className="mx-4 flex-grow max-w-md relative">
            <input
              type="text"
              placeholder="Pencarian disini"
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Icon-Image */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Image
                src="/assets/Class/Search_icon.png"
                alt="Search Icon"
                width={20}
                height={20}
              />
            </div>
          </div>

          {/* Icon user */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleButtonClick('User')}>
            <Image
              src="/assets/Class/icon_user.png"
              alt="Icon-User"
              width={45}
              height={40}
              className="rounded-full translate-y-[-0px] translate-x-[-20px]"
            />
          </div>
        </header>

        {/* Header Line */}
        <div className="mb-8">
          <Image
            src="/assets/Class/Lines.png"
            alt="Header Line"
            width={3000}
            height={100}
          />
        </div>

        {/* Studi Anda Text */}
        <div className="mb-8 flex items-center">
          <p className="text-xl font-semibold text-left font-poppins translate-y-[-15px]">
            Studi Anda
          </p>
          <div className="mx-2">
            <Image
              src="/assets/Kelas_X/Primary_Direct.png"
              alt="Divider Icon"
              width={10} // SIZE UKURAN
              height={16}
              className="translate-y-[-15px] translate-x-[1px]"
            />
          </div>
          <p className="text-xl font-semibold text-left font-poppins translate-y-[-15px]">
            Kelas X
          </p>
        </div>


        {/* Buku Display Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
          <div className="text-center cursor-pointer" onClick={() => handleEkonomiClick('Ekonomi')}>
            <Image
              src="/assets/Kelas_X/Buku_Ekonomi.png"
              alt="Ekonomi SMA Kelas X"
              width={150}
              height={200}
              className="mx-auto translate-x-[140px]"
            />
            <p className="mt-2 text-sm font-poppins font-semibold translate-x-[140px] translate-y-[10px]">
              Buku paket Ekonomi  <br /> Kelas X
            </p>
          </div>
          <div className="text-center cursor-pointer" onClick={() => handleMatematikaClick('Matematika')}>
            <Image
              src="/assets/Kelas_X/Buku_Matematika.png"
              alt="Matematika SMA Kelas X"
              width={150}
              height={200}
              className="mx-auto translate-x-[28px]"
            />
            <p className="mt-2 text-sm font-poppins font-semibold translate-x-[28px] translate-y-[10px]">
              Buku paket Matematika Untuk  <br /> Kelas X
            </p>
          </div>
          <div className="text-center cursor-pointer" onClick={() => handleBahasaIndonesiaClick('BahasaIndonesia')}>
            <Image
              src="/assets/Kelas_X/Buku_Bahasa_Indonesia.png"
              alt="Bahasa Indonesia SMA Kelas X"
              width={150}
              height={200}
              className="mx-auto translate-x-[-80px]"
            />
            <p className="mt-2 text-sm font-poppins font-semibold translate-x-[-80px] translate-y-[10px]">
              Buku paket Bahasa Indonesia  <br /> Kelas X
            </p>
          </div>
        </div>

        {/* Tambahan Buku Display Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center mt-8">
          <div className="text-center cursor-pointer" onClick={() => handleSejarahClick('Sejarah')}>
            <Image
              src="/assets/Kelas_X/Buku_Sejarah.png"
              alt="Sosiologi SMA Kelas X"
              width={150}
              height={200}
              className="mx-auto translate-x-[140px]"
            />
            <p className="mt-2 text-sm translate-x-[140px] translate-y-[10px] font-poppins font-semibold">
              Buku paket Sejarah  <br /> Kelas X
            </p>
          </div>
          <div className="text-center cursor-pointer" onClick={() => handleFisikaClick('Fisika')}>
            <Image
              src="/assets/Kelas_X/Buku_Fisika.png"
              alt="Biologi SMA Kelas X"
              width={150}
              height={200}
              className="mx-auto translate-x-[28px]"
            />
            <p className="mt-2 text-sm translate-x-[28px] translate-y-[10px] font-poppins font-semibold">
              Buku paket Fisika  <br /> Kelas X
            </p>
          </div>
          <div className="text-center cursor-pointer" onClick={() => handleKimiaClick('Kimia')}>
            <Image
              src="/assets/Kelas_X/Buku_Kimia.png"
              alt="Pendidikan Agama SMA Kelas X"
              width={165}
              height={200}
              className="mx-auto translate-x-[-80px]"
            />
            <p className="mt-2 text-sm translate-x-[-80px] translate-y-[10px] font-poppins font-semibold">
              Buku paket Kimia  <br /> Kelas X
            </p>
          </div>
        </div>

        {/* Tambahan Buku */}
        <div className="grid grid-cols-1 justify-items-center mt-8">
          <div
            className="text-center cursor-pointer flex flex-col items-center"
            onClick={() => handleGeografiClick('Geografi')}
          >
            <Image
              src="/assets/Kelas_X/Buku_Geografi.png"
              alt="Geografi SMA Kelas X"
              width={150}
              height={200}
              className="mx-auto translate-x-[-350px]"
            />
            <p className="mt-2 text-sm translate-x-[-350px] font-poppins font-semibold">
              Buku paket Geografi <br /> Kelas X
            </p>
          </div>
        </div>

      </div>
    );
  }

  export default Page;
