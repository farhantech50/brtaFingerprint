import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import LogIn from "./components/login/LogIn";
import Register from "./components/register/Register";
import Assign from "./components/assign/Assign";
import { useAuthContext } from "./contexts/authContext";

export default function AppRoutes() {
  const { isLoggedIn } = useAuthContext(); // Access isLoggedIn from context

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" /> : <LogIn />}
      />
      <Route
        path="/register"
        element={isLoggedIn ? <Register /> : <Navigate to="/login" />}
      />
      <Route
        path="/assign"
        element={isLoggedIn ? <Assign /> : <Navigate to="/login" />}
      />
      {/* Handle unknown routes */}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
    </Routes>
  );
}
