import React from "react";

export default function Dashboard() {
    return (
        <div className="flex h-screen text-gray-300 bg-[#0E1117] font-display">

            {/* Sidebar */}
            <aside className="flex w-64 flex-col bg-[#0f231f] p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 p-2">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDDZRro7zlMnydPGl2TTNgDLCkx_Bvnyg6qGg-UIXkat_PaeUCoG7oQK33mCMte0302Vj2qM3U5G9llD7jIKvic8XAhQ0lMUiowvbvzZg-S0pGRqZwvtT0T7IAqCY_kNPg8cxugRYg5p8KGOZWOUt1spUrlNUJScLGljFZcNkuCFeymn3NpUtvOpiO4G1r-ot6UU93q6-KDora3V662wVDDV4TqenP56SBRv4abNsOuVRc_QpblUWNFmDaR1N9lFrGWGlGizDD7vA")',
                            }}
                        ></div>
                        <h1 className="text-white text-base font-medium">
                            Encrypted Mini Vault
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-2">
                        <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/20 text-primary">
                            <span className="material-symbols-outlined">dashboard</span>
                            <p className="text-sm font-medium">Dashboard</p>
                        </a>

                        <a className="flex items-center gap-3 px-3 py-2 text-white/70 hover:bg-white/10 rounded-lg">
                            <span className="material-symbols-outlined">folder</span>
                            <p className="text-sm font-medium">My Documents</p>
                        </a>

                        <a className="flex items-center gap-3 px-3 py-2 text-white/70 hover:bg-white/10 rounded-lg">
                            <span className="material-symbols-outlined">upload</span>
                            <p className="text-sm font-medium">Upload</p>
                        </a>

                        <a className="flex items-center gap-3 px-3 py-2 text-white/70 hover:bg-white/10 rounded-lg">
                            <span className="material-symbols-outlined">settings</span>
                            <p className="text-sm font-medium">Settings</p>
                        </a>
                    </nav>
                </div>

                <div className="mt-auto flex flex-col gap-1">
                    <a className="flex items-center gap-3 px-3 py-2 text-white/70 hover:bg-white/10 rounded-lg">
                        <span className="material-symbols-outlined">logout</span>
                        <p className="text-sm font-medium">Logout</p>
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-y-auto">
                {/* Top nav */}
                <header className="flex h-16 items-center justify-between border-b border-white/10 px-10 py-3">
                    <div className="flex w-full max-w-xs items-center bg-white/5 rounded-lg overflow-hidden">
                        <span className="material-symbols-outlined text-white/50 px-3">
                            search
                        </span>
                        <input
                            className="w-full bg-transparent outline-none text-white placeholder:text-white/50 px-2"
                            placeholder="Search documents..."
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <p className="text-sm text-white">Jane Doe</p>
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA6xsCkmkrsKuoFR9rZDOELn2luRCFQboLjW7FKKZqlIPGQBeuJGX4jNtQZNScLHDhsDcbqJ18zEAbaChv3WFmo_GqOVVPKz1z6wpzZvcMUO_VWhR52zyGSXDncdincMA_Rzt7PmSxTztxBf-uyfPZ176jXn8XoTCOH792skULk8gxAbvE-6xJ3QclPolQb4gr7PswBww4b3IRt6bkjscZQIzM1TVl4sxwKInPonE_-4fu1SqsFUIFl-fmh_lF9MUMr4ekswM3Ryg")',
                            }}
                        ></div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-10">
                    <p className="text-white text-4xl font-black mb-8">
                        Welcome back, Jane Doe!
                    </p>

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
        </div>
    );
}
