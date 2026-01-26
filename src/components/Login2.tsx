'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import WarningModal from './WarningForgot';
import { Eye, EyeOff } from 'lucide-react';

const slides = [
    { image: "/assets/login/4.png", id: "04" },
    { image: "/assets/login/2.png", id: "02" },
    { image: "/assets/login/7.png", id: "07" },
    { image: "/assets/login/3.png", id: "03" },
    { image: "/assets/login/5.png", id: "05" },
    { image: "/assets/login/6.png", id: "06" },
    { image: "/assets/login/1.png", id: "01" },
    { image: "/assets/login/8.png", id: "08" },
    { image: "/assets/login/perpus.png", id: "09" },
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
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
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
            const user = await login(form);
            const role = user.role.toLowerCase();

            switch (role) {
                case 'admin':
                case 'perpus':
                case 'pengurusperpustakaan':
                    router.push('/perpustakaan');
                    break;
                case 'guru':
                    router.push('/homepage_guru');
                    break;
                case 'siswa':
                default:
                    router.push('/homepage');
                    break;
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
        <div className="flex min-h-screen flex-col lg:flex-row">
            {/* Left-side slideshow - Hidden on mobile, shown on lg and up */}
            <div className="hidden lg:block lg:w-9/12 relative" style={{ height: '100vh' }}>
                {isClient && slides.map((slide, index) => (
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
                            fill
                            className="object-cover brightness-75"
                            priority={index === 0}
                            sizes="(max-width: 1024px) 0px, 75vw"
                            loading={index === 0 ? 'eager' : 'lazy'}
                        />
                    </div>
                ))}
            </div>

            {/* Right-side login */}
            <div className="flex w-full lg:w-4/12 items-center justify-center p-4 sm:p-8 bg-white lg:min-h-screen">
                <div className="w-full max-w-md p-6 sm:p-8 bg-white rounded-lg">
                    <div className="text-center mb-8">
                        <Image
                            src="/assets/icon/stelkbook-logo.svg"
                            alt="StelkBook Logo"
                            width={60}
                            height={60}
                            className="mx-auto mb-4 opacity-90"
                            style={{ width: 'auto', height: 'auto' }}
                            priority // Ditambahkan untuk mengatasi warning LCP
                        />
                        <Image
                            src="/assets/icon/stelkbook-wordmark.svg"
                            alt="Title Text"
                            width={180}
                            height={45}
                            className="mx-auto opacity-60"
                            style={{ width: 'auto', height: 'auto' }}
                            priority // Ditambahkan karena ini juga bagian penting di atas fold
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

                    {/* Powered by Telkom section - Mobile version */}
                    <div className="mt-8 lg:hidden flex justify-center">
                        <div className="flex items-center space-x-4">
                            <Image 
                                src="/assets/PoweredBy.png" 
                                alt="Powered by Logo" 
                                width={80} 
                                height={20}
                                style={{ width: 'auto', height: 'auto' }}
                            />
                            <Image 
                                src="/assets/Telkom.schools.png" 
                                alt="Telkom Logo" 
                                width={80} 
                                height={20}
                                style={{ width: 'auto', height: 'auto' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Powered by Telkom section - Desktop version */}
                <div className="absolute bottom-8 w-full text-center hidden lg:flex justify-center items-center space-x-4">
                    <Image 
                        src="/assets/PoweredBy.png" 
                        alt="Powered by Logo" 
                        width={80} 
                        height={20}
                        style={{ width: 'auto', height: 'auto' }}
                    />
                    <Image 
                        src="/assets/Telkom.schools.png" 
                        alt="Telkom Logo" 
                        width={80} 
                        height={20}
                        style={{ width: 'auto', height: 'auto' }}
                    />
                </div>
            </div>

            {/* Warning Modal */}
            {showWarningModal && <WarningModal onClose={handleCloseWarningModal} />}
        </div>
    );
}

export default Login;