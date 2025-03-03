import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useAuthContext } from "../../contexts/authContext";

export default function Dashboard() {
  const { authUser } = useAuthContext(); // Assuming authUser contains the user data
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (authUser) {
      setUserData({
        role: authUser.role || "No Role", // Setting the role of the user
      });
    }
  }, [authUser]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div>Role: {userData.role}</div> {/* Displaying the role */}
    </Box>
  );
}
