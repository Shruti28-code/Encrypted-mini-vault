import React, { useState } from "react";
import { supabase } from "../supabase"; // <-- import your client
import { encryptFile } from "../src/utils/crypto";

import { useEncryption } from "../src/context/EncryptionContext";



const Upload = () => {
    const { encryptionKey } = useEncryption();

    if (!encryptionKey) {
        throw new Error("Encryption key not ready");
    }

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        // allow only supported types
        const allowed = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
        if (!allowed.includes(selected.type)) {
            setMessage("Only PDF and Image files are allowed.");
            return;
        }

        setFile(selected);
        setMessage("");
    };


    const handleUpload = async () => {
        if (!file) return;

        try {
            setUploading(true);

            // 1️⃣ Get logged-in user
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

            // 2️⃣ Generate unique path
            const fileId = crypto.randomUUID();
            const filePath = `${user.id}/${fileId}/${file.name}`;

            // 3️⃣ 🔐 Encrypt file BEFORE upload
            const { encryptedBlob, iv } = await encryptFile(file, encryptionKey);

            // 4️⃣ Upload encrypted file
            const { error: uploadError } = await supabase.storage
                .from("encrypted-vault")
                .upload(filePath, encryptedBlob, {
                    upsert: false,
                    contentType: "application/octet-stream",
                });

            if (uploadError) {
                throw uploadError;
            }

            // 5️⃣ Store metadata + IV
            const { error: dbError } = await supabase
                .from("documents")
                .insert({
                    user_id: user.id,
                    file_name: file.name,
                    file_path: filePath,
                    file_size: file.size,
                    file_type: file.type,
                    iv: iv, // 🔐 critical
                });

            if (dbError) {
                throw dbError;
            }

            alert("Encrypted file uploaded successfully ✅");
            console.log("Original file size:", file.size);
            console.log("Encrypted blob size:", encryptedBlob.size);
            console.log("IV:", iv);
            console.log("Key:", encryptionKey);

        } catch (error) {
            console.error("Upload failed:", error.message);
            alert(error.message);
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    return (
        <div className="font-display bg-background-light dark:bg-background-dark min-h-screen w-full flex flex-col items-center">
            {/* Navbar */}
            <header className="flex w-full max-w-5xl items-center justify-between border-b border-white/10 px-4 py-4 md:px-10">
                <div className="flex items-center gap-3 text-white">
                    <div className="size-6 text-primary">
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
            <main className="flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-10 md:px-10">
                <div className="mx-auto w-full max-w-2xl rounded-xl bg-[#1A1D23] p-6 md:p-8">
                    <h1 className="text-white text-3xl font-black">Securely Upload a Document</h1>
                    <p className="text-white/60">Upload PDF or Image files to your encrypted vault.</p>

                    <div className="mt-8 space-y-6">
                        {/* Dropzone */}
                        <label className="flex flex-col items-center gap-4 border-2 border-dashed border-white/20 rounded-lg px-6 py-12 hover:border-primary/50 hover:bg-primary/5 cursor-pointer">
                            <span className="material-symbols-outlined text-5xl text-white/60">upload_file</span>
                            <p className="text-white font-semibold">Drag & drop or click to choose</p>

                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={handleFileChange}
                            />
                        </label>

                        {/* File Preview */}
                        {file && (
                            <div className="rounded-lg bg-white/5 p-4 flex justify-between items-center">
                                <div>
                                    <p className="text-white">{file.name}</p>
                                    <p className="text-white/60 text-sm">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>

                                <button
                                    className="text-white/60 hover:text-white"
                                    onClick={() => setFile(null)}
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {/* Upload Button */}
                        <button
                            onClick={handleUpload}
                            disabled={!file || uploading}
                            className="h-10 px-5 bg-primary text-background-dark rounded-lg font-bold hover:opacity-90 disabled:opacity-40"
                        >
                            {uploading ? "Uploading..." : "Upload to Vault"}
                        </button>

                        {/* Progress */}
                        {uploading && (
                            <div className="bg-white/5 p-4 rounded-lg">
                                <p className="text-white mb-2">Uploading… {progress}%</p>
                                <div className="bg-black/30 rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Status Message */}
                        {message && <p className="text-primary">{message}</p>}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Upload;

