import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const HotelBookingForm = () => {
  const [rating, setRating] = useState("");
  const [nationality, setNationality] = useState("India");
  const [country, setCountry] = useState("India");
  const [specialCategory, setSpecialCategory] = useState(false);
  const [locations, setLocations] = useState([]); // For storing API results
  const [loading, setLoading] = useState(false); // Loader state for location API

  
  const fetchLocations = async (inputValue, next = "") => {
  setLoading(true);
  try {
    const endpoint = `https://tripjack.com/hms/v1/static-cities/${next}`;
    const response = await axios.get(endpoint, {
      headers: {
        "Content-Type": "application/json",
        "apikey": "610720564f329c1c-ae91-4b19-b5b0-6083cb2fb172",
      },
    });

    // Check if response.data and response.data.response are defined
    const { cil = [], next: nextPage = null } = response.data?.response || {};

    // Enhanced filtering logic: Check if any word in fullRegionName includes the input value
    let filteredLocations = cil.filter((location) => {
      const words = location.fullRegionName.toLowerCase().split(/\s+/); // Split into words
      return words.some((word) => word.includes(inputValue.toLowerCase()));
    });

    if (filteredLocations.length === 0 && nextPage) {
      // If no matches found, fetch the next page
      return fetchLocations(inputValue, nextPage);
    }

    setLocations(filteredLocations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    setLocations([]); // Clear locations on error
  } finally {
    setLoading(false);
  }
};

  // Handle location input changes
  const handleLocationInputChange = (event, value) => {
    if (value.length > 2) {
      fetchLocations(value);
    } else {
      setLocations([]); // Clear locations if input is too short
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "white", textAlign: "center", mb: 3 }}
        >
          Book your stay with India's largest network of Hotels
        </Typography>
        <Grid container spacing={2} alignItems="center">
          {/* Location */}
          <Grid item xs={12} md={3}>
            <Autocomplete
              freeSolo
              options={locations.map((location) => ({
                label: `${location.cityName}, ${location.countryName},`,
                id: location.id,
                fullRegionName: location.fullRegionName,
              }))}
              onInputChange={handleLocationInputChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Location"
                  variant="outlined"
                  placeholder="Enter destination"
                  InputProps={{
                    ...params.InputProps,
                    style: { color: "white" },
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  InputLabelProps={{ style: { color: "white" } }}
                />
              )}
              renderOption={(props, option) => (
                <Box {...props} key={option.id}>
                  <Typography variant="body1">{option.label}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {option.fullRegionName}
                  </Typography>
                </Box>
              )}
            />
          </Grid>

          {/* Check-in */}
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="date"
              label="Check in"
              InputLabelProps={{ shrink: true, style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
            />
          </Grid>

          {/* Check-out */}
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="date"
              label="Check out"
              InputLabelProps={{ shrink: true, style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
            />
          </Grid>

          {/* Nights */}
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="number"
              label="Total Night(s)"
              placeholder="e.g., 2"
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
          </Grid>

          {/* Persons & Rooms */}
          <Grid item xs={12} md={3}>
            <Select
              fullWidth
              defaultValue="1 Room 2 Adults 0 Child"
              displayEmpty
              inputProps={{ style: { color: "white" } }}
              sx={{ color: "white" }}
            >
              <MenuItem value="1 Room 2 Adults 0 Child">1 Room 2 Adults 0 Child</MenuItem>
              <MenuItem value="1 Room 1 Adult 0 Child">1 Room 1 Adult 0 Child</MenuItem>
              <MenuItem value="2 Rooms 4 Adults 2 Children">2 Rooms 4 Adults 2 Children</MenuItem>
            </Select>
          </Grid>

          {/* Search Button */}
          <Grid item xs={12} md={1}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff6600",
                color: "white",
                "&:hover": { backgroundColor: "#e65c00" },
                width: "100%",
                height: "100%",
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        {/* More Options */}
        <Box
          mt={3}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: 2,
            borderRadius: 2,
          }}
        >
          {/* Rating */}
          <Box>
            <Typography variant="body1" sx={{ color: "white", mr: 1 }}>
              Rating
            </Typography>
            <Select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              sx={{ color: "white", minWidth: 120 }}
            >
              <MenuItem value="1 Star">1 Star</MenuItem>
              <MenuItem value="2 Star">2 Star</MenuItem>
              <MenuItem value="3 Star">3 Star</MenuItem>
              <MenuItem value="4 Star">4 Star</MenuItem>
              <MenuItem value="5 Star">5 Star</MenuItem>
            </Select>
          </Box>

          {/* Nationality */}
          <Box>
            <Typography variant="body1" sx={{ color: "white", mr: 1 }}>
              Nationality
            </Typography>
            <Select
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              sx={{ color: "white", minWidth: 120 }}
            >
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="UK">UK</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
            </Select>
          </Box>

          {/* Country of Residence */}
          <Box>
            <Typography variant="body1" sx={{ color: "white", mr: 1 }}>
              Country of Residence
            </Typography>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              sx={{ color: "white", minWidth: 120 }}
            >
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="UK">UK</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
            </Select>
          </Box>

          {/* Special Category */}
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={specialCategory}
                  onChange={(e) => setSpecialCategory(e.target.checked)}
                  sx={{ color: "white" }}
                />
              }
              label={
                <Typography variant="body1" sx={{ color: "white" }}>
                  Special Category
                </Typography>
              }
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HotelBookingForm;


