// // src/components/AppLayout.jsx
// import { useEffect, useState } from "react";
// import { supabase } from "../../supabase";
// import Navbar from "./Navbar";
// import Header from "./Header";

// const AppLayout = ({ children }) => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const getUser = async () => {
//             const {
//                 data: { user },
//             } = await supabase.auth.getUser();
//             setUser(user);
//         };

//         getUser();

//         // Listen for auth changes
//         const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
//             setUser(session?.user ?? null);
//         });

//         return () => subscription.unsubscribe();
//     }, []);

//     if (!user) return children; // If not logged in, don't show Navbar/Header

//     return (
//         <>
//             <Header />
//             <Navbar />
//             <main>{children}</main>
//         </>
//     );
// };

// export default AppLayout;
import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { supabase } from "../../supabase";

export default function AppLayout({ children }) {
    const handleLogout = async () => {
        await supabase.auth.signOut();
        // redirect to login if needed
    };

    return (
        <div className="flex h-screen text-gray-300 bg-[#0E1117] font-display">
            {/* Sidebar */}
            <Navbar onLogout={handleLogout} />

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-y-auto">
                {/* Header */}
                <Header />

                {/* Page Content */}
                <main className="flex-1 p-10">{children}</main>
            </div>
        </div>
    );
}
