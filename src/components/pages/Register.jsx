import { useState, useEffect, useRef } from "react";
import { Grid, Paper, Box, Typography, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import useTheme to access the theme
import BranchSelect from "../BranchSelect";
import UserTable from "../UserTable";
import UserInfo from "../UserInfo";
import { useAuthContext } from "../../contexts/authContext";
import useGetEmployeeList from "../../hooks/useGetEmployeeList";

export default function DataTable() {
  const { fetchEmployeeList } = useGetEmployeeList();
  const [employeeList, setEmployeeList] = useState([]);
  const { isSuperAdmin, isCircleAdmin } = useAuthContext();
  const [selectedBranchDetails, setSelectedBranchDetails] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const theme = useTheme(); // Use the theme hook to access the theme
  const [gotList, setGotList] = useState(false);

  useEffect(() => {
    if (isCircleAdmin) {
      setSelectedBranchDetails({ value: 2, text: "Dhaka-Metro-1" });
    }
  }, [isCircleAdmin]);

  useEffect(() => {
    const getList = async () => {
      if (!selectedBranchDetails) return;
      try {
        const res = await fetchEmployeeList(selectedBranchDetails.value);
        const updatedList = res.data.map((row) => ({
          ...row,
          id: row.employeeId, // Assign employeeId as id
        }));
        setSelectedUser(null);
        setEmployeeList(updatedList);
        setGotList(true);
      } catch (error) {
        setSelectedUser(null);
        console.error("Error fetching employee list:", error);
      }
    };

    getList();
  }, [selectedBranchDetails, setSelectedBranchDetails]);
  return (
    <Grid container spacing={2} justifyContent="center">
      {/* Left Card */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: "100%" }}>
          <Box
            sx={{ justifyContent: "center", width: "100%", display: "flex" }}
          >
            {isSuperAdmin ? (
              <BranchSelect
                setSelectedBranchDetails={setSelectedBranchDetails}
                setGotList={setGotList}
              />
            ) : isCircleAdmin ? (
              <TextField
                value={selectedBranchDetails?.text}
                aria-readonly
                variant="outlined"
                fullWidth
                sx={{
                  maxWidth: 300,
                  m: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
                InputProps={{
                  inputProps: { style: { textAlign: "center" } }, // Center text inside input
                }}
              />
            ) : null}
          </Box>
          {selectedBranchDetails && gotList && (
            <UserTable
              userArray={employeeList}
              setSelectedUser={setSelectedUser}
            />
          )}
        </Paper>
      </Grid>

      {/* Right Card */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: "100%" }}>
          <Box>
            {selectedBranchDetails && (
              <>
                <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
                  Selected User Details
                </Typography>
                <UserInfo
                  userData={selectedUser}
                  selectedBranchDetails={selectedBranchDetails}
                />
              </>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
