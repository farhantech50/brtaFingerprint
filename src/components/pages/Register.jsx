import { useState } from "react";
import { Grid, Paper, Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import useTheme to access the theme
import BranchSelect from "../BranchSelect";
import BranchSelector from "../BranchSelector";
import UserTable from "../UserTable";
import UserInfo from "../UserInfo";

const userArray = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: "Stark", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable() {
  const [selectedUser, setSelectedUser] = useState("");
  const [userArrayReceived, setUserArrayReceived] = useState(false);
  const theme = useTheme(); // Use the theme hook to access the theme

  return (
    <Grid container spacing={2} justifyContent="center">
      {/* Left Card */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: "100%" }}>
          <Box
            sx={{ justifyContent: "center", width: "100%", display: "flex" }}
          >
            <BranchSelect setUserArrayReceived={setUserArrayReceived} />
          </Box>
          {userArrayReceived && (
            <UserTable
              userArray={userArray}
              setSelectedUser={setSelectedUser}
            />
          )}
        </Paper>
      </Grid>

      {/* Right Card */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: "100%" }}>
          <Box>
            {userArrayReceived && (
              <>
                <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
                  Selected User Details
                </Typography>
                <UserInfo userData={selectedUser} />
              </>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Centered Button at Bottom */}
      <Grid item xs={12} display="flex" justifyContent="center" sx={{ mt: 3 }}>
        {userArrayReceived && (
          <Button
            variant="contained"
            sx={{
              width: "200px",
              height: "50px",
              fontSize: "1.1rem",
              backgroundColor: theme.palette.secondary.main, // Use secondary color for background
            }}
            onClick={() => {
              console.log("clicked");
            }}
          >
            Register User
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
