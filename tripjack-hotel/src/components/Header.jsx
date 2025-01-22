
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Menu as MenuIcon, Flight, Hotel, Assignment, BeachAccess } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false); 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Mobile Drawer Content
  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        <ListItem>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            TravUnited
          </Typography>
        </ListItem>
        <Divider />
        <ListItemButton>
          <Assignment style={{ marginRight: "8px" }} />
          <ListItemText primary="Visa" />
        </ListItemButton>
        <ListItemButton>
          <Flight style={{ marginRight: "8px" }} />
          <ListItemText primary="Flights" />
        </ListItemButton>
        <ListItemButton>
          <Hotel style={{ marginRight: "8px" }} />
          <ListItemText primary="Hotels" />
        </ListItemButton>
        <ListItemButton>
          <BeachAccess style={{ marginRight: "8px" }} />
          <ListItemText primary="Holiday" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Packages" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Contact" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Help" />
        </ListItemButton>
      </List>
      <Divider />
      {/* <Box sx={{ padding: "8px 16px" }}>
        <Button color="inherit" fullWidth>
          Sign Up
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          fullWidth
          style={{ marginTop: "8px", border: "1px solidrgb(134, 114, 107)" }}
        >
          Log In
        </Button>
      </Box> */}
    </Box>
  );

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#ff6748" }}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo Section */}
          <Box display="flex" alignItems="center">
            <img
              src="/images/logo.jpeg" // Replace with your logo
              alt="Logo"
              style={{ height: "40px", marginRight: "8px", borderRadius: "25px" }}
            />
            {!isMobile && (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                TravUnited
              </Typography>
            )}
          </Box>

          {/* Navigation Section */}
          {!isMobile && (
            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
              <Button color="inherit" startIcon={<Assignment />}>
                Visa
              </Button>
              <Button color="inherit" startIcon={<Flight />}>
                Flights
              </Button>
              <Button color="inherit" startIcon={<Hotel />}>
                Hotels
              </Button>
              <Button color="inherit" startIcon={<BeachAccess />}>
                Holiday
              </Button>
              <Button color="inherit">Contact</Button>
              <Button color="inherit">Help</Button>
              {/* <Button color="inherit">Sign Up</Button> */}
              {/* <Button
                variant="outlined"
                color="inherit"
                style={{ border: "1px solid white", borderRadius: "20px" }}
              >
                Log In
              </Button> */}
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>

      </AppBar>

      {/* Drawer for Mobile Menu */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
