import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../supabase";

export default function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setIsAuthenticated(!!user);
            setLoading(false);
        };

        checkUser();
    }, []);

    if (loading) return <p>Loading...</p>; // or a spinner

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return children;
}
