import React, { useState ,useEffect} from "react";
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
  IconButton,
  Dialog,

} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import debounce from "lodash/debounce";
import { Add, Remove } from "@mui/icons-material";
import { differenceInDays } from "date-fns";
const HotelBookingForm = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState("");
  const [nationality, setNationality] = useState("India");
  const [country, setCountry] = useState("India");
  const [specialCategory, setSpecialCategory] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searching, setSearching] = useState(true); // To track if the search should continue or not
  const [selectedLocation, setSelectedLocation] = useState(null);
  let currentPage = 0;
  const [rooms, setRooms] = useState([{ adults: 1, children: 0, childAges: [] }]);
  const [summary, setSummary] = useState("Select Rooms & Persons");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checkinDate, setCheckinDate] = useState(''); // Store checkin date from form
  const [checkoutDate, setCheckoutDate] = useState(''); // Store checkout date from form
  const [numberOfAdults, setNumberOfAdults] = useState(1); // Default number of adults
  const [numberOfChildren, setNumberOfChildren] = useState(0); // Default number of children
  const [childAge, setChildAge] = useState([]); // Array of child ages
  const [ratings, setRatings] = useState([3, 4, 5]); // Default selected ratings
  
  const [error, setError] = useState(null); // Error message if API call fails
  const [hotels, setHotels] = useState([]); 

  const [searchIds, setSearchIds] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const calculateNights = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const start = new Date(checkinDate);
    const end = new Date(checkoutDate);
    return Math.round(Math.abs((start - end) / oneDay));
  };
  useEffect(() => {
    console.log("Hotel Data Updated:", hotelData);
  }, [hotelData]);

  const fetchHotels = async () => {
    if (!selectedLocation || !checkinDate || !checkoutDate) {
      setError("Please fill in all required fields");
      return;
    }
    if (numberOfChildren > 0 && (!childAge || childAge.length !== numberOfChildren)) {
      setError("Please provide the correct age for each child");
      return;
    }
    setLoading(true);
    setError(null);
  
    const requestBody = {
      searchQuery: {
        checkinDate,
        checkoutDate,
        roomInfo: [
          {
            numberOfAdults,
            numberOfChild: numberOfChildren,
            childAge,
          },
        ],
        searchCriteria: {
          city: selectedLocation,
          nationality: "106",
          currency: "INR",
        },
        searchPreferences: {
          ratings,
          fsc: true,
        },
      },
      sync: false,
    };
  
    try {
      const response = await axios.post(
        'https://tripjack.com/hms/v1/hotel-searchquery-list',
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            "apikey": "610720564f329c1c-ae91-4b19-b5b0-6083cb2fb172",
          },
        }
      );
  
      const searchIds = response.data?.searchIds || [];
      setSearchIds(searchIds); // Store search IDs
      console.log("Search IDs Captured:", searchIds);
  
      // Call the second API for each searchId
      if (searchIds.length > 0) {
        for (const searchId of searchIds) {
          await fetchHotelSearch(searchId);
        }
      } else {
        console.log("No Search IDs returned.");
      }
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setError("Failed to fetch hotels. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
    
    

    //3api hotel search
    const fetchHotelSearch = async (searchId) => {
      const apiKey = '610720564f329c1c-ae91-4b19-b5b0-6083cb2fb172';
      const url = 'https://tripjack.com/hms/v1/hotel-search';
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
            'apikey': ` 610720564f329c1c-ae91-4b19-b5b0-6083cb2fb172`, // Ensure format
          },
          body: JSON.stringify({ searchId }),
        });
    
        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(errorDetails.message || 'Failed to fetch hotel data');
        }
    
        const data = await response.json();
        if (data) {
  navigate('/resultpage', { state: { hotelData: data } });
} else {
  navigate('/resultpage', { state: { message: 'No data found' } });
}
    
        // Append hotel data to the state
        setHotelData((prevData) => [...prevData, data]);
      } catch (error) {
        console.error(`Error fetching data for Search ID ${searchId}:`, error);
        setError(`Failed to fetch data for Search ID ${searchId}`);
      }
    };
    
    

  



  const updateSummary = () => {
    const totalRooms = rooms.length;
    const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
    const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);

    setSummary(
      `${totalRooms} Room${totalRooms > 1 ? "s" : ""} ${totalAdults} Adult${totalAdults > 1 ? "s" : ""} ${totalChildren} Child${totalChildren > 1 ? "ren" : ""}`
    );
    setDialogOpen(false);
  };

  const addRoom = () => {
    setRooms([...rooms, { adults: 1, children: 0, childAges: [] }]);
  };

  const removeRoom = (index) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
  };

  const updateAdults = (index, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index].adults = Math.max(1, updatedRooms[index].adults + value);
    setRooms(updatedRooms);
    setNumberOfAdults(updatedRooms.reduce((sum, room) => sum + room.adults, 0)); // Update numberOfAdults
};

const updateChildren = (index, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index].children = Math.max(0, updatedRooms[index].children + value);

    if (value > 0) {
        updatedRooms[index].childAges.push(null); // Add a placeholder for child age
    } else {
        updatedRooms[index].childAges.pop(); // Remove the last child's age
    }

    setRooms(updatedRooms);
    setNumberOfChildren(updatedRooms.reduce((sum, room) => sum + room.children, 0)); // Update numberOfChildren
};

// Update child age
const updateChildAge = (roomIndex, childIndex, age) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex].childAges[childIndex] = age;
    setRooms(updatedRooms);
    setChildAge(updatedRooms.flatMap(room => room.childAges)); // Update childAge with all ages
};

  const maxRooms = 5;
  const calculateSummary = () => {
    const totalRooms = rooms.length;
    const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
    const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);
  
    setSummary(`${totalRooms} Room${totalRooms > 1 ? "s" : ""} ${totalAdults} Adult${totalAdults > 1 ? "s" : ""} ${totalChildren} Child${totalChildren > 1 ? "ren" : ""}`);
    setDialogOpen(false); // Close the dropdown after "Done"
  };
  


  

  

  const fetchLocations = async (inputValue, next = "") => {
    console.log("Fetching locations with input value:", inputValue); // Log input value

    setLoading(true);
    setNoResults(false);

    try {
      // Construct the API endpoint
      const endpoint = `https://tripjack.com/hms/v1/static-cities/${next}`;
      console.log("API endpoint:", endpoint); // Log the endpoint being hit

      const response = await axios.get(endpoint, {
        headers: {
          "Content-Type": "application/json",
          apikey: "610720564f329c1c-ae91-4b19-b5b0-6083cb2fb172",
        },
      });

      const { cil = [], next: nextPage = null } = response.data?.response || {};
      console.log("API Response:", response.data); // Log full response data

      // Filter locations based on the user's input
      const filteredLocations = cil.filter((location) =>
        location.fullRegionName.toLowerCase().includes(inputValue.toLowerCase())
      );

      console.log("Filtered Locations:", filteredLocations); // Log filtered locations

      // Remove duplicates by using a Set on the id
      setLocations((prev) => {
        const uniqueLocations = [
          ...new Map(prev.concat(filteredLocations).map((item) => [item.id, item])).values(),
        ];
        console.log("Unique Locations after filtering duplicates:", uniqueLocations);
        return uniqueLocations;
      });

      // If no locations are found and there are more pages, fetch the next page
      if (filteredLocations.length === 0 && nextPage) {
        console.log("No locations found, fetching next page:", nextPage); // Log if no results found
        return fetchLocations(inputValue, nextPage);
      }

      // Stop searching if no results found in the current page
      if (filteredLocations.length === 0 && !nextPage) {
        console.log("No results found, end of search"); // Log when no results are found
        setNoResults(true);
      }

      // Continue fetching if there is a `nextPage`
      if (nextPage) {
        console.log("Fetching next page with ID:", nextPage); // Log next page ID
        return fetchLocations(inputValue, nextPage);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLocations([]);
      setNoResults(true);
    } finally {
      console.log("Finished fetching locations"); // Log when done
      setLoading(false);
    }
  };

  const handleLocationInputChange = debounce((event, value) => {
    console.log("Location input changed:", value); // Log input value
    if (value.length > 2 && searching) {
      currentPage = 0; // Reset page count for a new search
      setLocations([]); // Clear previous locations
      fetchLocations(value);
    } else {
      setLocations([]);
      setNoResults(false);
    }
  }, 300);

  // When the user selects a location, stop the search
  const handleLocationSelect = (event, value) => {
    console.log("User selected location:", value);
    setSearching(false); // Stop searching after selection
    // You can now handle the selection (e.g., set the location, etc.)
    setSelectedLocation(value.id);
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
                label: location.fullRegionName,
                id: location.id,
              }))}
              onInputChange={handleLocationInputChange}
              onChange={handleLocationSelect} // Handle selection
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
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
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
                </Box>
              )}
            />
            {noResults && (
              <Typography
                variant="body2"
                color="error"
                sx={{ mt: 1, color: "white" }}
              >
                      
              </Typography>
            )}
          </Grid>
          {/* Check-in */}
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="date"
              label="Check in"
              value={checkinDate}
          onChange={(e) => setCheckinDate(e.target.value)}
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
              value={checkoutDate}
              onChange={(e) => setCheckoutDate(e.target.value)}
              InputLabelProps={{ shrink: true, style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
            />
          </Grid>

          {/* Nights */}
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              type="number"
              label="Total Night"
              value={calculateNights()}
              placeholder="e.g., 2"
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
            />
          </Grid>

          






          {/* Persons & Rooms */}
          <Grid item xs={12} md={3}>
          <Select
        fullWidth
        displayEmpty
        value=""
        inputProps={{ style: { color: "white" } }}
        onClick={() => setDialogOpen(true)} // Open the dialog for room editing
        sx={{ color: "white" }}
      >
        <MenuItem value="" disabled>
          {summary}
        </MenuItem>
      </Select>

      {/* Room Editing Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <Box p={3}>
          {rooms.map((room, roomIndex) => (
            <Box
              key={roomIndex}
              sx={{
                border: "1px solid lightgray",
                borderRadius: 2,
                padding: 2,
                mb: 2,
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Room {roomIndex + 1}
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <Typography>Adults</Typography>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      onClick={() => updateAdults(roomIndex, -1)}
                    >
                      <Remove />
                    </IconButton>
                    <Typography>{room.adults}</Typography>
                    <IconButton
                      onClick={() => updateAdults(roomIndex, 1)}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Typography>Children</Typography>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      onClick={() => updateChildren(roomIndex, -1)}
                    >
                      <Remove />
                    </IconButton>
                    <Typography>{room.children}</Typography>
                    <IconButton
                      onClick={() => updateChildren(roomIndex, 1)}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  {room.children > 0 && (
                    <>
                      <Typography>Child Ages</Typography>
                      {room.childAges.map((age, childIndex) => (
                        <Select
                          key={childIndex}
                          value={age || ""}
                          onChange={(e) =>
                            updateChildAge(roomIndex, childIndex, e.target.value)
                          }
                          sx={{ minWidth: 80 }}
                        >
                          {[...Array(18).keys()].map((age) => (
                            <MenuItem key={age} value={age + 1}>
                              {age + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      ))}
                    </>
                  )}
                </Grid>
              </Grid>
              {roomIndex > 0 && (
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => removeRoom(roomIndex)}
                >
                  Remove Room
                </Button>
              )}
            </Box>
          ))}
          {rooms.length < 5 && (
            <Button variant="contained" onClick={addRoom} sx={{ mb: 2 }}>
              Add Room
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={updateSummary}
            fullWidth
          >
            Done
          </Button>
        </Box>
      </Dialog>
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
    onClick={fetchHotels} // Trigger first API and subsequent calls
  >
    Search
  </Button>
</Grid>

        </Grid>

        {/* Filters */}
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