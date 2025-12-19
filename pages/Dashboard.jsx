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
                            <tr className="border-b border-white/10 hover:bg-white/5">
                                <td className="py-4 px-4 flex items-center gap-3 text-white">
                                    <span className="material-symbols-outlined text-primary">
                                        description
                                    </span>
                                    Client_Contract_v3.pdf
                                </td>
                                <td className="py-4 px-4">Today, 11:45 AM</td>
                                <td className="py-4 px-4">2.1 MB</td>
                            </tr>

                            <tr className="border-b border-white/10 hover:bg-white/5">
                                <td className="py-4 px-4 flex items-center gap-3 text-white">
                                    <span className="material-symbols-outlined text-primary">
                                        description
                                    </span>
                                    Project_Proposal_Final.docx
                                </td>
                                <td className="py-4 px-4">Yesterday, 3:30 PM</td>
                                <td className="py-4 px-4">5.7 MB</td>
                            </tr>

                            <tr className="hover:bg-white/5">
                                <td className="py-4 px-4 flex items-center gap-3 text-white">
                                    <span className="material-symbols-outlined text-primary">
                                        description
                                    </span>
                                    Invoice_Q4_2023.xlsx
                                </td>
                                <td className="py-4 px-4">October 28, 2023</td>
                                <td className="py-4 px-4">780 KB</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
