import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import LogIn from "./components/pages/LogIn";
import Register from "./components/pages/Register";
import Assign from "./components/pages/Assign";
import { useAuthContext } from "./contexts/authContext";
export default function AppRoutes() {
  const { authUser } = useAuthContext();

  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard />}
        // element={authUser ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <LogIn />}
      />
      <Route
        path="/register"
        element={<Register />}
        // element={authUser ? <Register /> : <LogIn />}
      />
      <Route
        path="/assign"
        element={<Assign />}
        // element={authUser ? <Assign /> : <LogIn />}
      />
    </Routes>
  );
}
