'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext'; // Ensure the import path is correct
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import WarningModal from './WarningForgot'; // Import the WarningModal component

function Login() {
    const { login } = useAuth();
    const router = useRouter();
    const [form, setForm] = useState({
        kode: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Tambahkan state untuk menangani submit ganda

    useEffect(() => {
        // Disable scrolling on mount
        document.body.style.overflow = 'hidden';

        return () => {
            // Re-enable scrolling on unmount
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return; // Hindari submit ganda

        setErrorMessage('');
        setIsSubmitting(true); // Set submitting ke true

        try {
            await login(form); // Call login function from useAuth
            // Redirect akan dihandle di dalam fungsi login di AuthContext
        } catch (error) {
            setErrorMessage('Login gagal. Periksa kembali kode atau password.');
        } finally {
            setIsSubmitting(false); // Set submitting ke false setelah selesai
        }
    };

    const handleForgotPasswordClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setShowWarningModal(true); // Show the warning modal
    };

    const handleCloseWarningModal = () => {
        setShowWarningModal(false); // Close the warning modal
    };

    return (
        <div className="flex min-h-screen">
            {/* Left-side image */}
            <div
                className="hidden lg:block lg:w-9/12 relative"
                style={{ height: '100vh' }}
            >
                <Image
                    src="/assets/Lab komputer.jpg"
                    alt="BackgroundComputer"
                    className="absolute inset-0 object-cover"
                    layout="fill"
                    priority
                    style={{ objectFit: 'cover', transform: 'scale(1.3) translateX(11%)' }}
                />
            </div>

            {/* Right-side login */}
            <div
                className="flex w-full lg:w-4/12 items-center justify-center p-8 bg-white lg:min-h-screen lg:shadow-lg lg:rounded-none"
                style={{
                    position: 'relative',
                    boxShadow: 'none',
                    borderTopRightRadius: '0px',
                    borderBottomRightRadius: '0px',
                }}
            >
                <div className="w-full h-full max-w-md p-8 bg-white rounded-lg">
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
                            <input
                                type="text"
                                id="kode"
                                name="kode"
                                value={form.kode}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                                placeholder="NIS/NIP"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-red"
                                placeholder="Password"
                                required
                            />
                        </div>
                        {errorMessage && (
                            <div className="mt-4 text-red-500 text-sm text-center">
                                {errorMessage}
                            </div>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-red text-white font-semibold rounded-md hover:bg-red-600 transition duration-200"
                                disabled={isSubmitting} // Nonaktifkan tombol saat submitting
                            >
                                {isSubmitting ? 'Loading...' : 'Login'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-right">
                        <a
                            href="#"
                            onClick={handleForgotPasswordClick}
                            className="text-sm text-red-500 hover:underline cursor-pointer"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </div>
                {/* Powered by Telkom section */}
                <div className="absolute bottom-8 w-full text-center flex justify-center items-center space-x-4">
                    <Image src="/assets/PoweredBy.png" alt="Powered by Logo" width={80} height={10} />
                    <Image src="/assets/Telkom.schools.png" alt="Telkom Logo" width={80} height={10} />
                </div>
            </div>

            {/* Warning Modal */}
            {showWarningModal && (
                <WarningModal onClose={handleCloseWarningModal} />
            )}
        </div>
    );
}

export default Login;