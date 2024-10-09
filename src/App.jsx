import { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import MasterAdminDashboard from "./pages/Master-Admin-Dashboard";
import { useAccount } from "./lib/context/account-context";
import ThemeProvider from "./modules/layout/themeprovider";

function App() {
  const { userType } = useAccount();

  const ProtectedRoute = () => {
    // if (!localStorage.getItem("token")) {
    //   return <Navigate to="/" />;
    // }
    console.log(userType)
    // Check the userType to redirect appropriately
    if (userType === "admin") {
      return <Navigate to="/masteradmindashboard" />;
    }

    return <Outlet />; // Render the Outlet for normal users
  };

  return (
    <>
      <div className="w-full h-full lg:hidden md:hidden flex items-center justify-center">
        Not avaliable for mobile devices yet
      </div>
      <div className="hidden lg:block md:block">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          
          <Route element={<ProtectedRoute />}>
            {/* This will be the normal user dashboard */}
            <Route path="dashboard/*" element={<Dashboard />} />
          </Route>
          <Route path="masteradmindashboard/*" element={<MasterAdminDashboard />} />
          
        </Routes>
      </div>  
    </>
  );
}

export default App;
