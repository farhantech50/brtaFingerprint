import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import LogIn from "./components/login/LogIn";
import Register from "./components/register/Register";
import Assign from "./components/assign/Assign";
import LoginLanding from "./components/loginLanding/loginLanding";
import { useAuthContext } from "./contexts/authContext";

export default function AppRoutes() {
  const { isLoggedIn, authUser } = useAuthContext(); // Access isLoggedIn and authUser from context
  const location = useLocation(); // Get the current location to access the state

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
      <Route
        path="/login-data"
        element={
          authUser && location.state?.fromLogin ? (
            <LoginLanding />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {/* Handle unknown routes */}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
    </Routes>
  );
}
