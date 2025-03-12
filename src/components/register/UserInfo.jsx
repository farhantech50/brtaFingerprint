import * as React from "react";
import {
  Box,
  TextField,
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
import { useAuthContext } from "../../contexts/authContext";
import { useTheme } from "@mui/material/styles";
import showToast from "../../utils/toast";
import useRegister from "../../hooks/useRegister";

export default function UserInfo({
  userData,
  selectedBranchDetails,
  setUpdateRegisteredUserTable,
}) {
  if (!userData || !selectedBranchDetails) return null;

  const { isSuperAdmin, isCircleAdmin } = useAuthContext();
  const [isActive, setIsActive] = React.useState(false);
  const [role, setRole] = React.useState("");
  const theme = useTheme();
  const { register } = useRegister();

  React.useEffect(() => {
    setIsActive(false);
    setRole("");
  }, [userData]);

  const handleRegisterChange = async () => {
    if (!role) {
      showToast("Please select a role for the user", "warn");
      return;
    }
    try {
      const response = await register(
        userData.employeeId,
        isActive,
        selectedBranchDetails.value,
        role
      );
      if (response.success === false) {
        setUpdateRegisteredUserTable(false);
        showToast(response.message, "error");
      } else {
        setUpdateRegisteredUserTable(true);
        showToast("Employee registration successful", "success");
      }
    } catch (e) {
      console.log(e);
      setUpdateRegisteredUserTable(false);
      showToast("An error occurred during registration", "error");
    }
  };

  // Render dropdown options based on user role
  const renderMenuItems = () => {
    if (isSuperAdmin)
      return <MenuItem value="CIRCLE_ADMIN">Circle Admin</MenuItem>;
    if (isCircleAdmin) return <MenuItem value="OPERATOR">Operator</MenuItem>;
    return null;
  };

  return (
    <Grid container spacing={2}>
      {/* ROW 1: Branch, Designation, Name */}
      <Grid item xs={12} sm={4}>
        <TextField
          label="Current Branch"
          variant="filled"
          value={selectedBranchDetails.text ? selectedBranchDetails.text : ""}
          fullWidth
          InputProps={{ readOnly: true }}
          sx={{ backgroundColor: "#f5f5f5" }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Designation"
          variant="filled"
          value={userData.designation || ""}
          fullWidth
          InputProps={{ readOnly: true }}
          sx={{ backgroundColor: "#f5f5f5" }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Name"
          variant="filled"
          value={userData.firstName || ""}
          fullWidth
          InputProps={{ readOnly: true }}
          sx={{ backgroundColor: "#f5f5f5" }}
        />
      </Grid>

      {/* ROW 1: Known As, Mobile, Email */}
      <Grid item xs={12} sm={4}>
        <TextField
          label="Known As"
          variant="filled"
          value={userData.knownAs || ""}
          fullWidth
          InputProps={{ readOnly: true }}
          sx={{ backgroundColor: "#f5f5f5" }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Mobile No."
          variant="filled"
          value={userData.mobileNo || ""}
          fullWidth
          InputProps={{ readOnly: true }}
          sx={{ backgroundColor: "#f5f5f5" }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Email"
          variant="filled"
          value={userData.email || ""}
          fullWidth
          InputProps={{ readOnly: true }}
          sx={{ backgroundColor: "#f5f5f5" }}
        />
      </Grid>

      {/* ROW 2: Role Selector, Active Switch, Register Button */}
      <Grid item xs={12} sm={4}>
        <FormControl variant="filled" fullWidth>
          <InputLabel>Select Role</InputLabel>
          <Select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            sx={{ backgroundColor: theme.palette.secondary.light }}
          >
            {renderMenuItems()}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Stack
          onClick={() => setIsActive((prev) => !prev)}
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            borderRadius: 2,
            backgroundColor: isActive ? "green" : "grey", // Change color based on state
            height: 56,
            cursor: "pointer",
            color: "white", // Ensures text remains visible
          }}
        >
          <Typography>Deactivate</Typography>
          <Switch
            checked={isActive}
            onChange={(event) => setIsActive(event.target.checked)}
            color=""
          />
          <Typography>Activate</Typography>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            fontSize: "1.1rem",
            backgroundColor: theme.palette.secondary.main,
            height: "100%",
          }}
          onClick={handleRegisterChange}
        >
          Register User
        </Button>
      </Grid>
    </Grid>
  );
}
