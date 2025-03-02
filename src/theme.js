// src/theme.js
import { createTheme } from "@mui/material/styles";

// Create the theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#214e96",
    },
    secondary: {
      main: "#327bf0",
      light: "#6ea0f0",
    },
  },
  breakpoints: {
    values: {
      xs: 0, // Extra-small devices (phones)
      sm: 600, // Small devices (tablets)
      md: 960, // Medium devices (small laptops)
      lg: 1280, // Large devices (desktops)
      xl: 1920, // Extra-large screens
    },
  },
  typography: {
    fontFamily: ["Rubik", "sans-serif"].join(","), // Set Rubik font as default
    fontSize: 13, // Set the default font size to 13px
    fontWeightLight: 200, // Set light font weight to 200
    h1: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 40,
      fontWeight: 200, // Font weight for h1
    },
    h2: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 32,
      fontWeight: 200, // Font weight for h2
    },
    h3: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 24,
      fontWeight: 200, // Font weight for h3
    },
    h4: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 400, // Font weight for h4
    },
    h5: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 16,
      fontWeight: 200, // Font weight for h5
    },
    h6: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 500, // Font weight for h6
    },
  },
  spacing: 8, // Default spacing (padding/margin)
});

export default theme;
