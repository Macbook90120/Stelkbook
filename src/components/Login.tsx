'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Disable scrolling on mount
        document.body.style.overflow = 'hidden';

        return () => {
            // Re-enable scrolling on unmount
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Credentials for each role
        const credentials = {
            teacher: { username: 'guru123', password: '123456789', redirect: '/homepage_guru' },
            perpus: { username: 'perpus123', password: '123456789', redirect: '/perpustakaan' },
            admin: { username: 'admin12345', password: '123456789', redirect: '/admin' },
            siswa: { username: 'siswa123', password: '123456789', redirect: '/homepage' },
        };

        // Match credentials and redirect properly
        if (
            username === credentials.teacher.username &&
            password === credentials.teacher.password
        ) {
            router.push(credentials.teacher.redirect);
        } else if (
            username === credentials.perpus.username &&
            password === credentials.perpus.password
        ) {
            router.push(credentials.perpus.redirect);
        } else if (
            username === credentials.admin.username &&
            password === credentials.admin.password
        ) {
            router.push(credentials.admin.redirect);
        } else if (
            username === credentials.siswa.username &&
            password === credentials.siswa.password
        ) {
            router.push(credentials.siswa.redirect);
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="flex min-h-screen">

            {/* foto bagian kiri */}
            <div
                className="w-6/12 hidden lg:block relative z-0"
                style={{ height: '100vh', width: '55vw' }}
            >
                <div className="absolute inset-0" style={{ height: '100%', width: '101%' }}>
                    <Image
                        src="/assets/Lab komputer.jpg"
                        alt="BackgroundComputer"
                        className="object-cover"
                        layout="fill"
                        priority
                        style={{
                            objectFit: 'cover',
                            transform: 'scale(1.3) translateX(11%)',
                            height: '100%',
                            width: '100%',
                        }}
                    />
                </div>
            </div>

            {/* Form section */}
            <div
                className="w-full lg:w-7/12 flex items-center justify-center p-8 relative z-10 min-h-screen"
                style={{
                    transform: 'scale(1.0) translateX(120px)',
                    backgroundColor: 'transparent',
                }}
            >
                <div className="w-full max-w-md p-8 bg-white/80 rounded-lg shadow-lg">
                    <div className="text-center mb-8">
                        <Image
                            src="/assets/Stelkbook_logo.png"
                            alt="StelkBook Logo"
                            width={100}
                            height={100}
                            className="mx-auto mb-4"
                        />
                        <Image
                            src="/assets/Title_Text.png"
                            alt="Title Text"
                            width={200}
                            height={50}
                            className="mx-auto"
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-red text-white font-semibold rounded-md hover:bg-red-600 transition duration-200"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center flex justify-center items-center space-x-4">
                        <Image src="/assets/PoweredBy.png" alt="Powered by Logo" width={100} height={30} />
                        <Image src="/assets/Telkom.schools.png" alt="Telkom Logo" width={100} height={30} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
