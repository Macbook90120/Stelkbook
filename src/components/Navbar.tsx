"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      {/* Navbar */}
      <header className="w-full fixed top-0 left-0 bg-white shadow-md z-50 h-20">
  <div className="w-full px-3 md:px-6 flex items-center justify-between h-full">
    {/* Left: Menu + Logo */}
    <div className="flex items-center flex-shrink-0 space-x-2">
      <button
        onClick={toggleSidebar}
        className="p-2 focus:outline-none"
      >
        <Image src="/assets/Class/menu.png" alt="Menu" width={24} height={24} />
      </button>

      <div
        className="cursor-pointer flex-shrink-0"
        onClick={() => handleNavigation("/homepage")}
      >
        {/* Logo kecil untuk mobile */}
        <Image
          src="/assets/Class/iconstelkbook.png"
          alt="Logo Small"
          width={40}
          height={40}
          className="block md:hidden w-10 h-10 object-contain"
        />
        {/* Logo besar untuk desktop */}
        <Image
          src="/assets/Class/Stelk_bookTitle.png"
          alt="Logo Full"
          width={148}
          height={88}
          className="hidden md:block w-28 md:w-40 object-contain"
        />
      </div>
    </div>

    {/* Center: Search Bar */}
    <div className="flex-grow flex justify-center mx-2">
      <form
        onSubmit={handleSearchSubmit}
        className="w-full max-w-[160px] sm:max-w-[200px] md:max-w-xs flex items-center bg-[#F5F5F5] rounded-full px-3 py-1 md:py-2 shadow-sm"
      >
        <Image src="/assets/Class/Search_icon.png" alt="Search Icon" width={18} height={18} className="mr-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari"
          className="flex-grow bg-transparent border-none text-sm md:text-base text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-0"
        />
      </form>
    </div>

    {/* Right: Profile Icon */}
    <div className="flex items-center flex-shrink-0 space-x-2">
      <div
        className="cursor-pointer p-2"
        onClick={() => handleNavigation("/profile")}
      >
        <Image src="/assets/Class/icon_user.png" alt="User Icon" width={30} height={30} className="rounded-full md:w-[35px] md:h-[35px]" />
      </div>
    </div>
  </div>
</header>


      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
};

export default Navbar;