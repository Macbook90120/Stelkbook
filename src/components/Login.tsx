'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Login() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Redirect to the homepage
        router.push('/homepage');
    };

    return (
        <div className="flex min-h-screen">
            {/* Bagian: foto kiri background */}
            <div className="w-1/2 hidden lg:block relative z-0">
                <div className="absolute inset-0">
                    <Image
                        src="/assets/Lab komputer.jpg"
                        alt="BackgroundComputer"
                        className="object-cover"
                        layout="fill"
                        priority
                        style={{
                            objectFit: 'cover',
                            transform: 'scale(1.0) translateX(0%)',
                        }}
                    />
                </div>
            </div>

            {/* Bagian: form */}
            <div
                className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-200 relative z-10 min-h-screen"
                style={{
                    transform: 'scale(1.0)',
                }}
            >
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <div className="text-center mb-8">
                        {/* Stelkbook logo */}
                        <Image
                            src="/assets/Stelkbook_logo.png"
                            alt="StelkBook Logo"
                            width={100}
                            height={100}
                            className="mx-auto mb-4"
                        />
                        {/* Title Text */}
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
                        {/* Bagian Foto kolaborasi perusahaan */}
                        <Image src="/assets/PoweredBy.png" alt="Powered by Logo" width={100} height={30} />
                        <Image src="/assets/Telkom.schools.png" alt="Telkom Logo" width={100} height={30} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
