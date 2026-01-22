import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
// make sure Header.jsx exists

export default function Dashboard() {
    const [name, setName] = useState("");

    useEffect(() => {
        const loadProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) return;

            const { data, error } = await supabase
                .from("profiles")
                .select("full_name")
                .eq("id", user.id)
                .single();

            if (!error && data) {
                setName(data.full_name);
            }
        };

        loadProfile();
    }, []);
    const fetchRecentDocuments = async () => {
        const { data, error } = await supabase
            .from("documents")
            .select("id, file_name, file_size, created_at")
            .order("created_at", { ascending: false })
            .limit(3);

        if (error) {
            console.error("Error fetching documents:", error);
            return [];
        }

        return data;
    };
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        fetchRecentDocuments().then(setDocuments);
    }, []);


    return (
        <div className="flex flex-col h-screen text-gray-300 bg-[#0E1117] font-display">
            <main className="flex-1 p-10 overflow-y-auto">
                {/* Header Component */}


                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-[#1A1D21] p-6 rounded-xl border border-white/10">
                        <p className="text-white/80 text-base">Total Documents</p>
                        <p className="text-white text-4xl font-bold">1,234</p>
                    </div>

                    <div className="bg-[#1A1D21] p-6 rounded-xl border border-white/10">
                        <p className="text-white/80 text-base">Storage Used</p>
                        <p className="text-white text-4xl font-bold">2.5 GB / 10 GB</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-[#1A1D21] p-6 rounded-xl border border-white/10 mb-8">
                    <div className="flex justify-between mb-3">
                        <p className="text-white/80">Storage Usage</p>
                        <p className="text-white font-bold">25%</p>
                    </div>
                    <div className="w-full h-2.5 bg-white/10 rounded-full">
                        <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: "25%" }}
                        ></div>
                    </div>
                </div>

                {/* Recent Documents */}
                <div className="bg-[#1A1D21] p-6 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">Recent Documents</h3>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg font-semibold hover:bg-primary/80">
                            <span className="material-symbols-outlined">add</span>
                            Upload New
                        </button>
                    </div>

                    <table className="w-full text-left text-sm text-gray-300">
                        <thead className="text-xs text-gray-400 uppercase border-b border-white/10">
                            <tr>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Date Modified</th>
                                <th className="py-3 px-4">Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((doc) => (
                                <tr
                                    key={doc.id}
                                    className="border-b border-white/10 hover:bg-white/5"
                                >
                                    <td className="py-4 px-4 flex items-center gap-3 text-white">
                                        <span className="material-symbols-outlined text-primary">

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
                                </tr>
                            ))}

                            {documents.length === 0 && (
                                <tr className="hover:bg-white/5">
                                    <td
                                        colSpan="3"
                                        className="py-4 px-4 text-center text-white/60"
                                    >
                                        No documents uploaded yet
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </main>
        </div>
    );
}
