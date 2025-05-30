'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import WarningModal from './WarningForgot';
import { Eye, EyeOff } from 'lucide-react';

const slides = [
    { image: "/assets/login/1.png", id: "01" },
    { image: "/assets/login/2.png", id: "02" },
    { image: "/assets/login/3.png", id: "03" },
    { image: "/assets/login/4.png", id: "04" },
    { image: "/assets/login/perpus.png", id: "05" },
];

function Login() {
    const { login } = useAuth();
    const router = useRouter();
    const [form, setForm] = useState({ kode: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => {
            document.body.style.overflow = 'auto';
            clearInterval(interval);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;
        setErrorMessage('');
        setIsSubmitting(true);
        try {
        const user =  await login(form);

        switch (user.role) {
            case 'Admin':
              router.push('/admin');
              break;
            case 'Guru':
              router.push('/homepage_guru');
              break;
            case 'Perpus':
              router.push('/perpustakaan');
              break;
            default:
              router.push('/homepage');
        }
        } catch (error) {
            setErrorMessage('Login gagal. Periksa kembali kode atau password.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRegistrasiClick = () => {
        router.push('/registrasi')
    };

    const handleCloseWarningModal = () => {
        setShowWarningModal(false);
    };

    return (
        <div className="flex min-h-screen">
            {/* Left-side slideshow */}
            <div className="hidden lg:block lg:w-9/12 relative" style={{ height: '100vh' }}>
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            currentSlide === index ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ zIndex: 0 }}
                    >
                        <Image
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            priority
                            className="brightness-75"
                        />
                    </div>
                ))}
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
                            src="/assets/icon/stelkbook-logo.svg"
                            alt="StelkBook Logo"
                            width={100}
                            height={100}
                            className="mx-auto mb-4 opacity-90"
                        />
                        <Image
                            src="/assets/icon/stelkbook-wordmark.svg"
                            alt="Title Text"
                            width={200}
                            height={50}
                            className="mx-auto opacity-60"
                        />
                    </div>
                    <form onSubmit={handleSubmit} method="POST">
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
                        <div className="mb-6 relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-red pr-10"
                                placeholder="Password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
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
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Loading...' : 'Login'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-right">
                        <button
                            
                            onClick={handleRegistrasiClick}
                            className="text-sm text-red hover:underline cursor-pointer"
                        >
                            Registrasi?
                        </button>
                    </div>
                </div>

                {/* Powered by Telkom section */}
                <div className="absolute bottom-8 w-full text-center flex justify-center items-center space-x-4">
                    <Image src="/assets/PoweredBy.png" alt="Powered by Logo" width={80} height={10} />
                    <Image src="/assets/Telkom.schools.png" alt="Telkom Logo" width={80} height={10} />
                </div>
            </div>

            {/* Warning Modal */}
            {showWarningModal && <WarningModal onClose={handleCloseWarningModal} />}
        </div>
    );
}

export default Login;