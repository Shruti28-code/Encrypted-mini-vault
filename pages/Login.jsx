import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase"; // <-- Make sure this path is correct

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setError(error.message);
            return;
        }

        // ✔ Login Success → redirect to dashboard
        navigate("/dashboard");
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0E1117]">
            <div className="flex h-full grow flex-col">
                <div className="flex flex-1 justify-center py-5">
                    <div className="flex flex-col w-full flex-1 px-4 md:px-10">

                        {/* Header */}
                        <header className="flex items-center justify-between whitespace-nowrap px-0 py-3">
                            <div className="flex items-center gap-4 text-white">
                                <div className="w-6 h-6 text-[#06f9c8]">
                                    {/* SVG */}
                                </div>
                                <h2 className="text-white text-lg font-bold">
                                    Encrypted Mini Vault
                                </h2>
                            </div>
                        </header>

                        {/* Main */}
                        <main className="flex-grow flex flex-col justify-center">
                            <div className="py-20 md:py-28">
                                <div className="flex min-h-[480px] flex-col gap-8 items-center justify-center text-center p-4">
                                    <div className="flex flex-col gap-4 w-full max-w-md">

                                        {/* Login Card */}
                                        <div className="flex flex-col gap-6 rounded-xl border border-white/10 bg-gradient-to-tr from-[#0E1117] to-[#1a2029] p-8 shadow-2xl shadow-[#06f9c8]/10">
                                            <div className="flex flex-col gap-2 text-center">
                                                <h1 className="text-white text-2xl font-bold">
                                                    Log in to your vault
                                                </h1>
                                                <p className="text-slate-400">
                                                    Welcome back! Please enter your details.
                                                </p>
                                            </div>

                                            {/* Error */}
                                            {error && (
                                                <p className="text-red-400 text-sm">{error}</p>
                                            )}

                                            {/* Form */}
                                            <div className="flex flex-col gap-4">
                                                <label className="flex flex-col w-full">
                                                    <p className="text-slate-400 text-sm pb-2">
                                                        Email
                                                    </p>
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="you@example.com"
                                                        className="flex w-full rounded-lg border border-white/10 bg-[#1A1D21] h-11 px-3 text-white placeholder-slate-500"
                                                    />
                                                </label>

                                                <label className="flex flex-col w-full">
                                                    <p className="text-slate-400 text-sm pb-2">
                                                        Password
                                                    </p>
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="••••••••"
                                                        className="flex w-full rounded-lg border border-white/10 bg-[#1A1D21] h-11 px-3 text-white placeholder-slate-500"
                                                    />
                                                </label>

                                                <button
                                                    onClick={handleLogin}
                                                    className="flex w-full items-center justify-center rounded-lg h-12 px-6 bg-[#06f9c8] text-[#0E1117] font-bold hover:brightness-110"
                                                >
                                                    Log in
                                                </button>
                                            </div>

                                            <p className="text-slate-400 text-sm text-center">
                                                Don't have an account?{" "}
                                                <button
                                                    onClick={() => navigate("/signup")}
                                                    className="text-[#06f9c8] font-medium hover:underline"
                                                >
                                                    Sign up
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>

                        {/* Footer */}
                        <footer className="flex flex-col gap-6 px-5 py-10 text-center">
                            <p className="text-slate-500 text-sm">
                                © 2024 Encrypted Mini Vault. All rights reserved.
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
