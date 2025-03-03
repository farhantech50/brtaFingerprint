import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

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

export default function SearchableSelect({ setUserArrayReceived }) {
  const [selectedName, setSelectedName] = React.useState(null);
  const theme = useTheme();

  const handleDropDownChange = (event, newValue, reason) => {
    if (reason !== "clear") {
      setSelectedName(newValue);
      console.log("Selected Branch: ", newValue);
      setUserArrayReceived(true);
    } else {
      setSelectedName("");
      setUserArrayReceived(false);
    }
  };

  return (
    <Autocomplete
      options={names}
      value={selectedName} // Single value, not an array
      onChange={handleDropDownChange}
      renderInput={(params) => <TextField {...params} label="Select Branch" />}
      sx={{ width: 300, m: 1 }}
    />
  );
}
