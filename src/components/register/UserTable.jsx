import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import { Typography, Switch, Button, FormControlLabel } from "@mui/material";
import useApi from "../../hooks/useApi";
import ViewModal from "./ViewModal";

export default function UserTable({
  selectedBranchDetails,
  updateRegisteredUserTable,
}) {
  const api = useApi();
  const [userArray, setUserArray] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState(userArray);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({});

  const columns = [
    { field: "firstName", headerName: "Name", flex: 1 }, // Using flex instead of fixed width
    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "userName", headerName: "Username", flex: 1 },
    { field: "userRole", headerName: "Role", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      width: 200, // Keeping the fixed width for status column
      renderCell: (params) => {
        return (
          <FormControlLabel
            control={
              <Switch
                checked={Boolean(params.row.enabled)}
                onChange={(event) => handleSwitchChange(params.row, event)}
                color="primary"
              />
            }
            label={
              <span
                style={{
                  color: params.row.enabled ? "green" : "grey",
                  fontWeight: "bold",
                }}
              >
                {params.row.enabled ? "Active" : "Inactive"}
              </span>
            }
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200, // Fixed width for action column
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ marginRight: 1 }}
              onClick={() => handleViewClick(params.row)}
            >
              View
            </Button>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await api.get(
          `http://192.168.78.70:5001/brtafp/user-admin/users-by-branch`,
          { params: { branchId: selectedBranchDetails.value } }
        );
        const users = response.data.data.map((user) => ({
          ...user,
          id: user.userId,
        }));

        setUserArray(users);
        setFilteredRows(users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUserList();
  }, [selectedBranchDetails, updateRegisteredUserTable]);

  useEffect(() => {
    setFilteredRows(
      userArray.filter(
        (row) =>
          row.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
          row.designation?.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, userArray]);

  // View button click handler
  const handleViewClick = (row) => {
    setUserData(row);
    setIsModalOpen(true);
  };

  const handleSwitchChange = async (row, event) => {
    const activeStatus = event.target.checked;

    const updatedRows = await Promise.all(
      filteredRows.map(async (user) => {
        if (user.id === row.id) {
          try {
            const response = await api.post(
              `http://192.168.78.70:5001/brtafp/user-admin/user-active-inactive`,
              {
                userId: user.id,
                activeStatus: Number(activeStatus),
              }
            );
            console.log(response);
            if (response.data.success) {
              return { ...user, enabled: activeStatus ? 1 : 0 };
            }
          } catch (err) {
            console.error("Error changing status:", err);
          }

          return user;
        }
        return user;
      })
    );

    // 🚀 Ensure all rows have an ID before updating state
    setFilteredRows(
      updatedRows.filter((user) => user !== undefined && user.id !== undefined)
    );
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Registered Users in {selectedBranchDetails.text}
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{ mb: 2 }}
      />
      <DataGrid
        rows={filteredRows}
        columns={columns}
        sx={{
          border: 0,
          maxHeight: "520px",
          overflowY: "auto",
          "& .MuiDataGrid-row": {
            cursor: "pointer", // Set pointer cursor for each row
          },
          "& .Mui-selected": {
            backgroundColor: "primary.main !important", // Change the background color of selected row
          },
        }}
        hideFooter
      />
      <ViewModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={userData}
      />
    </>
  );
}
