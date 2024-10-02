import { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  const [count, setCount] = useState(0);

  const ProtectedRoute = () => {
    return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <>
    <div className="w-full h-full lg:hidden md:hidden flex items-center justify-center">Not avaliable for mobile devices yet</div>
    <div className="hidden lg:block md:block">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route element={<ProtectedRoute/>}>
           <Route path="dashboard/*" element={<Dashboard />}></Route>
        </Route>
      </Routes>
      </div>
    </>
  );
}

export default App;
