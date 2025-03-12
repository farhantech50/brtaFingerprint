import React from "react";
import IpList from "./IpList";
import { Card, CardContent, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Assign() {
  const theme = useTheme(); // Use the theme hook to access the theme
  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Card
          sx={{
            boxShadow: `0px 4px 12px ${theme.palette.secondary.light}`,
            mt: 2,
          }}
        >
          <CardContent>
            <IpList></IpList>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
