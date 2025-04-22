"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <>
      {/* Sidebar with Slide Animation */}
      <aside
  className={clsx(
    "fixed top-20 left-0 w-64 h-[calc(100%-4rem)] bg-red shadow-md text-white z-50 transform transition-transform duration-300 ease-in-out",
    {
      "translate-x-0": isOpen,
      "-translate-x-full": !isOpen,
    }
  )}
>
        <nav className="p-4">
          <ul className="space-y-6">
            <li
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
              onClick={() => handleNavigation("/SD_Guru")}
            >
              <Image src="/assets/Class/buku.png" alt="Book Icon" width={20} height={20} />
              <span className="text-lg font-semibold">SD</span>
            </li>
            <li
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
              onClick={() => handleNavigation("/SMP_Guru")}
            >
              <Image src="/assets/Class/buku.png" alt="Book Icon" width={20} height={20} />
              <span className="text-lg font-semibold">SMP</span>
            </li>
            <li
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
              onClick={() => handleNavigation("/SMK_Guru")}
            >
              <Image src="/assets/Class/buku.png" alt="Book Icon" width={20} height={20} />
              <span className="text-lg font-semibold">SMK</span>
            </li>
            <li
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
              onClick={() => handleNavigation("/guru_lainnya")}
            >
              <Image src="/assets/Class/buku.png" alt="Book Icon" width={20} height={20} />
              <span className="text-lg font-semibold">Non-Akademik</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Dimmed Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300"
        ></div>
      )}
    </>
  );
};

export default Sidebar;