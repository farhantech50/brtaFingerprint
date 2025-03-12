import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const MuiModalExample = ({ open, onClose, userData }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textAlign: "center" }}>
        Employee Information
      </DialogTitle>
      <DialogContent>
        {userData ? (
          <>
            <>
              <p>
                <strong>Username: </strong>
                {userData.userName}
              </p>
              <p>
                <strong>Employee ID: </strong>
                {userData.employeeId}
              </p>
              <p>
                <strong>Branch: </strong>
                {userData.branchName}
              </p>
              <p>
                <strong>Name: </strong>
                {userData.firstName}
              </p>
              <p>
                <strong>Mobile No.: </strong>
                {userData.mobileNo}
              </p>
              <p>
                <strong>Email: </strong>
                {userData.email}
              </p>
              <p>
                <strong>Designation: </strong>
                {userData.designation}
              </p>
              <p>
                <strong>Role: </strong>
                {userData.userRole}
              </p>
              <p>
                <strong>Status: </strong>
                {userData.enabled ? "Active" : "Inactive"}
              </p>
            </>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MuiModalExample;
