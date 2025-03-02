import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./components/NavBar"; // Import your NavBar
import SideNav from "./components/SideNav"; // Import your Sidebar
import Box from "@mui/material/Box"; // Import Box for layout
import AppRoutes from "./Routes";
import { ToastContainer } from "react-toastify";
import { useSidebar } from "./contexts/SidebarContext";

export default function App() {
  const { open } = useSidebar();
  const location = useLocation(); // Get the current location

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <ToastContainer />

      {!isLoginPage && <NavBar />}
      {!isLoginPage && <SideNav />}

      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Main container where components will be loaded */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: isLoginPage ? 0 : "70px",
            marginLeft: isLoginPage ? 0 : open ? "240px" : "70px",
            transition: "margin-left 0.3s ease",
            height: "calc(100vh - 70px)",
            overflowY: "auto",
          }}
        >
          <AppRoutes />
        </Box>
      </Box>
    </>
  );
}
