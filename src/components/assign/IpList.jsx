import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import {
  Typography,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Importing the Delete icon
import EditIcon from "@mui/icons-material/Edit"; // Importing the Edit icon
import useApi from "../../hooks/useApi";
import IpData from "./IpData";

export default function IpTable({}) {
  const api = useApi();
  const [ipArray, setIpArray] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState(ipArray);

  const columns = [
    { field: "branchName", headerName: "Branch", flex: 1 },
    { field: "terminalIp", headerName: "Terminal IP", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
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
      width: 150, // Adjusted width for both buttons
      renderCell: (params) => {
        return (
          <>
            {/* Edit Button */}
            <IconButton
              color="primary"
              sx={{ marginRight: 1 }}
              onClick={() => handleEditClick(params.row)}
            >
              <EditIcon /> {/* Edit icon */}
            </IconButton>

            {/* Delete Button */}
            <IconButton
              color="error"
              onClick={() => handleDeleteClick(params.row)}
            >
              <DeleteIcon /> {/* Trash bin icon */}
            </IconButton>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchIpList = async () => {
      try {
        const ips = IpData; // Use imported IpData
        setIpArray(ips);
        setFilteredRows(ips);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchIpList();
  }, []);

  useEffect(() => {
    setFilteredRows(
      ipArray.filter(
        (row) =>
          row.branchName.toLowerCase().includes(searchText.toLowerCase()) ||
          row.terminalIp.includes(searchText)
      )
    );
  }, [searchText, ipArray]);

  const handleDeleteClick = (row) => {
    console.log("IP to delete: " + row.terminalIp);
    // Perform deletion logic here
  };

  const handleEditClick = (row) => {
    console.log("IP to edit: " + row.terminalIp);
    // Perform edit logic here
  };

  const handleSwitchChange = (row, event) => {
    const updatedRows = filteredRows.map((ip) => {
      if (ip.id === row.id) {
        return { ...ip, enabled: event.target.checked ? 1 : 0 };
      }
      return ip;
    });
    setFilteredRows(updatedRows);
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Assigned IPs
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
    </>
  );
}
