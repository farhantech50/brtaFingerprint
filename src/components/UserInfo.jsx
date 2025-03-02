import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
// UserInfo component receives userData as a prop
export default function UserInfo({ userData }) {
  if (!userData) {
    return null; // If no user data is provided, render nothing
  }

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="First Name"
          variant="filled"
          value={userData.firstName || ""} // Bind to userData value
          readOnly
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          variant="filled"
          value={userData.lastName || ""} // Bind to userData value
          readOnly
        />
        <TextField
          id="outlined-password-input"
          label="Age"
          variant="filled"
          value={userData.age || ""} // Bind to userData value
          readOnly
        />
        <TextField
          id="outlined-read-only-input"
          label="Email"
          variant="filled"
          value={userData.email || ""} // Bind to userData value
          readOnly
        />
        <TextField
          id="outlined-number"
          label="Phone Number"
          variant="filled"
          value={userData.phoneNumber || ""} // Bind to userData value
          readOnly
        />
      </div>
      <div>
        <TextField
          required
          id="filled-required"
          label="First Name"
          value={userData.firstName || ""} // Bind to userData value
          variant="filled"
          readOnly
        />
        <TextField
          required
          id="filled-required"
          label="Last Name"
          value={userData.lastName || ""} // Bind to userData value
          variant="filled"
          readOnly
        />
        <TextField
          id="filled-password-input"
          label="Age"
          value={userData.age || ""} // Bind to userData value
          type="password"
          variant="filled"
          readOnly
        />
        <TextField
          id="filled-read-only-input"
          label="Email"
          value={userData.email || ""} // Bind to userData value
          variant="filled"
          readOnly
        />
        <TextField
          id="filled-number"
          label="Phone Number"
          value={userData.phoneNumber || ""} // Bind to userData value
          variant="filled"
          readOnly
        />
      </div>
    </Box>
  );
}
