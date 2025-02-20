import React from "react";
import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import { Twitter, Facebook, Instagram, GitHub } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#f9f9f9", py: 5, px: 3 }}>
      <Grid container spacing={4} justifyContent="center">
        {/* About Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            About
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
  <img src="../images/logo.jpeg" alt="TravUnited Logo" max-width="150" height="50" style={{ marginRight: 5 }} />
 
</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
          Travunited of India Pvt. Ltd. provide excellent services for all travel
           related services around the globe such as Air Tickets, Holiday Packages, 
           Tour Packages, Hajj & Umrah Packages, Visa & Passport, Travel Insurance etc
          </Typography>
          
          <Box mt={2}>
            <IconButton>
              <Twitter />
            </IconButton>
            <IconButton>
              <Facebook />
            </IconButton>
            <IconButton>
              <Instagram />
            </IconButton>
            <IconButton>
              <GitHub />
            </IconButton>
          </Box>
        </Grid>

        {/* Company Section */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6" gutterBottom style={{padding:"5px"}}>
            Company
          </Typography>
          <Typography variant="body2" style={{padding:"5px"}}>
            <Link href="#" underline="none" color="inherit">
              About
            </Link>
          </Typography>
          <Typography variant="body2" style={{padding:"5px"}}>
            <Link href="#" underline="none" color="inherit">
              Features
            </Link>
          </Typography> 
          <Typography variant="body2" style={{padding:"5px"}}>
            <Link href="#" underline="none" color="inherit">
              Works
            </Link>
          </Typography>
          <Typography variant="body2" style={{padding:"5px"}}>
            <Link href="#" underline="none" color="inherit">
              Career
            </Link>
          </Typography>
        </Grid>

        {/* Help Section */}
        <Grid item xs={12} md={2}>
          <Typography variant="h6" gutterBottom style={{padding:"5px"}}>
            Help
          </Typography>
          <Typography variant="body2" style={{padding:"5px"}}>
            <Link href="#" underline="none" color="inherit">
              Customer Support
            </Link>
          </Typography>
          <Typography variant="body2" style={{padding:"5px"}}>
            <Link href="#" underline="none" color="inherit">
              Delivery Details
            </Link>
          </Typography>
          <Typography variant="body2" style={{padding:"5px"}}>
            <Link href="#" underline="none" color="inherit">
              Terms & Conditions
            </Link>
          </Typography>
          <Typography variant="body2" style={{padding:"5px"}}>
            <Link href="#" underline="none" color="inherit">
              Privacy Policy
            </Link>
          </Typography>
        </Grid>

        {/* Resources Section */}
        <Grid item xs={12} md={2} 
        >
          <Typography variant="h6" gutterBottom style={{padding:"5px"}}>
            Resources
          </Typography>
          <Typography variant="body2" style={{padding:"5px"}}>
            <Link href="#" underline="none" color="inherit">
              Free eBooks
            </Link>
          </Typography>
          <Typography variant="body2" style={{padding:"5px"}}>
            <Link href="#" underline="none" color="inherit">
              Development Tutorial
            </Link>
          </Typography>
          <Typography variant="body2" style={{padding:"5px"}}>
            <Link href="#" underline="none" color="inherit">
              How to - Blog
            </Link>
          </Typography>
          <Typography variant="body2" style={{padding:"5px"}}>
            <Link href="#" underline="none" color="inherit">
              YouTube Playlist
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
