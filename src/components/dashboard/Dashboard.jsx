import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useAuthContext } from "../../contexts/authContext";

export default function Dashboard() {
  const { isSuperAdmin, isCircleAdmin, isOperator } = useAuthContext();
  const [userRole, setUserRole] = useState("No Role");

  useEffect(() => {
    if (isSuperAdmin) {
      setUserRole("Super Admin");
    } else if (isCircleAdmin) {
      setUserRole("Circle Admin");
    } else if (isOperator) {
      setUserRole("Operator");
    } else {
      setUserRole("No Role");
    }
  }, [isSuperAdmin, isCircleAdmin, isOperator]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div>Role: {userRole}</div> {/* Displaying the role */}
    </Box>
  );
}
