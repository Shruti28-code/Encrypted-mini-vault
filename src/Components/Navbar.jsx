import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LayoutDashboard, FileText, Upload, Settings, LogOut } from "lucide-react";

export default function Navbar({ onLogout }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navItems = [
        { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/documents", label: "My Documents", icon: FileText },
        { to: "/upload", label: "Upload", icon: Upload },
        { to: "/settings", label: "Settings", icon: Settings },
    ];

    return (
        <>
            {/* Mobile Menu Button - Fixed at top */}
            <button
                onClick={toggleMobileMenu}
                className="lg:hidden fixed top-4 left-4 z-50 text-white p-2 bg-[#0f231f] hover:bg-[#1a3d35] rounded-lg transition-colors shadow-lg"
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 z-40"
                    onClick={toggleMobileMenu}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static top-0 bottom-0 left-0 z-50
                    flex w-64 flex-col bg-[#0f231f] p-4
                    transition-transform duration-300 ease-in-out
                    lg:translate-x-0
                    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
                    border-r border-white/10
                `}
            >
                {/* Logo/Header */}
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex items-center gap-3 p-2">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10 flex-shrink-0"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDDZRro7zlMnydPGl2TTNgDLCkx_Bvnyg6qGg-UIXkat_PaeUCoG7oQK33mCMte0302Vj2qM3U5G9llD7jIKvic8XAhQ0lMUiowvbvzZg-S0pGRqZwvtT0T7IAqCY_kNPg8cxugRYg5p8KGOZWOUt1spUrlNUJScLGljFZcNkuCFeymn3NpUtvOpiO4G1r-ot6UU93q6-KDora3V662wVDDV4TqenP56SBRv4abNsOuVRc_QpblUWNFmDaR1N9lFrGWGlGizDD7vA")',
                            }}
                        ></div>
                        <h1 className="text-white text-base font-medium leading-tight">
                            Encrypted Mini Vault
                        </h1>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-[#1a3d35] text-[#4ade80] shadow-sm"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                                }`
                            }
                        >
                            <Icon size={20} className="flex-shrink-0" />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                {/* <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-white/10">
                    <button
                        onClick={() => {
                            onLogout();
                            setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200 w-full text-left"
                    >
                        <LogOut size={20} className="flex-shrink-0" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div> */}
            </aside>
        </>
    );
}