import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import theme from "./theme"; // Import the theme you created

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <SidebarProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </SidebarProvider>
  </AuthContextProvider>
);
