"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar_perpus"; // Import the Sidebar component
import { useAuth } from "@/context/authContext";

const Navbar: React.FC = () => {
  const {user} = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Navbar */}
      <header className="w-full fixed top-0 left-0 bg-white shadow-md z-50 h-20">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center h-full space-x-4">
          {/* Logo and Menu Icon */}
          <div className="flex items-center space-x-4">
            {/* Menu Icon */}
            <button
              onClick={toggleSidebar}
              className="focus:outline-none"
            >
              <Image
                src="/assets/icon/menu.svg"
                alt="Menu"
                width={20}
                height={20}
              />
            </button>

            {/* Logo (Responsive Changes) */}
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => handleNavigation("/perpustakaan/Daftar_Buku")}
            >
              {/* Use different logos based on screen size */}
              <Image
                src="/assets/Class/iconstelkbook.png"
                alt="Logo Small"
                width={50}
                height={50}
                className="block md:hidden"
              />
              <Image
                src="/assets/icon/stelkbook-logo-navbar.svg"
                alt="Logo Full"
                width={148}
                height={88}
                className="w-28 md:w-40 hidden md:block"
              />
            </div>
          </div>

         

          {/* Profile Icon */}
          <div className="flex items-center space-x-4">
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => handleNavigation("/profile_perpus")}
            >
              <Image
               src={user?.avatar ? `http://localhost:8000/storage/${user?.avatar}` : "/assets/Class/Icon_user.png"} alt="User Icon" width={30} height={30} quality={100}
                 className="rounded-full object-cover md:w-[35px] md:h-[35px]"
              />
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
