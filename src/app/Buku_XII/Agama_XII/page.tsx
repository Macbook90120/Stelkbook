'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  // Handlers
  const handleStelkbookClick = () => {
    router.push('/homepage'); // Navigate to homepage
  };

  const handleButtonClick = (button: string) => {
    if (button === 'User') {
      router.push('/profile'); // Navigate to profile page
    }
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
          Kelas XII
        </p>
      </div>
    </div>
  );
}

export default Page;
