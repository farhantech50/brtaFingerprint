import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext";
import { useAuthContext } from "../contexts/authContext";
import useLogout from "../hooks/useLogout";

const AppBar = styled(
  MuiAppBar,
  {}
)(() => ({
  zIndex: 1201, // Adjust z-index to ensure the AppBar is above the content
}));

export default function NavBar() {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { setAuthUser, setToken } = useAuthContext();
  const { open, setOpen } = useSidebar();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Separate handler for Profile click
  const handleProfileClick = () => {
    console.log("Profile clicked");
    handleMenuClose(); // Close the menu after clicking
  };

  // Separate handler for Settings click
  const handleSettingsClick = () => {
    console.log("Settings clicked");
    handleMenuClose(); // Close the menu after clicking
  };
  // Separate handler for Logout click
  const handleLogoutClick = () => {
    logout();
    handleMenuClose(); // Close the menu after clicking
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
      <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "primary" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => {
              setOpen(!open);
            }}
          >
            {" "}
            <MenuIcon />
            {/* Menu Icon for Sidebar */}
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            BRTA Fingerprint Application
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
