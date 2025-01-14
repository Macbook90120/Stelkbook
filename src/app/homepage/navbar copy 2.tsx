import { useState } from 'react';
import Image from 'next/image';

function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div>
            {/* Navbar */}
            <div className="flex items-center p-4 bg-gray-50 shadow-md">
                <button
                    onClick={() => {
                        setIsSidebarOpen(true);
                        console.log('Sidebar Open:', isSidebarOpen);
                    }}
                    className="cursor-pointer bg-transparent focus:outline-none transform transition-all duration-300 scale-100 hover:scale-105 active:scale-95"
                    aria-label="Open Sidebar"
                >
                    <Image
                        src="/assets/Class/Navbar_Background.png"
                        alt="Open Sidebar"
                        width={25}
                        height={20}
                        priority
                    />
                </button>
            </div>


            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-red-500 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 z-50 w-64`}
            >
                <div className="flex flex-col p-4 text-white">
                    {/* Close Button */}
                    <div className="flex justify-between mb-4">
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="focus:outline-none"
                            aria-label="Close Sidebar"
                        >
                            <Image
                                src="/assets/Class/close_icon.png"
                                alt="Close Sidebar"
                                width={25}
                                height={25}
                                priority
                            />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <ul className="space-y-4">
                        {[
                            { label: 'Kelas X', action: () => alert('Kelas X clicked') },
                            { label: 'Kelas XI', action: () => alert('Kelas XI clicked') },
                            { label: 'Kelas XII', action: () => alert('Kelas XII clicked') },
                            { label: 'Lainnya', action: () => alert('Lainnya clicked') },
                        ].map((item, index) => (
                            <li
                                key={index}
                                className="cursor-pointer flex items-center space-x-2"
                                onClick={item.action}
                            >
                                <Image
                                    src="/assets/Class/icon_user.png"
                                    alt={item.label}
                                    width={20}
                                    height={20}
                                    priority
                                />
                                <span>{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;