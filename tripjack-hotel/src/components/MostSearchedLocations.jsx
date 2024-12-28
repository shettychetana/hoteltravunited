import React from "react";
import { Box, Typography } from "@mui/material";

const MostSearchedLocations = () => {
  const locations = [
    { name: "Delhi", places: 325, image: "../images/1.png" },
    { name: "Mumbai", places: 325, image: "../images/2.png" },
    { name: "Chennai", places: 325, image: "../images/3.png" },
    { name: "Bangalore", places: 325, image: "../images/4.png" },
    { name: "Pune", places: 325, image: "../images/5.png" },
    { name: "Hyderabad", places: 325, image: "../images/6.png" },
    { name: "Ahmedabad", places: 325, image: "../images/7.png" },
    { name: "Kolkata", places: 325, image: "../images/8.png" },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: 2, fontWeight: "bold"  }}
      >
        Most Searched Locations
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center", // Center aligns the cards
          overflowX: "auto", // Enables horizontal scrolling
          paddingBottom: 2,
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: 4,
          },
        }}
      >
        {locations.map((location, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              minWidth: "150px", // Ensures a uniform card width
            }}
          >
            <img
              src={location.image}
              alt={location.name}
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <Typography
              variant="h6"
              sx={{ marginTop: 1, fontWeight: "bold" }}
            >
              {location.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginTop: 0.5 }}
            >
              {location.places} places
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MostSearchedLocations;
