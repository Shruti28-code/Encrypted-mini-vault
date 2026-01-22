// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { supabase } from "../supabase";

// // Pages
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Signup from "../pages/SignUp";
// import Dashboard from "../pages/Dashboard";
// import Upload from "../pages/Upload";
// // import MyDocuments from "../pages/MyDocuments";
// // 🔒 Protected Route Wrapper
// function ProtectedRoute({ children }) {
//   const [loading, setLoading] = useState(true);
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     // Check if session exists
//     supabase.auth.getSession().then(({ data }) => {
//       setSession(data.session);
//       setLoading(false);
//     });

//     // Listen to auth changes (login/logout)
//     const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

//   if (loading) return <div className="text-white">Loading...</div>;

//   // If user not logged in → go to login
//   if (!session) return <Navigate to="/login" replace />;

//   // If session exists → allow route
//   return children;
// }

// const App = () => {
//   return (
//     <Router>
//       <Routes>

//         {/* Default route */}
//         <Route path="/" element={<Home />} />

//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected Route */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/upload"
//           element={
//             <ProtectedRoute>
//               <Upload />
//             </ProtectedRoute>
//           }
//         />

//         {/* <Route
//           path="/documents"
//           element={
//             <ProtectedRoute>
//               <MyDocuments />
//             </ProtectedRoute>
//           }
//         /> */}
//       </Routes>
//     </Router >
//   );
// };

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import MyDocuments from "../pages/MyDocuments";
import Upload from "../pages/Upload";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import Home from "../pages/Home";
import AppLayout from "./Components/AppLayout";
import ProtectedRoute from "./Components/ProtectedRoute";
import Setting from "../pages/Setting";

function App() {
  // after successful login




  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes wrapped in AppLayout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <AppLayout>
                <MyDocuments />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Setting />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Upload />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

