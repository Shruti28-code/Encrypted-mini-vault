import React from 'react';
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Key, FileText, Eye, Server, Zap, Cloud, Check } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Lock className="w-6 h-6" />,
            title: "End-to-End Encryption",
            description: "AES-256-GCM encryption ensures your data is secure at rest and in transit"
        },
        {
            icon: <Key className="w-6 h-6" />,
            title: "Your Keys, Your Control",
            description: "Client-side encryption means only you can access your documents"
        },
        {
            icon: <Server className="w-6 h-6" />,
            title: "Zero-Knowledge Architecture",
            description: "We never have access to your unencrypted data or keys"
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Lightning Fast",
            description: "Encrypt and decrypt files instantly with optimized algorithms"
        },
        {
            icon: <Cloud className="w-6 h-6" />,
            title: "Secure Cloud Storage",
            description: "Your encrypted files are safely stored in the cloud"
        },
        {
            icon: <Eye className="w-6 h-6" />,
            title: "Privacy First",
            description: "Complete transparency with open security practices"
        }
    ];

    const benefits = [
        "Military-grade AES-256-GCM encryption",
        "Zero-knowledge architecture",
        "Client-side encryption before upload",
        "Session-based security keys",
        "No data access by third parties",
        "Automatic vault lock on logout"
    ];

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0E1117]">
            {/* Enhanced animated background effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#06f9c8]/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#06f9c8]/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

            <div className="flex h-full grow flex-col relative z-10">
                <div className="flex flex-1 justify-center py-5">
                    <div className="flex flex-col w-full flex-1 px-4 md:px-10 max-w-7xl mx-auto">
                        {/* Header */}
                        <header className="flex items-center justify-between whitespace-nowrap px-0 py-3">
                            <div className="flex items-center gap-4 text-white group cursor-pointer">
                                <div className="w-10 h-10 text-[#06f9c8] transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300">
                                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            clipRule="evenodd"
                                            d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                                            fill="currentColor"
                                            fillRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">
                                    Encrypted Mini Vault
                                </h2>
                            </div>
                            <button
                                onClick={() => navigate("/login")}
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-white/5 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-white/10 hover:scale-105 transition-all duration-200 border border-white/10 hover:border-[#06f9c8]/30"
                            >
                                <span className="truncate">Login</span>
                            </button>
                        </header>

                        {/* Main Content */}
                        <main className="flex-grow flex flex-col justify-center">
                            <div className="py-20 md:py-28">
                                <div className="flex min-h-[480px] flex-col gap-12 items-center justify-center text-center p-4">
                                    {/* Hero Section */}
                                    <div className="flex flex-col gap-6 animate-fadeIn">
                                        <div className="inline-flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-[#06f9c8]/10 border border-[#06f9c8]/20 hover:bg-[#06f9c8]/15 transition-colors duration-300">
                                            <Shield className="w-4 h-4 text-[#06f9c8]" />
                                            <span className="text-[#06f9c8] text-sm font-semibold">Military-Grade Security</span>
                                        </div>

                                        <h1 className="text-gray-50 text-5xl font-black leading-tight tracking-tighter md:text-7xl bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                                            Encrypted Mini Vault
                                        </h1>

                                        <h2 className="text-slate-400 text-lg font-normal leading-relaxed max-w-2xl mx-auto md:text-xl">
                                            Secure client-side encrypted document storage. <br />
                                            <span className="text-[#06f9c8] font-medium">Your data, your keys, your privacy.</span>
                                        </h2>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="flex-wrap gap-4 flex justify-center">
                                        <button
                                            onClick={() => navigate("/signup")}
                                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-[#06f9c8] text-[#0E1117] text-base font-bold leading-normal tracking-[0.015em] hover:brightness-110 hover:scale-105 hover:shadow-lg hover:shadow-[#06f9c8]/30 transition-all duration-200"
                                        >
                                            <span className="truncate">Create Account</span>
                                        </button>
                                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-white/5 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-white/10 hover:scale-105 transition-all duration-200 border border-white/10 hover:border-[#06f9c8]/30">
                                            <span className="truncate">Learn More</span>
                                        </button>
                                    </div>

                                    {/* Preview Card */}
                                    <div className="mt-12 w-full max-w-4xl aspect-video rounded-2xl bg-gradient-to-tr from-[#0E1117] to-[#1a2029] p-1 shadow-2xl shadow-[#06f9c8]/20 border border-[#06f9c8]/20 hover:border-[#06f9c8]/40 transition-all duration-300 hover:shadow-[#06f9c8]/30 group">
                                        <div className="w-full h-full rounded-xl bg-[#1A1D21] flex items-center justify-center relative overflow-hidden">
                                            {/* Mock dashboard preview */}
                                            <div className="absolute inset-0 p-8 flex flex-col gap-4">
                                                {/* Mock header */}
                                                <div className="h-12 bg-white/5 rounded-lg border border-white/10"></div>

                                                {/* Mock stats */}
                                                <div className="grid grid-cols-3 gap-4 h-20">
                                                    <div className="bg-white/5 rounded-lg border border-white/10"></div>
                                                    <div className="bg-white/5 rounded-lg border border-white/10"></div>
                                                    <div className="bg-white/5 rounded-lg border border-white/10"></div>
                                                </div>

                                                {/* Mock content */}
                                                <div className="flex-1 bg-white/5 rounded-lg border border-white/10 p-6 space-y-3">
                                                    <div className="h-4 bg-white/10 rounded w-1/4"></div>
                                                    <div className="space-y-2">
                                                        <div className="h-3 bg-white/5 rounded"></div>
                                                        <div className="h-3 bg-white/5 rounded"></div>
                                                        <div className="h-3 bg-white/5 rounded w-3/4"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Overlay glow effect */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#06f9c8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    </div>

                                    {/* Benefits Section */}
                                    <div className="mt-16 w-full max-w-4xl">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {benefits.map((benefit, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#06f9c8]/30 transition-all duration-300 group"
                                                >
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#06f9c8]/10 flex items-center justify-center group-hover:bg-[#06f9c8]/20 transition-colors">
                                                        <Check className="w-4 h-4 text-[#06f9c8]" />
                                                    </div>
                                                    <span className="text-slate-300 text-sm font-medium">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Features Grid */}
                                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                                        {features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#06f9c8]/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#06f9c8]/10 group"
                                            >
                                                <div className="w-14 h-14 rounded-full bg-[#06f9c8]/10 flex items-center justify-center text-[#06f9c8] group-hover:bg-[#06f9c8]/20 transition-all duration-300 group-hover:scale-110">
                                                    {feature.icon}
                                                </div>
                                                <h3 className="text-white text-lg font-bold">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-slate-400 text-sm leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Final CTA Section */}
                                    <div className="mt-20 w-full max-w-4xl p-8 rounded-2xl bg-gradient-to-r from-[#06f9c8]/10 to-blue-500/10 border border-[#06f9c8]/20 hover:border-[#06f9c8]/40 transition-all duration-300">
                                        <h3 className="text-white text-2xl font-bold mb-3">
                                            Ready to secure your files?
                                        </h3>
                                        <p className="text-slate-400 text-base mb-6 max-w-2xl mx-auto">
                                            Join thousands of users protecting their sensitive documents with client-side encryption. Get started in seconds.
                                        </p>
                                        <button
                                            onClick={() => navigate("/signup")}
                                            className="inline-flex items-center gap-2 px-8 py-3 bg-[#06f9c8] text-[#0E1117] rounded-lg font-bold hover:brightness-110 hover:scale-105 hover:shadow-lg hover:shadow-[#06f9c8]/30 transition-all duration-200"
                                        >
                                            Get Started Free
                                            <Shield className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </main>

                        {/* Footer */}
                        <footer className="flex flex-col gap-6 px-5 py-10 text-center border-t border-white/5 mt-10">
                            {/* <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                                <a
                                    className="text-slate-400 text-sm font-normal leading-normal hover:text-[#06f9c8] transition-colors cursor-pointer"
                                    href="#"
                                >
                                    Terms of Service
                                </a>
                                <a
                                    className="text-slate-400 text-sm font-normal leading-normal hover:text-[#06f9c8] transition-colors cursor-pointer"
                                    href="#"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    className="text-slate-400 text-sm font-normal leading-normal hover:text-[#06f9c8] transition-colors cursor-pointer"
                                    href="#"
                                >
                                    Documentation
                                </a>
                                <a
                                    className="text-slate-400 text-sm font-normal leading-normal hover:text-[#06f9c8] transition-colors cursor-pointer"
                                    href="#"
                                >
                                    Security
                                </a>
                            </div> */}
                            <p className="text-slate-500 text-sm font-normal leading-normal">
                                © 2024 Encrypted Mini Vault. All rights reserved.
                            </p>
                        </footer>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out;
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.5;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.05);
                    }
                }

                .animate-pulse {
                    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default Home;