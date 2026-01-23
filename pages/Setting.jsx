import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../supabase";
import { Shield, Lock, User, Mail, Key, LogOut, Trash2, AlertTriangle, CheckCircle, Settings, Clock, Database } from 'lucide-react';

const SettingsPage = () => {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalAction, setModalAction] = useState(null);
    const [isEncryptionActive, setIsEncryptionActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
        };

        getUser();

        // Check encryption status
        const encryptionKey = sessionStorage.getItem('vaultEncryptionKey');
        setIsEncryptionActive(!!encryptionKey);
    }, []);

    const handleLogout = async () => {
        setModalType("warning");
        setModalTitle("Confirm Logout");
        setModalMessage("Are you sure you want to logout? Your encryption keys will be cleared from this session.");
        setModalAction(() => async () => {
            await supabase.auth.signOut();
            navigate("/");
        });
        setShowModal(true);
    };

    const handleResetKey = () => {
        setModalType("danger");
        setModalTitle("Reset Encryption Key");
        setModalMessage("All existing files will become permanently unreadable. This action cannot be undone. This feature is intentionally restricted for safety.");
        setModalAction(null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalTitle("");
        setModalMessage("");
        setModalAction(null);
    };

    const executeAction = () => {
        if (modalAction) {
            modalAction();
        }
        closeModal();
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-[#0E1117] text-white px-4 sm:px-6 py-6 sm:py-10">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">

                {/* Header */}
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                    <div className="w-12 h-12 rounded-full bg-[#06f9c8]/10 flex items-center justify-center">
                        <Settings className="w-6 h-6 text-[#06f9c8]" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black">Settings</h1>
                        <p className="text-white/60 text-sm sm:text-base">
                            Manage your account and encryption preferences
                        </p>
                    </div>
                </div>

                {/* Account Info */}
                <div className="rounded-xl bg-[#1A1D21] p-4 sm:p-6 border border-white/10 hover:border-[#06f9c8]/20 transition-all duration-300 space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#06f9c8]/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-[#06f9c8]" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold">Account Information</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2 text-white/80">
                                <Mail className="w-4 h-4 text-[#06f9c8]" />
                                <span className="text-sm font-medium">Email</span>
                            </div>
                            <span className="font-mono text-sm text-white break-all">
                                {user?.email || "Loading..."}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2 text-white/80">
                                <Key className="w-4 h-4 text-[#06f9c8]" />
                                <span className="text-sm font-medium">User ID</span>
                            </div>
                            <span className="font-mono text-xs sm:text-sm text-white/80 break-all">
                                {user?.id || "Loading..."}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2 text-white/80">
                                <Clock className="w-4 h-4 text-[#06f9c8]" />
                                <span className="text-sm font-medium">Account Created</span>
                            </div>
                            <span className="text-sm text-white/80">
                                {formatDate(user?.created_at)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Encryption Status */}
                <div className="rounded-xl bg-[#1A1D21] p-4 sm:p-6 border border-white/10 hover:border-[#06f9c8]/20 transition-all duration-300 space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#06f9c8]/10 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-[#06f9c8]" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold">Encryption</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 p-4 rounded-lg bg-[#06f9c8]/5 border border-[#06f9c8]/20">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <Lock className="w-4 h-4 text-[#06f9c8]" />
                                    <span className="text-white/90 font-medium text-sm">Client-side encryption</span>
                                </div>
                                <p className="text-xs sm:text-sm text-white/60">
                                    Files are encrypted in your browser using AES-256-GCM before upload.
                                </p>
                            </div>
                            {isEncryptionActive ? (
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="text-green-400 font-semibold text-xs sm:text-sm">Active</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                    <span className="text-yellow-400 font-semibold text-xs sm:text-sm">Inactive</span>
                                </div>
                            )}
                        </div>

                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="space-y-2 text-xs sm:text-sm text-white/60">
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span>Zero-knowledge architecture - we never see your data</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span>Session-based keys that never touch our servers</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span>Military-grade AES-256-GCM encryption</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleResetKey}
                            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 hover:scale-105 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 border border-white/10"
                        >
                            <Key className="w-4 h-4" />
                            Reset Encryption Key
                        </button>
                    </div>
                </div>

                {/* Security & Actions */}
                <div className="rounded-xl bg-[#1A1D21] p-4 sm:p-6 border border-white/10 hover:border-[#06f9c8]/20 transition-all duration-300 space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#06f9c8]/10 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-[#06f9c8]" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold">Security</h2>
                    </div>

                    <div className="space-y-3">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <p className="text-xs sm:text-sm text-white/60 mb-3">
                                Logging out will clear your encryption keys from this session. Make sure all your files are uploaded before logging out.
                            </p>
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-3 rounded-lg bg-[#06f9c8] text-[#0E1117] font-bold hover:brightness-110 hover:scale-105 hover:shadow-lg hover:shadow-[#06f9c8]/30 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Storage Info */}
                <div className="rounded-xl bg-[#1A1D21] p-4 sm:p-6 border border-white/10 hover:border-[#06f9c8]/20 transition-all duration-300 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#06f9c8]/10 flex items-center justify-center">
                            <Database className="w-5 h-5 text-[#06f9c8]" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold">Storage & Data</h2>
                    </div>

                    <div className="space-y-3">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-white/80">Storage Quota</span>
                                <span className="text-sm font-semibold text-[#06f9c8]">100 MB</span>
                            </div>
                            <p className="text-xs text-white/50">
                                All your encrypted files count towards this limit.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 sm:p-6 space-y-4 hover:border-red-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-red-400">Danger Zone</h2>
                    </div>

                    <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                        <p className="text-xs sm:text-sm text-red-300/80 mb-4">
                            Deleting your account will permanently remove all encrypted files and cannot be undone. This action is irreversible.
                        </p>
                        <button
                            disabled
                            className="w-full px-4 py-3 rounded-lg bg-red-500/20 text-red-300 cursor-not-allowed flex items-center justify-center gap-2 border border-red-500/30"
                        >
                            <Trash2 className="w-5 h-5" />
                            Delete Account (Coming Soon)
                        </button>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-[#06f9c8] flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs sm:text-sm text-white/80 mb-1 font-medium">
                                Your privacy is our priority
                            </p>
                            <p className="text-xs text-white/50">
                                We use end-to-end encryption to ensure that your data remains private and secure. Your encryption keys are never stored on our servers.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1A1D21] rounded-xl border border-white/10 max-w-md w-full p-6 sm:p-8 animate-fadeIn shadow-2xl">
                        <div className="flex flex-col items-center text-center gap-4">
                            {modalType === "danger" && (
                                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                                    <AlertTriangle className="w-8 h-8 text-red-400" />
                                </div>
                            )}
                            {modalType === "warning" && (
                                <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                    <AlertTriangle className="w-8 h-8 text-yellow-400" />
                                </div>
                            )}

                            <div>
                                <h3 className="text-white text-xl font-bold mb-2">
                                    {modalTitle}
                                </h3>
                                <p className="text-white/60 text-sm">
                                    {modalMessage}
                                </p>
                            </div>

                            <div className="flex gap-3 w-full mt-2">
                                <button
                                    onClick={closeModal}
                                    className="flex-1 h-12 px-6 bg-white/10 text-white rounded-lg font-bold hover:bg-white/20 transition-all duration-200 border border-white/10"
                                >
                                    Cancel
                                </button>
                                {modalAction && (
                                    <button
                                        onClick={executeAction}
                                        className="flex-1 h-12 px-6 bg-[#06f9c8] text-[#0E1117] rounded-lg font-bold hover:brightness-110 hover:scale-105 transition-all duration-200"
                                    >
                                        Confirm
                                    </button>
                                )}
                                {!modalAction && (
                                    <button
                                        onClick={closeModal}
                                        className="flex-1 h-12 px-6 bg-[#06f9c8] text-[#0E1117] rounded-lg font-bold hover:brightness-110 hover:scale-105 transition-all duration-200"
                                    >
                                        Got it
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default SettingsPage;