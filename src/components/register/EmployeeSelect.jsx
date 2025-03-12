import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";

export default function SearchableSelect({
  employeeList,
  setEmployeeDetails,
  setUpdateRegisteredUserTable,
}) {
  const api = useApi();
  const [selectedName, setSelectedName] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleDropDownChange = (event, newValue, reason) => {
    if (reason !== "clear") {
      setUpdateRegisteredUserTable(false);
      setSelectedName(newValue);
      setSelectedEmployeeId(newValue?.employeeId || null);
    } else {
      setUpdateRegisteredUserTable(false);
      setSelectedName(null);
      setSelectedEmployeeId(null);
      setEmployeeDetails(null);
    }
  };

  useEffect(() => {
    if (!selectedEmployeeId) return; // Prevent API call if no employee is selected

    api
      .get(
        `http://192.168.78.70:5001/brtafp/user-admin/employee-details?employeeId=${selectedEmployeeId}`
      )
      .then((response) => {
        setEmployeeDetails(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching employee details:", error);
      });
  }, [selectedEmployeeId]); // Only trigger effect when `selectedEmployeeId` changes

  return (
    <Autocomplete
      options={employeeList}
      getOptionLabel={(option) => {
        return `${option.firstName} /  ${option.designationName}`;
      }}
      isOptionEqualToValue={(option, value) =>
        option.employeeId === value?.employeeId
      }
      value={selectedName}
      onChange={handleDropDownChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Employee to Register"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
      )}
      fullWidth
    />
  );
}
