import React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

const columns = [
  { field: "firstName", headerName: "Name", width: 500 },
  { field: "designationName", headerName: "Designation", width: 250 },
];

export default function UserTable({ userArray, setSelectedUser }) {
  const [selectionModel, setSelectionModel] = useState([]); // Initialize as empty array
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState(userArray);

  useEffect(() => {
    setFilteredRows(
      userArray.filter(
        (row) =>
          row.firstName.toLowerCase().includes(searchText) || // Search by ID
          row.designationName?.toLowerCase().includes(searchText.toLowerCase()) // Search by Name
      )
    );
  }, [searchText]);

  // Handle the selection change and enforce single row selection. All other rows will  be unselected.
  const handleSelectionChange = (selection) => {
    if (selection.length > 0) {
      const selectionSet = new Set(selectionModel);
      const result = selection.filter((s) => !selectionSet.has(s));
      setSelectionModel(result);
      const selectedRowData = filteredRows.find(
        (filteredRow) => filteredRow.id == result
      );
      setSelectedUser(selectedRowData);
    } else {
      setSelectionModel(selection);
    }
  };
  return (
    <>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Select User to Register
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
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={handleSelectionChange}
        sx={{
          border: 0,
          maxHeight: "560px",
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
