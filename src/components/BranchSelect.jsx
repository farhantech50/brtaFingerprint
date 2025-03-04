import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import useGetBranchList from "../hooks/useGetBranchList";
import { useAuthContext } from "../contexts/authContext";

const names = [
  "Dhaka-Metro-1",
  "Dhaka-Metro-2",
  "Dhaka-Metro-3",
  "Dhaka-Metro-4",
  "Chattogram-Metro-1",
  "Chattogram-Metro-2",
  "Rajshahi-Metro-1",
  "Khulna-Metro-1",
  "Sylhet-Metro-1",
  "Barishal-Metro-1",
  "Rangpur-Metro-1",
  "Mymensingh-Metro-1",
  "Cumilla-Metro-1",
  "Narayanganj-Metro-1",
  "Gazipur-Metro-1",
  "Bogura-Metro-1",
  "Jessore-Metro-1",
  "Cox’s Bazar-Metro-1",
  "Tangail-Metro-1",
  "Feni-Metro-1",
];

export default function SearchableSelect({ setSelectedBranchDetails }) {
  const [branchNames, setBranchNames] = React.useState([]);
  const { authUser, isSuperAdmin, isCircleAdmin } = useAuthContext();
  const { fetchBranches } = useGetBranchList();
  const [selectedName, setSelectedName] = React.useState(null);
  const theme = useTheme();

  React.useEffect(() => {
    const getBranches = async () => {
      let data;
      if (isSuperAdmin) {
        data = await fetchBranches(); // Fetch all branches
      } else if (isCircleAdmin && authUser?.userName) {
        data = await fetchBranches(authUser.userName); // Fetch specific branch using userName
      }
      if (data && data.data) {
        setBranchNames(data.data);
      } else {
        setBranchNames(null);
      }
    };
    getBranches();
  }, [fetchBranches]);

  const handleDropDownChange = (event, newValue, reason) => {
    if (reason !== "clear") {
      setSelectedName(newValue);
      setSelectedBranchDetails(newValue);
    } else {
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
