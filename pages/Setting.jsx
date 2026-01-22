import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

const Settings = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        };

        getUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/login";
    };

    const handleResetKey = () => {
        alert(
            "⚠️ Resetting encryption key will make existing files unreadable.\n\nFeature intentionally restricted."
        );
    };

    return (
        <div className="min-h-screen bg-background-dark text-white px-6 py-10">
            <div className="max-w-3xl mx-auto space-y-10">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-black">Settings</h1>
                    <p className="text-white/60">
                        Manage your account and encryption preferences
                    </p>
                </div>

                {/* Account Info */}
                <div className="rounded-xl bg-[#1A1D23] p-6 space-y-4">
                    <h2 className="text-lg font-bold">Account Information</h2>

                    <div className="flex justify-between text-white/80">
                        <span>Email</span>
                        <span className="font-mono text-sm">
                            {user?.email || "Loading..."}
                        </span>
                    </div>

                    <div className="flex justify-between text-white/80">
                        <span>User ID</span>
                        <span className="font-mono text-sm truncate max-w-[220px]">
                            {user?.id}
                        </span>
                    </div>
                </div>

                {/* Encryption Status */}
                <div className="rounded-xl bg-[#1A1D23] p-6 space-y-4">
                    <h2 className="text-lg font-bold">Encryption</h2>

                    <div className="flex justify-between items-center">
                        <span className="text-white/80">Client-side encryption</span>
                        <span className="text-green-400 font-semibold">Active</span>
                    </div>

                    <p className="text-sm text-white/50">
                        Files are encrypted in your browser using AES-GCM before upload.
                        Supabase never receives plaintext data.
                    </p>

                    <button
                        onClick={handleResetKey}
                        className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
                    >
                        Reset Encryption Key
                    </button>
                </div>

                {/* Security */}
                <div className="rounded-xl bg-[#1A1D23] p-6 space-y-4">
                    <h2 className="text-lg font-bold">Security</h2>

                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 rounded-lg bg-primary text-background-dark font-bold hover:opacity-90"
                    >
                        Logout
                    </button>
                </div>

                {/* Danger Zone */}
                <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6 space-y-4">
                    <h2 className="text-lg font-bold text-red-400">Danger Zone</h2>

                    <p className="text-sm text-red-300/80">
                        Deleting your account will permanently remove all encrypted files.
                    </p>

                    <button
                        disabled
                        className="w-full px-4 py-2 rounded-lg bg-red-500/20 text-red-300 cursor-not-allowed"
                    >
                        Delete Account (Coming Soon)
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Settings;
