"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose(); // Close the sidebar after navigation
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Sidebar */}
      <aside className="fixed top-16 left-0 w-64 h-[calc(100%-4rem)] bg-red shadow-md z-50 text-white">
        <nav className="p-4">
          <ul className="space-y-6">
            {/* SD */}
            <li
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
              onClick={() => handleNavigation("/SD")}
            >
              <Image
                src="/assets/Class/buku.png"
                alt="Book Icon"
                width={20}
                height={20}
              />
              <span className="text-lg font-semibold">SD</span>
            </li>

            {/* SMP */}
            <li
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
              onClick={() => handleNavigation("/SMP")}
            >
              <Image
                src="/assets/Class/buku.png"
                alt="Book Icon"
                width={20}
                height={20}
              />
              <span className="text-lg font-semibold">SMP</span>
            </li>

            {/* SMK */}
            <li
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
              onClick={() => handleNavigation("/SMK")}
            >
              <Image
                src="/assets/Class/buku.png"
                alt="Book Icon"
                width={20}
                height={20}
              />
              <span className="text-lg font-semibold">SMK</span>
            </li>

            {/* Lainnya */}
            <li
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
              onClick={() => handleNavigation("/lainnya")}
            >
              <Image
                src="/assets/Class/buku.png"
                alt="Book Icon"
                width={20}
                height={20}
              />
              <span className="text-lg font-semibold">Non-Akademik</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
      ></div>
    </>
  );
};

export default Sidebar;
