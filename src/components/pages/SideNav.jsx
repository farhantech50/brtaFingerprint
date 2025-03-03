import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useLocation } from "react-router-dom";
import { useSidebar } from "../../contexts/SidebarContext";
import { useMediaQuery, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { open, toggleSidebar } = useSidebar(); // Get open state and function to toggle
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect small screens

  const menuItems = [
    { text: "Dashboard", icon: <HomeIcon />, path: "/" },
    {
      text: "Register User",
      icon: <PermContactCalendarIcon />,
      path: "/register",
    },
    { text: "Assign Role", icon: <DashboardCustomizeIcon />, path: "/assign" },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MuiDrawer
        variant={isMobile ? "temporary" : "permanent"} // Temporary on mobile
        open={open}
        onClose={toggleSidebar} // Close on mobile when clicking outside
        sx={{
          width: open ? drawerWidth : isMobile ? 0 : 70,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : isMobile ? 0 : 70,
            transition: "width 0.3s ease",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={toggleSidebar}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) toggleSidebar(); // Close sidebar after selection on mobile
                  }}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    bgcolor: isSelected ? "secondary.main" : "transparent",
                    "&:hover": { bgcolor: "secondary.light" },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      color: isSelected ? "white" : "inherit",
                      mr: open ? 3 : "auto",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={<Typography variant="h6">{item.text}</Typography>}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: isSelected ? "white" : "inherit",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </MuiDrawer>
    </Box>
  );
}
