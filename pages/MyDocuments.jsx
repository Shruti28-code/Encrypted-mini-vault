import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { decryptFile } from "../src/utils/crypto";
import { useEncryption } from "../src/context/useEncryption";
import { Download, Trash2, FileText, AlertCircle, CheckCircle, X } from "lucide-react";

export default function MyDocuments() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ show: false, doc: null });
    const [notification, setNotification] = useState({ show: false, type: "", message: "" });

    const { encryptionKey } = useEncryption();

    // Show notification
    const showNotification = (type, message) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification({ show: false, type: "", message: "" });
        }, 3000);
    };

    // Fetch all user documents
    const fetchDocuments = async () => {
        setLoading(true);

        const {
            data: { user },
        } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from("documents")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Fetch error:", error);
            showNotification("error", "Failed to fetch documents");
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
            showNotification("error", "Encryption key not found. Cannot decrypt file.");
            return;
        }

        try {
            const { data, error } = await supabase.storage
                .from("encrypted-vault")
                .download(doc.file_path);

            if (error) throw error;

            const decryptedBlob = await decryptFile(
                data,
                encryptionKey,
                doc.iv,
                doc.file_type
            );

            const url = URL.createObjectURL(decryptedBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = doc.file_name;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);

            showNotification("success", "File downloaded successfully!");
        } catch (err) {
            console.error("Download failed:", err);
            showNotification("error", "Failed to download file.");
        }
    };

    // Delete file
    const handleDelete = async (doc, setDocuments, setRecentDocuments) => {
        const { error: storageError } = await supabase.storage
            .from("encrypted-vault")
            .remove([doc.file_path]);

        if (storageError) {
            console.error("Storage delete error:", storageError);
            showNotification("error", "Failed to delete file from storage");
            return;
        }

        const { error: dbError } = await supabase
            .from("documents")
            .delete()
            .eq("id", doc.id);

        if (dbError) {
            console.error("DB delete error:", dbError);
            showNotification("error", "Failed to delete file from database");
            return;
        }

        setDocuments((prev) => prev.filter((item) => item.id !== doc.id));
        setRecentDocuments?.((prev) => prev.filter((item) => item.id !== doc.id));

        setDeleteModal({ show: false, doc: null });
        showNotification("success", "File deleted successfully");
    };

    return (
        <div className="min-h-screen bg-background-dark text-white px-4 md:px-6 py-6 md:py-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-black mb-2">My Documents</h1>
                    <p className="text-white/60 text-sm md:text-base">
                        Manage, download, or permanently delete your files
                    </p>
                </div>

                {/* Table */}
                <div className="rounded-xl bg-[#1A1D23] overflow-hidden border border-white/10 shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-300">
                            <thead className="text-xs text-gray-400 uppercase border-b border-white/10 bg-[#0f1318]">
                                <tr>
                                    <th className="py-4 px-4 md:px-6 font-semibold">Name</th>
                                    <th className="py-4 px-4 md:px-6 font-semibold hidden sm:table-cell">Uploaded</th>
                                    <th className="py-4 px-4 md:px-6 font-semibold hidden md:table-cell">Size</th>
                                    <th className="py-4 px-4 md:px-6 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan="4" className="py-12 px-4 text-center text-white/60">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-10 h-10 border-3 border-[#4ade80] border-t-transparent rounded-full animate-spin"></div>
                                                <span className="text-sm">Loading documents…</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}

                                {!loading && documents.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="py-12 px-4 text-center text-white/60">
                                            <div className="flex flex-col items-center gap-2">
                                                <FileText className="text-white/30" size={56} />
                                                <p className="text-base font-medium">No documents found</p>
                                                <p className="text-xs text-white/40">Upload your first document to get started</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}

                                {documents.map((doc) => (
                                    <tr
                                        key={doc.id}
                                        className="border-b border-white/10 hover:bg-white/5 transition-all duration-200"
                                    >
                                        <td className="py-4 px-4 md:px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-[#4ade80]/10 rounded-lg flex-shrink-0">
                                                    <FileText className="text-[#4ade80]" size={20} />
                                                </div>
                                                <span className="font-medium text-white truncate">{doc.file_name}</span>
                                            </div>
                                        </td>

                                        <td className="py-4 px-4 md:px-6 text-white/70 text-xs md:text-sm hidden sm:table-cell">
                                            {new Date(doc.created_at).toLocaleString("en-IN", {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            })}
                                        </td>

                                        <td className="py-4 px-4 md:px-6 text-white/70 text-xs md:text-sm hidden md:table-cell">
                                            {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                                        </td>

                                        <td className="py-4 px-4 md:px-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleDownload(doc)}
                                                    className="p-2 text-[#4ade80] hover:bg-[#4ade80]/10 rounded-lg transition-all duration-200 hover:scale-110"
                                                    title="Download"
                                                >
                                                    <Download size={18} />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteModal({ show: true, doc })}
                                                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200 hover:scale-110"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
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

            {/* Delete Confirmation Modal */}
            {deleteModal.show && (
                <>
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-fade-in"
                        onClick={() => setDeleteModal({ show: false, doc: null })}
                    ></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-scale-in">
                        <div className="bg-[#1A1D23] rounded-xl max-w-md w-full border border-white/10 shadow-2xl">
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-red-400/10 rounded-full">
                                        <AlertCircle className="text-red-400" size={24} />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">Delete Document</h2>
                                </div>

                                <p className="text-white/70 mb-2 text-sm">
                                    Are you sure you want to delete this document?
                                </p>
                                <p className="text-white font-medium mb-6 bg-white/5 p-3 rounded-lg break-all text-sm">
                                    {deleteModal.doc?.file_name}
                                </p>

                                <p className="text-sm text-red-400/80 mb-6">
                                    ⚠️ This action cannot be undone. The file will be permanently deleted.
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setDeleteModal({ show: false, doc: null })}
                                        className="flex-1 bg-white/5 text-white py-2.5 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleDelete(deleteModal.doc, setDocuments, null)}
                                        className="flex-1 bg-red-500 text-white py-2.5 px-4 rounded-lg hover:bg-red-600 transition-all duration-200 font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Notification Toast */}
            {notification.show && (
                <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
                    <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl border min-w-[280px] ${notification.type === "success"
                            ? "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]"
                            : notification.type === "error"
                                ? "bg-red-400/10 border-red-400/30 text-red-400"
                                : "bg-blue-400/10 border-blue-400/30 text-blue-400"
                            }`}
                    >
                        {notification.type === "success" && <CheckCircle size={20} className="flex-shrink-0" />}
                        {notification.type === "error" && <AlertCircle size={20} className="flex-shrink-0" />}
                        {notification.type === "info" && <AlertCircle size={20} className="flex-shrink-0" />}
                        <span className="text-sm font-medium flex-1">{notification.message}</span>
                        <button
                            onClick={() => setNotification({ show: false, type: "", message: "" })}
                            className="hover:opacity-70 transition-opacity flex-shrink-0"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-in {
                    from {
                        transform: scale(0.9);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                @keyframes slide-up {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}