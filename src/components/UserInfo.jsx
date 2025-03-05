import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTheme, styled } from "@mui/material/styles"; // Import useTheme to access the theme
import {
  Grid,
  Stack,
  Switch,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

export default function UserInfo({ userData, selectedBranchDetails }) {
  if (!userData) {
    return null; // If no user data is provided, render nothing
  }
  const [isActive, setIsActive] = React.useState(false); // State to manage switch status
  const [role, setRole] = React.useState("");
  const theme = useTheme(); // Use the theme hook to access the theme

  React.useEffect(() => {
    setIsActive(false);
    setRole("");
  }, [userData]);

  React.useEffect(() => {
    console.log(isActive);
  }, [isActive]);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" }, // Ensure full width for inputs
        maxWidth: 600, // Set max width for the form
        margin: "0 auto", // Center the form horizontally
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={3}>
        {/* Current Branch */}
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-required-currentBranchId"
            label="Current Branch"
            variant="filled"
            value={selectedBranchDetails.text || ""}
            readOnly
            fullWidth
            sx={{
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
            }}
          />
        </Grid>

        {/* Name and Known As */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="outlined-required-name"
            label="Name"
            variant="filled"
            value={userData.firstName || ""}
            readOnly
            fullWidth
            sx={{
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="outlined-required-knownAs"
            label="Known As"
            variant="filled"
            value={userData.knownAs || ""}
            readOnly
            fullWidth
            sx={{
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
            }}
          />
        </Grid>

        {/* Mobile and Email */}
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-mobileNo-input"
            label="Mobile no."
            variant="filled"
            value={userData.mobileNo || ""}
            readOnly
            fullWidth
            sx={{
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-read-only-input-email"
            label="Email"
            variant="filled"
            value={userData.email || ""}
            readOnly
            fullWidth
            sx={{
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
            }}
          />
        </Grid>

        {/* Designation */}
        <Grid item xs={12}>
          <TextField
            id="outlined-read-only-input-designationName"
            label="Designation"
            variant="filled"
            value={userData.designationName || ""}
            readOnly
            fullWidth
            sx={{
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
            }}
          />
        </Grid>

        {/* Role Selector */}
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="filled"
            fullWidth
            sx={{ borderRadius: 2, marginLeft: 1, height: 56 }}
          >
            <InputLabel
              id="demo-simple-select-filled-label"
              sx={{ color: "#000000", fontSize: 15, fontWeight: 400 }}
            >
              Select Role
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={role}
              fullWidth
              onChange={(event) => setRole(event.target.value)}
              sx={{
                borderRadius: 2,
                backgroundColor: theme.palette.secondary.light,
              }}
            >
              <MenuItem value="CIRCLE_ADMIN">Circle Admin</MenuItem>
              <MenuItem value="OPERATOR">Operator</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Switch (Active/Inactive) */}
        <Grid item xs={12} sm={6}>
          <Stack
            onClick={() => setIsActive((prev) => !prev)}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              borderRadius: 2,
              backgroundColor: theme.palette.secondary.light,
              marginLeft: 1,
              height: 54,
              cursor: "pointer",
            }}
          >
            <Typography variant="h7" margin={2}>
              Deactivate
            </Typography>
            <Switch
              checked={isActive} // Controlled value based on state
              onChange={(event) => setIsActive(event.target.checked)} // Update state when switch changes
              inputProps={{ "aria-label": "Switch demo" }}
              color="secondary"
            />
            <Typography variant="h7" margin={2}>
              Activate{" "}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              fontSize: "1.1rem",
              backgroundColor: theme.palette.secondary.main,
              marginLeft: 1,
            }}
            onClick={() => {
              console.log("clicked");
            }}
          >
            Register User
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
