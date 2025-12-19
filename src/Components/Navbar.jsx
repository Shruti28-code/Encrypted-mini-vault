import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ onLogout }) {
    return (
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
                    <h1 className="text-white text-base font-medium">Encrypted Mini Vault</h1>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${isActive ? "bg-primary/20 text-primary" : "text-white/70 hover:bg-white/10"
                            }`
                        }
                    >
                        <p>Dashboard</p>
                    </NavLink>

                    <NavLink
                        to="/documents"
                        className="flex items-center gap-3 px-3 py-2 text-white/70 hover:bg-white/10 rounded-lg"
                    >
                        <p className="text-sm font-medium">My Documents</p>
                    </NavLink>

                    <NavLink
                        to="/upload"
                        className="flex items-center gap-3 px-3 py-2 text-white/70 hover:bg-white/10 rounded-lg"
                    >
                        <p className="text-sm font-medium">Upload</p>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className="flex items-center gap-3 px-3 py-2 text-white/70 hover:bg-white/10 rounded-lg"
                    >
                        <p className="text-sm font-medium">Settings</p>
                    </NavLink>
                </nav>
            </div>

            {/* Logout */}
            <div className="mt-auto flex flex-col gap-1">
                <button
                    onClick={onLogout}
                    className="flex items-center gap-3 px-3 py-2 text-white/70 hover:bg-white/10 rounded-lg"
                >
                    <span className="material-symbols-outlined">logout</span>
                    <p className="text-sm font-medium">Logout</p>
                </button>
            </div>
        </aside>
    );
}
