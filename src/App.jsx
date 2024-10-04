import { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import MasterAdminDashboard from "./pages/Master-Admin-Dashboard";
import { useAccount } from "./lib/context/account-context";

function App() {
  const [count, setCount] = useState(0);

  const ProtectedRoute = () => {
    const { userType } = useAccount();
    // if (!localStorage.getItem("token")) {
    //   return <Navigate to="/" />;
    // }

    // Route to master admin dashboard if user is admin
    if (userType === "admin") {
      return <Navigate to="/masteradmindashboard" />;
    }

    // Otherwise, return the regular dashboard
    return <Outlet />;
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
          {/* <Route element={<ProtectedRoute/>}>
           
        </Route> */}
          <Route path="dashboard/*" element={<Dashboard />}></Route>
        <Route path="masteradmindashboard/*" element={<MasterAdminDashboard />}></Route>
          {/* <Route element={<ProtectedRoute />}>
            <Route path="dashboard/*" element={<Dashboard />} />

            <Route
              path="masteradmindashboard/*"
              element={<MasterAdminDashboard />}
            />
          </Route> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
