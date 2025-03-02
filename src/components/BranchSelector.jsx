import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const regionArray = [
  { id: 1, name: "Dhaka" },
  { id: 2, name: "Chattogram" },
  { id: 3, name: "Rajshahi" },
  { id: 4, name: "Khulna" },
  { id: 5, name: "Sylhet" },
];

// Updated circleArray structure
const circleArray = {
  1: [
    { id: 1, name: "Dhaka-Metro-1" },
    { id: 2, name: "Dhaka-Metro-2" },
    { id: 3, name: "Dhaka-Metro-3" },
    { id: 4, name: "Dhaka-Metro-4" },
  ],
  2: [
    { id: 5, name: "Chattogram-Metro-1" },
    { id: 6, name: "Chattogram-Metro-2" },
  ],
  3: [{ id: 7, name: "Rajshahi-Metro-1" }],
  4: [{ id: 8, name: "Khulna-Metro-1" }],
  5: [{ id: 9, name: "Sylhet-Metro-1" }],
};

export default function DialogSelect({ setUserArrayReceived }) {
  const [open, setOpen] = React.useState(false);
  const [selectedRegion, setSelectedRegion] = React.useState(""); // Initially empty
  const [selectedCircle, setSelectedCircle] = React.useState(""); // Initially empty

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    setSelectedCircle(""); // Reset circle when region changes
    console.log("Selected Region:", event.target.value);
  };

  const handleCircleChange = (event) => {
    setSelectedCircle(event.target.value);
    console.log("Selected Circle:", event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      if (reason === "ok") {
        setUserArrayReceived(true);
      } else if (reason === "cancel") {
      }
      setOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Select Branch</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Select Branch</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            {/* Region Select */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="region-select">Region</InputLabel>
              <Select
                native
                value={selectedRegion}
                onChange={handleRegionChange}
                input={<OutlinedInput label="Region" id="region-select" />}
              >
                <option value=""></option>

                {regionArray.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* Circle Select */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="circle-select">Circle</InputLabel>
              <Select
                native
                value={selectedCircle}
                onChange={handleCircleChange}
                input={<OutlinedInput label="Circle" id="circle-select" />}
                disabled={!selectedRegion} // Disable until region is selected
              >
                <option value=""></option>
                {selectedRegion &&
                  circleArray[selectedRegion]?.map((circle) => (
                    <option key={circle.id} value={circle.id}>
                      {circle.name}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose(e, "cancel")}>Cancel</Button>
          <Button onClick={(e) => handleClose(e, "ok")}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
