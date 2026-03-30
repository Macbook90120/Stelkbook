"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import AISidebar from "./AISidebar";
import { useAuth } from "@/context/authContext";
import { getStorageUrl } from '@/helpers/storage';


interface NavbarProps {
  bookContext?: {
    judul: string;
    penulis?: string;
    penerbit?: string;
    deskripsi?: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ bookContext }) => {
  const {user} = useAuth()
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAISidebarOpen, setIsAISidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleAISidebar = () => {
    setIsAISidebarOpen(!isAISidebarOpen);
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
          className="block md:hidden object-contain"
          style={{width: 'auto', height:'auto'}}
          // priority = {true}
        />
        {/* Logo besar untuk desktop */}
        <Image
          src="/assets/Class/Stelk_bookTitle.png"
          alt="Logo Full"
          width={148}
          height={88}
          className="hidden md:block w-28 md:w-40 object-contain"
          priority = {true}
        />
      </div>
    </div>

    {/* Center: Search Bar */}
    <div className="flex-grow flex justify-center mx-2">
      <form
        onSubmit={handleSearchSubmit}
        onClick={() => searchInputRef.current?.focus()}
        className="w-full max-w-[160px] sm:max-w-[200px] md:max-w-xs flex items-center bg-[#F5F5F5] rounded-full px-3 py-1 md:py-2 shadow-sm border border-transparent focus-within:border-gray-400 focus-within:bg-white transition-colors"
      >
      <img
        src="/assets/icon/search.svg"
        alt="Search Icon"
        width={18}
        height={18}
        className="mr-2"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari"
          ref={searchInputRef}
          className="flex-grow bg-transparent border-none text-sm md:text-base text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-0 caret-gray-700"
        />
      </form>
    </div>

    {/* Right: AI Icon + Profile Icon */}
    <div className="flex items-center flex-shrink-0 space-x-2">
      <div 
        className="cursor-pointer p-2"
        onClick={toggleAISidebar}
      >
        <Image
          src="/assets/icon/AI_Icon.svg"
          alt="AI Assistant"
          width={30}
          height={30}
          className="object-contain md:w-[35px] md:h-[35px]"
        />
      </div>
      <div
        className="cursor-pointer p-2"  
        onClick={() => handleNavigation("/profile")}
      >
        <Image src={user?.avatar ? getStorageUrl(user?.avatar) : "/assets/Class/Icon_user.png"} alt="User Icon" width={30} height={30} quality={100}className="rounded-full object-cover md:w-[35px] md:h-[35px]" />
      </div>
    </div>
  </div>
</header>


      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* AI Sidebar */}
      <AISidebar
        isOpen={isAISidebarOpen}
        onClose={() => setIsAISidebarOpen(false)}
        bookContext={bookContext}
      />
    </>
  );
};

export default Navbar;
