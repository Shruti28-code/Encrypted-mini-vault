import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("Email entered:", `"${email}"`);
        console.log("Password entered:", `"${password}"`);


        const cleanEmail = email.trim();
        const cleanPassword = password.trim();

        if (!cleanEmail || !cleanPassword) {
            alert("Email or password cannot be empty");
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: cleanEmail,
            password: cleanPassword,
        });

        if (error) {
            alert(error.message);
        } else {
            alert("Signup successful! .");
            navigate("/dashboard");
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0E1117] font-display p-4">
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

                <button
                    onClick={() => navigate("/login")}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white/5 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-white/10 transition-colors"
                >
                    <span className="truncate">Log in</span>
                </button>
            </header>

            {/* Signup Card */}
            <main className="flex w-full flex-1 justify-center items-center mt-20">
                <div className="w-full max-w-md rounded-xl border border-white/10 bg-gradient-to-tr from-[#0E1117] to-[#1A1D21] p-8 shadow-2xl shadow-[#06f9c8]/10">
                    <div className="mb-6 text-center">
                        <h1 className="text-white text-2xl font-bold leading-tight">
                            Create your account
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Sign up to secure your documents in the vault
                        </p>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={handleSignup}>
                        {/* Email */}
                        <label className="flex flex-col">
                            <p className="text-slate-400 text-sm font-medium pb-2">Email</p>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="rounded-lg border border-white/10 bg-[#1A1D21] h-12 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#06f9c8]/50 transition-all"
                            />
                        </label>

                        {/* Password */}
                        <label className="flex flex-col">
                            <p className="text-slate-400 text-sm font-medium pb-2">Password</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full rounded-lg border border-white/10 bg-[#1A1D21] h-12 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#06f9c8]/50 transition-all"
                            />
                        </label>

                        {/* Signup Button */}
                        <button
                            type="submit"
                            className="w-full h-12 bg-[#06f9c8] text-[#0E1117] font-bold rounded-lg hover:brightness-110 transition-all"
                            style={{ boxShadow: "0 0 15px rgba(6, 249, 200, 0.3)" }}
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-400">
                            Already have an account?{" "}
                            <button
                                onClick={() => navigate("/login")}
                                className="font-semibold text-[#06f9c8] hover:underline"
                            >
                                Log in
                            </button>
                        </p>
                    </div>
                </div>
            </main>

            <footer className="flex flex-col gap-6 px-5 py-10 text-center">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                    <a className="text-slate-400 text-sm hover:text-white transition-colors cursor-pointer">Terms of Service</a>
                    <a className="text-slate-400 text-sm hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
                </div>
                <p className="text-slate-500 text-sm">
                    © 2024 Encrypted Mini Vault. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
