import { useState, useEffect } from "react";
import { Grid, TextField, Card, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import useTheme to access the theme
import BranchSelect from "./BranchSelect";
import UserTable from "./UserTable";
import UserInfo from "./UserInfo";
import { useAuthContext } from "../../contexts/authContext";
import useGetEmployeeList from "../../hooks/useGetEmployeeList";
import EmployeeSelect from "./EmployeeSelect";

export default function EmployeeManagement() {
  const { fetchEmployeeList } = useGetEmployeeList();
  const [employeeList, setEmployeeList] = useState([]);
  const { isSuperAdmin, isCircleAdmin, authUser } = useAuthContext();
  const [selectedBranchDetails, setSelectedBranchDetails] = useState(null);
  const theme = useTheme(); // Use the theme hook to access the theme
  const [gotList, setGotList] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [updateRegisteredUserTable, setUpdateRegisteredUserTable] =
    useState(false);

  useEffect(() => {
    if (isCircleAdmin) {
      console.log(authUser);
      setSelectedBranchDetails({
        value: authUser.branchId,
        text: authUser.branchName,
      });
    }
  }, [isCircleAdmin]);

  useEffect(() => {
    const getList = async () => {
      if (!selectedBranchDetails) return;
      try {
        const res = await fetchEmployeeList(selectedBranchDetails.value);
        const updatedList = res.data.map((row) => ({
          ...row,
          id: row.employeeId, // Assign employeeId as id
        }));

        setEmployeeList(updatedList);
        setGotList(true);
      } catch (error) {
        console.error("Error fetching employee list:", error);
      }
    };

    getList();
  }, [selectedBranchDetails, setSelectedBranchDetails]);
  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {/* First Row - Branch & Employee Selectors */}
      <Grid item xs={12} md={6}>
        {isSuperAdmin ? (
          <BranchSelect
            setSelectedBranchDetails={setSelectedBranchDetails}
            setGotList={setGotList}
            setEmployeeDetails={setEmployeeDetails}
          />
        ) : isCircleAdmin ? (
          <TextField
            value={selectedBranchDetails?.text}
            aria-readonly
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: 3 },
            }}
            InputProps={{
              inputProps: { style: { textAlign: "center" } },
            }}
          />
        ) : null}
      </Grid>
      <Grid item xs={12} md={6}>
        {selectedBranchDetails && gotList && (
          <EmployeeSelect
            employeeList={employeeList}
            setEmployeeDetails={setEmployeeDetails}
            setUpdateRegisteredUserTable={setUpdateRegisteredUserTable}
          />
        )}
      </Grid>

      {/* Second Row - Employee Details */}
      <Grid item xs={12}>
        {employeeDetails && (
          <>
            <Card
              sx={{
                boxShadow: `0px 4px 12px ${theme.palette.secondary.light}`,
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
                  Employee Details
                </Typography>
                <UserInfo
                  userData={employeeDetails}
                  selectedBranchDetails={selectedBranchDetails}
                  setUpdateRegisteredUserTable={setUpdateRegisteredUserTable}
                />
              </CardContent>
            </Card>
          </>
        )}
      </Grid>

      {/* Third Row - Employee Table */}
      <Grid item xs={12}>
        {selectedBranchDetails && (
          <Card
            sx={{
              boxShadow: `0px 4px 12px ${theme.palette.secondary.light}`,
              mt: 2,
            }}
          >
            <CardContent>
              <UserTable
                selectedBranchDetails={selectedBranchDetails}
                updateRegisteredUserTable={updateRegisteredUserTable}
              ></UserTable>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
}
