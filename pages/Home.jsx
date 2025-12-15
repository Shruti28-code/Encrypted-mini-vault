import React from 'react';
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0E1117]">
            <div className="flex h-full grow flex-col">
                <div className="flex flex-1 justify-center py-5">
                    <div className="flex flex-col w-full flex-1 px-4 md:px-10">
                        {/* Header */}
                        <header className="flex items-center justify-between whitespace-nowrap px-0 py-3">
                            <div className="flex items-center gap-4 text-white">
                                <div className="w-6 h-6 text-[#06f9c8]">
                                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            clipRule="evenodd"
                                            d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                                            fill="currentColor"
                                            fillRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                                    Encrypted Mini Vault
                                </h2>
                            </div>
                            <button onClick={() => navigate("/login")} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white/5 text - white text - sm font - bold leading - normal tracking - [0.015em] hover:bg-white/10 transition-colors ">
                                <span className="truncate">Login</span>
                            </button>
                        </header>

                        {/* Main Content */}
                        <main className="flex-grow flex flex-col justify-center">
                            <div className="py-20 md:py-28">
                                <div className="flex min-h-[480px] flex-col gap-8 items-center justify-center text-center p-4">
                                    <div className="flex flex-col gap-4">
                                        <h1 className="text-gray-50 text-4xl font-black leading-tight tracking-tighter md:text-6xl">
                                            Encrypted Mini Vault
                                        </h1>
                                        <h2 className="text-slate-400 text-lg font-normal leading-normal max-w-xl mx-auto md:text-xl">
                                            Secure client-side encrypted document storage. Your data, your keys, your privacy.
                                        </h2>
                                    </div>

                                    <div className="flex-wrap gap-4 flex justify-center">
                                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#06f9c8] text-[#0E1117] text-base font-bold leading-normal tracking-[0.015em] hover:brightness-110 transition-all">
                                            <span className="truncate">Create Account</span>
                                        </button>
                                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white/5 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-white/10 transition-colors">
                                            <span className="truncate">Learn More</span>
                                        </button>
                                    </div>

                                    {/* Preview Card */}
                                    <div className="mt-12 w-full max-w-3xl aspect-video rounded-xl bg-gradient-to-tr from-[#0E1117] to-[#1a2029] p-2 shadow-2xl shadow-[#06f9c8]/10 border border-white/10">
                                        <div
                                            className="w-full h-full rounded-lg bg-cover bg-center bg-no-repeat"
                                            style={{
                                                backgroundImage: 'linear-gradient(rgba(14, 17, 23, 0.5) 0%, rgba(14, 17, 23, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCm2HgtEY2eHADa7uQxPuQsKBRqD6VWCL5Tc6SH08Nbv7a2TrpyaF2HKxCuvtGYW_0-kL2G4jfr0IOBBRsYH-saGbDj-oke70HfBVU5yxh9GdeEQHZcb7eKMpcUrqEsSZCB04Bj9UA62baa4i9wiGk97mrvES3cRyF8-TQFqUv--ysp5YGtDIJ3hWnl5V5jDP8YBgJAeGdqoWtCfH9uSssqGg9gMycB1mMZUjxmai6sbbcs8SrADTF9M0FEuBiSO6MfBO6sUBwoyw")'
                                            }}
                                            role="img"
                                            aria-label="A blurred, minimalistic preview of the application's dashboard showing abstract shapes and secure lock icons"
                                        />
                                    </div>
                                </div>
                            </div>
                        </main>

                        {/* Footer */}
                        <footer className="flex flex-col gap-6 px-5 py-10 text-center">
                            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                                <a
                                    className="text-slate-400 text-sm font-normal leading-normal hover:text-white transition-colors cursor-pointer"
                                    href="#"
                                >
                                    Terms of Service
                                </a>
                                <a
                                    className="text-slate-400 text-sm font-normal leading-normal hover:text-white transition-colors cursor-pointer"
                                    href="#"
                                >
                                    Privacy Policy
                                </a>
                            </div>
                            <p className="text-slate-500 text-sm font-normal leading-normal">
                                © 2024 Encrypted Mini Vault. All rights reserved.
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Home;