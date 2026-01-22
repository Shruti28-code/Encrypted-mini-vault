import React, { useState, useEffect } from "react";
import { supabase } from "../supabase"; // <-- import your client
import { decryptFile } from "../src/utils/crypto";

import { useEncryption } from "../src/context/EncryptionContext";

export default function MyDocuments() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Get encryption key from context
    const { encryptionKey } = useEncryption();

    // Fetch all user documents
    const fetchDocuments = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from("documents")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Fetch error:", error);
        } else {
            setDocuments(data);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    // Download file
    const handleDownload = async (doc) => {
        if (!encryptionKey) {
            alert("Encryption key not found. Cannot decrypt file.");
            return;
        }

        try {
            // 1️⃣ Download encrypted file
            const { data, error } = await supabase.storage
                .from("encrypted-vault")
                .download(doc.file_path);

            if (error) throw error;

            // 2️⃣ Decrypt
            const decryptedBlob = await decryptFile(
                data,
                encryptionKey,
                doc.iv
            );

            // 3️⃣ Trigger browser download
            const url = URL.createObjectURL(decryptedBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = doc.file_name;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download failed:", err);
            alert("Failed to download file.");
        }
    };

    // Delete file
    const handleDelete = async (
        doc,
        setDocuments,
        setRecentDocuments
    ) => {
        // 1️⃣ Delete from storage
        const { error: storageError } = await supabase.storage
            .from("encrypted-vault")
            .remove([doc.file_path]);

        if (storageError) {
            console.error("Storage delete error:", storageError);
            return;
        }

        // 2️⃣ Delete from database
        const { error: dbError } = await supabase
            .from("documents")
            .delete()
            .eq("id", doc.id);

        if (dbError) {
            console.error("DB delete error:", dbError);
            return;
        }

        // 3️⃣ Remove from MyDocuments UI
        setDocuments((prev) =>
            prev.filter((item) => item.id !== doc.id)
        );

        // 4️⃣ Remove from Dashboard recent files
        setRecentDocuments?.((prev) =>
            prev.filter((item) => item.id !== doc.id)
        );

        alert("File deleted successfully");
    };


    return (
        <div className="min-h-screen bg-background-dark text-white px-6 py-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black">My Documents</h1>
                    <p className="text-white/60">
                        Manage, download, or permanently delete your files
                    </p>
                </div>

                {/* Table */}
                <div className="rounded-xl bg-[#1A1D23] overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-300">
                        <thead className="text-xs text-gray-400 uppercase border-b border-white/10">
                            <tr>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Uploaded</th>
                                <th className="py-3 px-4">Size</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan="4" className="py-6 px-4 text-center text-white/60">
                                        Loading documents…
                                    </td>
                                </tr>
                            )}

                            {!loading && documents.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="py-6 px-4 text-center text-white/60">
                                        No documents found
                                    </td>
                                </tr>
                            )}

                            {documents.map((doc) => (
                                <tr
                                    key={doc.id}
                                    className="border-b border-white/10 hover:bg-white/5"
                                >
                                    <td className="py-4 px-4 flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">
                                            description
                                        </span>
                                        {doc.file_name}
                                    </td>

                                    <td className="py-4 px-4">
                                        {new Date(doc.created_at).toLocaleString("en-IN", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </td>

                                    <td className="py-4 px-4">
                                        {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                                    </td>

                                    <td className="py-4 px-4 text-right">
                                        <div className="flex justify-end gap-4">
                                            <button
                                                onClick={() => handleDownload(doc)}
                                                className="text-primary hover:underline"
                                            >
                                                Download
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(doc, setDocuments, null)
                                                }
                                                className="text-red-400 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
