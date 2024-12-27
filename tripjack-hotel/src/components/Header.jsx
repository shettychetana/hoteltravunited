// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   IconButton,
// } from "@mui/material";

// const Header = () => {
//   return (
//     <AppBar position="static" sx={{ backgroundColor: "#ff6600" }}>
//       <Toolbar sx={{ justifyContent: "space-between" }}>
//         {/* Logo */}
//         <Box display="flex" alignItems="center">
//           <img
//             src="/images/logo.jpeg"// Replace with your logo
//             alt="Logo"
//             style={{ height: "40px", marginRight: "8px",borderRadius:"25px" }}
//           />
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: "bold",
//               fontSize: "1.2rem",
//               color: "white",
//               textTransform: "uppercase",
//             }}
//           >
           
//           </Typography>
//         </Box>

//         {/* Navigation Links */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "20px",
//           }}
//         >
//           {["Home", "Visa", "Flights", "Packages", "Hotels", "Contact", "Help"].map(
//             (item, index) => (
//               <Button
//                 key={index}
//                 sx={{
//                   color: "white",
//                   fontWeight: "bold",
//                   fontSize: "0.9rem",
//                   textTransform: "capitalize",
//                 }}
//               >
//                 {item}
//               </Button>
//             )
//           )}
//           {/* Dropdown Menu Placeholder */}
//           <Typography
//             sx={{
//               color: "white",
//               fontWeight: "bold",
//               fontSize: "0.9rem",
//               textTransform: "capitalize",
//             }}
//           >
//             INR
//           </Typography>
//         </Box>

//         {/* Buttons */}
//         <Box
//           display="flex"
//           alignItems="center"
//           gap={2}
//         >
//           <Button
//             sx={{
//               color: "white",
//               fontWeight: "bold",
//               fontSize: "0.9rem",
//               textTransform: "capitalize",
//             }}
//           >
//             Sign up
//           </Button>
//           <Button
//             variant="outlined"
//             sx={{
//               color: "white",
//               borderColor: "white",
//               fontWeight: "bold",
//               fontSize: "0.9rem",
//               textTransform: "capitalize",
//               "&:hover": {
//                 borderColor: "white",
//                 backgroundColor: "rgba(255, 255, 255, 0.1)",
//               },
//             }}
//           >
//             Log in
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
// import React from "react";
// import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
// import { Flight, Hotel, Assignment, BeachAccess } from "@mui/icons-material"; // Importing Material-UI icons

// const Header = () => {
//   return (
//     <AppBar position="static" style={{ backgroundColor: "#ff7043" }}>
//       <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
//         {/* Logo Section */}
//         <Box display="flex" alignItems="center">
//           <img
//              src="/images/logo.jpeg"// Replace with your logo
//              alt="Logo"
//              style={{ height: "40px", marginRight: "8px",borderRadius:"25px" }}
//            />
//            <Typography
//              variant="h6"
//              sx={{
//                fontWeight: "bold",
//                fontSize: "1.2rem",
//                color: "white",
//                textTransform: "uppercase",
//              }}
//           >
           
//           </Typography>
//          </Box>

//         {/* Navigation Section */}
//         <Box style={{ display: "flex", alignItems: "center", gap: "20px" }}>
//           <Button color="inherit" startIcon={<Assignment />}>
//             Visa
//           </Button>
//           <Button color="inherit" startIcon={<Flight />}>
//             Flights
//           </Button>
//           <Button color="inherit" startIcon={<Hotel />}>
//             Hotels
//           </Button>
//           <Button color="inherit" startIcon={<BeachAccess />}>
//             Holiday
//           </Button>
//           <Button color="inherit">Packages</Button>
//           <Button color="inherit">Contact</Button>
//           <Button color="inherit">Help</Button>
//         </Box>

//         {/* Authentication Section */}
//         <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <Button color="inherit">Sign Up</Button>
//           <Button
//             variant="outlined"
//             color="inherit"
//             style={{ border: "1px solid white", borderRadius: "20px" }}
//           >
//             Log In
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Divider,
//   Breadcrumbs,
//   Link,
// } from "@mui/material";
// import { Menu as MenuIcon, Flight, Hotel, Assignment, BeachAccess } from "@mui/icons-material";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";

// const Header = () => {
//   const [mobileOpen, setMobileOpen] = useState(false); // State to control drawer
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   // Mobile Drawer Content
//   const drawer = (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={handleDrawerToggle}
//       onKeyDown={handleDrawerToggle}
//     >
//       <List>
//         <ListItem>
//           <Typography variant="h6" style={{ fontWeight: "bold" }}>
//             TravUnited
//           </Typography>
//         </ListItem>
//         <Divider />
//         <ListItemButton>
//           <Assignment style={{ marginRight: "8px" }} />
//           <ListItemText primary="Visa" />
//         </ListItemButton>
//         <ListItemButton>
//           <Flight style={{ marginRight: "8px" }} />
//           <ListItemText primary="Flights" />
//         </ListItemButton>
//         <ListItemButton>
//           <Hotel style={{ marginRight: "8px" }} />
//           <ListItemText primary="Hotels" />
//         </ListItemButton>
//         <ListItemButton>
//           <BeachAccess style={{ marginRight: "8px" }} />
//           <ListItemText primary="Holiday" />
//         </ListItemButton>
//         <ListItemButton>
//           <ListItemText primary="Packages" />
//         </ListItemButton>
//         <ListItemButton>
//           <ListItemText primary="Contact" />
//         </ListItemButton>
//         <ListItemButton>
//           <ListItemText primary="Help" />
//         </ListItemButton>
//       </List>
//       <Divider />
//       <Box sx={{ padding: "8px 16px" }}>
//         <Button color="inherit" fullWidth>
//           Sign Up
//         </Button>
//         <Button
//           variant="outlined"
//           color="inherit"
//           fullWidth
//           style={{ marginTop: "8px", border: "1px solid #ff7043" }}
//         >
//           Log In
//         </Button>
//       </Box>
//     </Box>
//   );

//   return (
//     <>
//       <AppBar position="static" style={{ backgroundColor: "#ff7043" }}>
//       <Toolbar 
//   style={{
//     display: "flex", 
//     justifyContent: "space-between", // Distributes space between logo and navigation
//     alignItems: "center",
//   }}
// >
//   {/* Navigation Section for Desktop */}
//   {!isMobile && (
//     <Box style={{ display: "flex", alignItems: "center", gap: "20px" }}>
//       <Button color="inherit" startIcon={<Assignment />}>
//         Visa
//       </Button>
//       <Button color="inherit" startIcon={<Flight />}>
//         Flights
//       </Button>
//       <Button color="inherit" startIcon={<Hotel />}>
//         Hotels
//       </Button>
//       <Button color="inherit" startIcon={<BeachAccess />}>
//         Holiday
//       </Button>
//       <Button color="inherit">Contact</Button>
//       <Button color="inherit">Help</Button>
//     </Box>
//   )}

//   {/* Authentication Section */}
//   {!isMobile && (
//     <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//       <Button color="inherit">Sign Up</Button>
//       <Button
//         variant="outlined"
//         color="inherit"
//         style={{ border: "1px solid white", borderRadius: "20px" }}
//       >
//         Log In
//       </Button>
//     </Box>
//   )}

//   {/* Logo Section */}
//   <Box display="flex" alignItems="center">
//     <img
//       src="/images/logo.jpeg" // Replace with your logo
//       alt="Logo"
//       style={{ height: "40px", marginRight: "8px", borderRadius: "25px" }}
//     />
//     {!isMobile && (
//       <Typography
//         variant="h6"
//         sx={{
//           fontWeight: "bold",
//           fontSize: "1.2rem",
//           color: "white",
//           textTransform: "uppercase",
//         }}
//       >
//         TravUnited
//       </Typography>
//     )}
//   </Box>

//   {/* Mobile Menu Icon */}
//   {isMobile && (
//     <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
//       <MenuIcon />
//     </IconButton>
//   )}
// </Toolbar>

//         {/* Breadcrumb Section */}
//         <Box
//           sx={{
//             backgroundColor: "#fff5f0",
//             color: "#ff7043",
//             padding: "8px 16px",
//           }}
//         >
//           <Breadcrumbs aria-label="breadcrumb">
//             <Link underline="hover" color="inherit" href="/">
//               Home
//             </Link>
//             <Link underline="hover" color="inherit" href="/flights">
//               Flights
//             </Link>
//             <Typography color="textPrimary">Current Page</Typography>
//           </Breadcrumbs>
//         </Box>
//       </AppBar>

//       {/* Drawer for Mobile Menu */}
//       <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
//         {drawer}
//       </Drawer>
//     </>
//   );
// };

// export default Header;
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
  const [mobileOpen, setMobileOpen] = useState(false); // State to control drawer
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
          style={{ marginTop: "8px", border: "1px solid #ff7043" }}
        >
          Log In
        </Button>
      </Box> */}
    </Box>
  );

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#ff7043" }}>
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
