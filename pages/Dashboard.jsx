import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Shield, Lock, FileText, TrendingUp, Clock, HardDrive } from 'lucide-react';

const USER_QUOTA_MB = 100;
const USER_QUOTA_BYTES = USER_QUOTA_MB * 1024 * 1024;

export default function Dashboard() {
    const [name, setName] = useState("");
    const [documents, setDocuments] = useState([]);
    const [totalDocs, setTotalDocs] = useState(0);
    const [usedBytes, setUsedBytes] = useState(0);
    const [isEncryptionActive, setIsEncryptionActive] = useState(false);

    useEffect(() => {
        const loadDashboard = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // 1️⃣ Load profile
            const { data: profile } = await supabase
                .from("profiles")
                .select("full_name")
                .eq("id", user.id)
                .single();

            if (profile) setName(profile.full_name);

            // 2️⃣ Fetch documents
            const { data: docs, error } = await supabase
                .from("documents")
                .select("id, file_name, file_size, created_at")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Fetch documents error:", error);
                return;
            }

            setDocuments(docs || []);
            setTotalDocs(docs.length);

            const totalSize = docs.reduce(
                (sum, doc) => sum + doc.file_size,
                0
            );
            setUsedBytes(totalSize);
        };

        loadDashboard();

        // Check encryption status
        const encryptionKey = sessionStorage.getItem('vaultEncryptionKey');
        setIsEncryptionActive(!!encryptionKey);
    }, []);

    const usedMB = (usedBytes / 1024 / 1024).toFixed(2);
    const usagePercent = Math.min(
        Math.round((usedBytes / USER_QUOTA_BYTES) * 100),
        100
    );

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    const getFileIcon = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase();
        const icons = {
            'pdf': '📄',
            'doc': '📝',
            'docx': '📝',
            'txt': '📃',
            'jpg': '🖼️',
            'jpeg': '🖼️',
            'png': '🖼️',
            'zip': '📦',
            'default': '📁'
        };
        return icons[ext] || icons.default;
    };

    return (
        <div className="flex flex-col min-h-screen text-gray-300 bg-[#0E1117] font-display">
            <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
                {/* Welcome Section */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                        {getGreeting()}{name ? `, ${name.split(' ')[0]}` : ''}! 👋
                    </h1>
                    <p className="text-sm sm:text-base text-white/60">
                        Welcome back to your encrypted vault
                    </p>
                </div>

                {/* Vault Security Status */}
                <div className="bg-[#1A1D21] p-4 sm:p-6 rounded-xl border border-white/10 mb-6 sm:mb-8 hover:border-[#06f9c8]/30 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-[#06f9c8]/10 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-[#06f9c8]" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-white">
                                    {isEncryptionActive ? "Encryption Active" : "Vault Status"}
                                </h3>
                            </div>

                            {isEncryptionActive ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                        <span className="text-white/80">Client-side encryption enabled</span>
                                    </div>
                                    <div className="text-xs sm:text-sm text-white/60">
                                        Algorithm: <span className="text-white/80 font-mono">AES-256-GCM</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                        <span className="text-white/80">Encryption key not detected</span>
                                    </div>
                                    <div className="text-xs text-white/60 mt-2">
                                        Your encryption key will be generated when you upload your first file.
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <Lock className="w-3 h-3 text-[#06f9c8]" />
                            <span className="text-xs text-white/80">Session Protected</span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-[#1A1D21] p-4 sm:p-6 rounded-xl border border-white/10 hover:border-[#06f9c8]/20 hover:scale-105 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-white/80 text-sm sm:text-base">Total Documents</p>
                            <div className="w-10 h-10 rounded-full bg-[#06f9c8]/10 flex items-center justify-center group-hover:bg-[#06f9c8]/20 transition-colors">
                                <FileText className="w-5 h-5 text-[#06f9c8]" />
                            </div>
                        </div>
                        <p className="text-white text-3xl sm:text-4xl font-bold">
                            {totalDocs}
                        </p>
                        <p className="text-xs sm:text-sm text-white/40 mt-2">Encrypted files</p>
                    </div>

                    <div className="bg-[#1A1D21] p-4 sm:p-6 rounded-xl border border-white/10 hover:border-[#06f9c8]/20 hover:scale-105 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-white/80 text-sm sm:text-base">Storage Used</p>
                            <div className="w-10 h-10 rounded-full bg-[#06f9c8]/10 flex items-center justify-center group-hover:bg-[#06f9c8]/20 transition-colors">
                                <HardDrive className="w-5 h-5 text-[#06f9c8]" />
                            </div>
                        </div>
                        <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                            {usedMB} <span className="text-lg sm:text-xl text-white/60">MB</span>
                        </p>
                        <p className="text-xs sm:text-sm text-white/40 mt-2">of {USER_QUOTA_MB} MB quota</p>
                    </div>

                    <div className="bg-[#1A1D21] p-4 sm:p-6 rounded-xl border border-white/10 hover:border-[#06f9c8]/20 hover:scale-105 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-white/80 text-sm sm:text-base">Usage</p>
                            <div className="w-10 h-10 rounded-full bg-[#06f9c8]/10 flex items-center justify-center group-hover:bg-[#06f9c8]/20 transition-colors">
                                <TrendingUp className="w-5 h-5 text-[#06f9c8]" />
                            </div>
                        </div>
                        <p className="text-white text-3xl sm:text-4xl font-bold">
                            {usagePercent}<span className="text-lg sm:text-xl text-white/60">%</span>
                        </p>
                        <p className="text-xs sm:text-sm text-white/40 mt-2">Quota utilized</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-[#1A1D21] p-4 sm:p-6 rounded-xl border border-white/10 mb-6 sm:mb-8 hover:border-[#06f9c8]/20 transition-all duration-300">
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-white/80 text-sm sm:text-base">Storage Usage</p>
                        <p className="text-white font-bold text-sm sm:text-base">
                            {usagePercent}%
                        </p>
                    </div>
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-[#06f9c8] to-blue-500 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${usagePercent}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-white/40 mt-2">
                        {(USER_QUOTA_MB - parseFloat(usedMB)).toFixed(2)} MB remaining
                    </p>
                </div>

                {/* Recent Documents */}
                <div className="bg-[#1A1D21] p-4 sm:p-6 rounded-xl border border-white/10 hover:border-[#06f9c8]/20 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#06f9c8]/10 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-[#06f9c8]" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-white">
                                Recent Documents
                            </h3>
                        </div>
                        <span className="text-xs sm:text-sm text-white/50">
                            Showing latest 3 files
                        </span>
                    </div>

                    {documents.length === 0 ? (
                        <div className="text-center py-12 sm:py-16">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                <FileText className="w-8 h-8 text-white/20" />
                            </div>
                            <h4 className="text-white text-base sm:text-lg font-semibold mb-2">Your vault is empty</h4>
                            <p className="text-white/60 text-xs sm:text-sm mb-6 max-w-md mx-auto">
                                Upload your first file to get started. All files are encrypted using AES-256-GCM on your device before upload.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                            <div className="inline-block min-w-full align-middle">
                                <table className="w-full text-left text-sm text-gray-300">
                                    <thead className="text-xs text-gray-400 uppercase border-b border-white/10">
                                        <tr>
                                            <th className="py-3 px-4 whitespace-nowrap">Name</th>
                                            <th className="py-3 px-4 whitespace-nowrap hidden sm:table-cell">Date</th>
                                            <th className="py-3 px-4 whitespace-nowrap">Size</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {documents.slice(0, 3).map((doc) => (
                                            <tr
                                                key={doc.id}
                                                className="border-b border-white/10 hover:bg-white/5 transition-colors group"
                                            >
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xl flex-shrink-0">
                                                            {getFileIcon(doc.file_name)}
                                                        </span>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="text-white font-medium truncate group-hover:text-[#06f9c8] transition-colors">
                                                                {doc.file_name}
                                                            </div>
                                                            <div className="flex items-center gap-1.5 mt-1 sm:hidden">
                                                                <Lock className="w-3 h-3 text-green-400" />
                                                                <span className="text-xs text-white/40">
                                                                    {new Date(doc.created_at).toLocaleDateString("en-IN")}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 hidden sm:table-cell">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-white/80">
                                                            {new Date(doc.created_at).toLocaleDateString("en-IN", {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                        <span className="text-xs text-white/40">
                                                            {new Date(doc.created_at).toLocaleTimeString("en-IN", {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    <div className="flex flex-col items-end gap-1">
                                                        <span className="text-white/80 font-medium">
                                                            {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                                                        </span>
                                                        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-400 rounded text-xs border border-green-500/20">
                                                            <Lock className="w-3 h-3" />
                                                            Encrypted
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Footer */}
                <div className="mt-6 sm:mt-8 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-[#06f9c8] flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs sm:text-sm text-white/80 mb-1 font-medium">
                                Your vault is protected with end-to-end encryption
                            </p>
                            <p className="text-xs text-white/50">
                                Files are encrypted on your device before upload. Your encryption keys are session-based and never stored on our servers.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}