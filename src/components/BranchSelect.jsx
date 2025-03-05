import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import { useAuthContext } from "../contexts/authContext";
import { useEffect } from "react";
import useApi from "../hooks/useApi";

export default function SearchableSelect({
  setSelectedBranchDetails,
  setGotList,
}) {
  const [branchNames, setBranchNames] = React.useState([]);
  const { isSuperAdmin, isCircleAdmin } = useAuthContext();
  const [selectedName, setSelectedName] = React.useState(null);
  const theme = useTheme();
  const api = useApi();

  useEffect(() => {
    if (isSuperAdmin === false && isCircleAdmin === false) return; // Avoid running when both are false initially

    const getBranches = async () => {
      let data;
      if (isSuperAdmin) {
        try {
          data = await api.get(
            `http://192.168.78.70:5001/brtafp/user-admin/brta-branch`
          );
          console.log();
        } catch (err) {
          console.error("Error fetching branches:", err);
          setSelectedBranchDetails(null);
          return null;
        }
      } else if (isCircleAdmin) {
        return null;
      }
      if (data.data && data.data.data) {
        setBranchNames(data.data.data);
      } else {
        setBranchNames(null);
      }
    };
    getBranches();
  }, [isSuperAdmin, isCircleAdmin]);

  const handleDropDownChange = (event, newValue, reason) => {
    if (reason !== "clear") {
      setGotList(false);
      setSelectedName(newValue);
      setSelectedBranchDetails(newValue);
    } else {
      setGotList(false);
      setSelectedName(null);
      setSelectedBranchDetails(null);
    }
  };

  return (
    <Autocomplete
      options={branchNames}
      getOptionLabel={(option) => option.text} // Display text in the dropdown
      isOptionEqualToValue={(option, value) => option.value === value.value} // Ensure correct selection
      value={selectedName} // Single value, not an array
      onChange={handleDropDownChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Branch"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
      )}
      sx={{ width: 300, m: 1 }}
    />
  );
}
