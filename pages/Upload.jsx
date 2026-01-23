import React, { useState } from "react";
import { supabase } from "../supabase";
import { encryptFile } from "../src/utils/crypto";
import { useEncryption } from "../src/context/useEncryption";
import { Shield, Upload, File, X, Lock, CheckCircle, AlertCircle, Loader, FileText, Image } from 'lucide-react';

const UploadPage = () => {
    const { encryptionKey } = useEncryption();

    if (!encryptionKey) {
        throw new Error("Encryption key not ready");
    }

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [uploadStage, setUploadStage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        const allowed = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
        if (!allowed.includes(selected.type)) {
            setMessage("Only PDF and Image files are allowed.");
            setModalType("error");
            setModalMessage("Only PDF and Image files are allowed.");
            setShowModal(true);
            return;
        }

        setFile(selected);
        setMessage("");
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (!droppedFile) return;

        const allowed = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
        if (!allowed.includes(droppedFile.type)) {
            setModalType("error");
            setModalMessage("Only PDF and Image files are allowed.");
            setShowModal(true);
            return;
        }

        setFile(droppedFile);
        setMessage("");
    };

    const handleUpload = async () => {
        if (!file) return;

        try {
            setUploading(true);
            setProgress(0);

            setUploadStage("Authenticating...");
            setProgress(10);
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                throw new Error("User not authenticated");
            }

            if (!encryptionKey) {
                throw new Error("Encryption key not initialized");
            }

            console.log("Logged in user id:", user.id);

            setUploadStage("Preparing file...");
            setProgress(25);
            const fileId = crypto.randomUUID();
            const filePath = `${user.id}/${fileId}/${file.name}`;

            setUploadStage("Encrypting file...");
            setProgress(40);
            const { encryptedBlob, iv } = await encryptFile(file, encryptionKey);

            setUploadStage("Uploading securely...");
            setProgress(60);
            const { error: uploadError } = await supabase.storage
                .from("encrypted-vault")
                .upload(filePath, encryptedBlob, {
                    upsert: false,
                    contentType: "application/octet-stream",
                });

            if (uploadError) {
                throw uploadError;
            }

            setUploadStage("Finalizing...");
            setProgress(85);
            const { error: dbError } = await supabase
                .from("documents")
                .insert({
                    user_id: user.id,
                    file_name: file.name,
                    file_path: filePath,
                    file_size: file.size,
                    file_type: file.type,
                    iv: iv,
                });

            if (dbError) {
                throw dbError;
            }

            setProgress(100);
            setUploadStage("Complete!");

            setModalType("success");
            setModalMessage(`${file.name} has been encrypted and uploaded successfully!`);
            setShowModal(true);

            console.log("Original file size:", file.size);
            console.log("Encrypted blob size:", encryptedBlob.size);
            console.log("IV:", iv);
            console.log("Key:", encryptionKey);

            setTimeout(() => {
                setFile(null);
                setUploadStage("");
            }, 2000);

        } catch (error) {
            console.error("Upload failed:", error.message);
            setModalType("error");
            setModalMessage(error.message || "Upload failed. Please try again.");
            setShowModal(true);
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    const getFileIcon = () => {
        if (!file) return <FileText className="w-12 h-12" />;

        if (file.type.startsWith('image/')) {
            return <Image className="w-12 h-12" />;
        }
        return <FileText className="w-12 h-12" />;
    };

    const closeModal = () => {
        setShowModal(false);
        setModalMessage("");
        setModalType("");
    };

    return (
        <div className="font-display bg-[#0E1117] min-h-screen w-full flex flex-col items-center">
            {/* Navbar */}
            <header className="flex w-full max-w-5xl items-center justify-between border-b border-white/10 px-4 py-4 md:px-10">
                <div className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 text-[#06f9c8] transition-transform hover:scale-110 hover:rotate-12 duration-300">
                        <svg fill="none" viewBox="0 0 48 48">
                            <path
                                fill="currentColor"
                                d="M39.4 21.6c.9-.2 1.2-.1 1.3 0 .1.1.2.4.1 1-.1.7-.4 1.7-1 2.9-1.2 2.4-3.4 5.4-6.3 8.3-2.9 2.9-5.9 5.1-8.3 6.3-1.2.6-2.2.9-2.9 1-.6.1-.9 0-1-.1-.1-.1-.2-.4 0-1 .2-.9.8-2.3 1.9-4 .9-1.4 2.2-3 3.8-4.6 1.6-1.6 3.2-2.9 4.6-3.8 1.7-1.1 3.1-1.7 4-1.9ZM4.4 29.2 18.8 43.6c1.1 1.1 2.6 1.3 3.9 1.2 1.3-.1 2.7-.6 4.2-1.3 3-1.4 6.4-3.8 9.5-6.9 3.1-3.1 5.5-6.5 6.9-9.5.7-1.5 1.2-2.9 1.3-4.2.1-1.3-.1-2.8-1.2-3.9L29.2 4.4c-1.3-1.3-3.2-1.3-4.9-1-1.7.4-3.6 1.2-5.6 2.4-2.3 1.5-4.9 3.6-7.1 5.8-2.3 2.3-4.3 4.9-5.8 7.1-1.2 2-2 3.9-2.4 5.6-.3 1.7-.3 3.6 1 4.9Z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold">Encrypted Mini Vault</h2>
                </div>
            </header>

            {/* Main */}
            <main className="flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-6 sm:py-10 md:px-10">
                <div className="mx-auto w-full max-w-2xl">
                    {/* Header Section */}
                    <div className="mb-6 sm:mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-[#06f9c8]/10 flex items-center justify-center">
                                <Shield className="w-6 h-6 text-[#06f9c8]" />
                            </div>
                            <h1 className="text-white text-2xl sm:text-3xl font-black">Secure Upload</h1>
                        </div>
                        <p className="text-white/60 text-sm sm:text-base">Upload PDF or Image files to your encrypted vault. Files are encrypted on your device before upload.</p>
                    </div>

                    {/* Upload Card */}
                    <div className="rounded-xl bg-[#1A1D21] p-4 sm:p-6 md:p-8 border border-white/10 hover:border-[#06f9c8]/20 transition-all duration-300">
                        <div className="space-y-6">
                            {/* Dropzone */}
                            <label
                                className={`flex flex-col items-center gap-4 border-2 border-dashed rounded-lg px-4 sm:px-6 py-8 sm:py-12 cursor-pointer transition-all duration-300 ${isDragging
                                    ? 'border-[#06f9c8] bg-[#06f9c8]/10'
                                    : 'border-white/20 hover:border-[#06f9c8]/50 hover:bg-[#06f9c8]/5'
                                    }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className="w-16 h-16 rounded-full bg-[#06f9c8]/10 flex items-center justify-center">
                                    <Upload className="w-8 h-8 text-[#06f9c8]" />
                                </div>
                                <div className="text-center">
                                    <p className="text-white font-semibold text-sm sm:text-base mb-1">
                                        Drag & drop or click to choose
                                    </p>
                                    <p className="text-white/40 text-xs sm:text-sm">
                                        PDF, PNG, JPG, JPEG (Max 100MB)
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".pdf,.png,.jpg,.jpeg"
                                    onChange={handleFileChange}
                                />
                            </label>

                            {/* File Preview */}
                            {file && (
                                <div className="rounded-lg bg-white/5 p-4 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <div className="w-10 h-10 rounded-lg bg-[#06f9c8]/10 flex items-center justify-center flex-shrink-0 text-[#06f9c8]">
                                                {getFileIcon()}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-white font-medium truncate text-sm sm:text-base">{file.name}</p>
                                                <p className="text-white/60 text-xs sm:text-sm">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all flex-shrink-0"
                                            onClick={() => setFile(null)}
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Encryption Info */}
                            {file && !uploading && (
                                <div className="p-4 rounded-lg bg-[#06f9c8]/10 border border-[#06f9c8]/20">
                                    <div className="flex items-start gap-3">
                                        <Lock className="w-5 h-5 text-[#06f9c8] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-white/90 text-sm font-medium mb-1">
                                                Ready to encrypt
                                            </p>
                                            <p className="text-white/60 text-xs">
                                                Your file will be encrypted using AES-256-GCM before upload. Only you can decrypt it.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Upload Progress */}
                            {uploading && (
                                <div className="bg-white/5 p-4 sm:p-5 rounded-lg border border-white/10 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Loader className="w-5 h-5 text-[#06f9c8] animate-spin" />
                                        <div className="flex-1">
                                            <p className="text-white font-medium text-sm sm:text-base">{uploadStage}</p>
                                            <p className="text-white/60 text-xs sm:text-sm">{progress}% complete</p>
                                        </div>
                                    </div>
                                    <div className="bg-black/30 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-[#06f9c8] to-blue-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>

                                    {/* Upload Steps */}
                                    <div className="space-y-2 pt-2">
                                        <div className={`flex items-center gap-2 text-xs sm:text-sm ${progress >= 10 ? 'text-white/80' : 'text-white/40'}`}>
                                            <CheckCircle className={`w-4 h-4 ${progress >= 10 ? 'text-green-400' : 'text-white/40'}`} />
                                            <span>Authentication verified</span>
                                        </div>
                                        <div className={`flex items-center gap-2 text-xs sm:text-sm ${progress >= 40 ? 'text-white/80' : 'text-white/40'}`}>
                                            <CheckCircle className={`w-4 h-4 ${progress >= 40 ? 'text-green-400' : 'text-white/40'}`} />
                                            <span>File encrypted with AES-256-GCM</span>
                                        </div>
                                        <div className={`flex items-center gap-2 text-xs sm:text-sm ${progress >= 60 ? 'text-white/80' : 'text-white/40'}`}>
                                            <CheckCircle className={`w-4 h-4 ${progress >= 60 ? 'text-green-400' : 'text-white/40'}`} />
                                            <span>Uploading to secure storage</span>
                                        </div>
                                        <div className={`flex items-center gap-2 text-xs sm:text-sm ${progress >= 100 ? 'text-white/80' : 'text-white/40'}`}>
                                            <CheckCircle className={`w-4 h-4 ${progress >= 100 ? 'text-green-400' : 'text-white/40'}`} />
                                            <span>Metadata saved</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Upload Button */}
                            <button
                                onClick={handleUpload}
                                disabled={!file || uploading}
                                className="w-full h-12 px-5 bg-[#06f9c8] text-[#0E1117] rounded-lg font-bold hover:brightness-110 hover:scale-105 hover:shadow-lg hover:shadow-[#06f9c8]/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <Lock className="w-5 h-5" />
                                {uploading ? "Encrypting & Uploading..." : "Encrypt & Upload to Vault"}
                            </button>

                            {/* Status Message */}
                            {message && (
                                <p className="text-[#06f9c8] text-sm text-center">{message}</p>
                            )}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-[#06f9c8] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-white/80 text-xs sm:text-sm mb-1 font-medium">
                                    Your files are protected
                                </p>
                                <p className="text-white/50 text-xs">
                                    All files are encrypted on your device using AES-256-GCM before they leave your computer. Your encryption keys never touch our servers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Success/Error Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1A1D21] rounded-xl border border-white/10 max-w-md w-full p-6 sm:p-8 animate-fadeIn shadow-2xl">
                        <div className="flex flex-col items-center text-center gap-4">
                            {modalType === "success" ? (
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-green-400" />
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                                    <AlertCircle className="w-8 h-8 text-red-400" />
                                </div>
                            )}

                            <div>
                                <h3 className="text-white text-xl font-bold mb-2">
                                    {modalType === "success" ? "Upload Successful!" : "Upload Failed"}
                                </h3>
                                <p className="text-white/60 text-sm">
                                    {modalMessage}
                                </p>
                            </div>

                            <button
                                onClick={closeModal}
                                className="w-full h-12 px-6 bg-[#06f9c8] text-[#0E1117] rounded-lg font-bold hover:brightness-110 hover:scale-105 transition-all duration-200"
                            >
                                Continue
                            </button>
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

export default UploadPage;