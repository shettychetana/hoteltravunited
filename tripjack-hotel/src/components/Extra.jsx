// // import React, { useState ,useEffect} from "react";
// // import {
// //   Container,
// //   TextField,
// //   Button,
// //   Box,
// //   Typography,
// //   Grid,
// //   Select,
// //   MenuItem,
// //   Checkbox,
// //   FormControlLabel,
// //   Autocomplete,
// //   CircularProgress,
// //   IconButton,
// //   Dialog,

// // } from "@mui/material";

// // import axios from "axios";
// // import debounce from "lodash/debounce";
// // import { Add, Remove } from "@mui/icons-material";
// // const HotelBookingForm = () => {
// //   const [rating, setRating] = useState("");
// //   const [nationality, setNationality] = useState("India");
// //   const [country, setCountry] = useState("India");
// //   const [specialCategory, setSpecialCategory] = useState(false);
// //   const [locations, setLocations] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [noResults, setNoResults] = useState(false);
// //   const [searching, setSearching] = useState(true); // To track if the search should continue or not
// //   const [selectedLocation, setSelectedLocation] = useState(null);
// //   let currentPage = 0;
// //   const [rooms, setRooms] = useState([{ adults: 2, children: 0, childAges: [] }]);
// //   const [summary, setSummary] = useState("Select Rooms & Persons");
// //   const [dialogOpen, setDialogOpen] = useState(false);
// //   const [checkinDate, setCheckinDate] = useState(''); // Store checkin date from form
// //   const [checkoutDate, setCheckoutDate] = useState(''); // Store checkout date from form
// //   const [numberOfAdults, setNumberOfAdults] = useState(1); // Default number of adults
// //   const [numberOfChildren, setNumberOfChildren] = useState(0); // Default number of children
// //   const [childAge, setChildAge] = useState([]); // Array of child ages
// //   const [ratings, setRatings] = useState([3, 4, 5]); // Default selected ratings
  
// //   const [error, setError] = useState(null); // Error message if API call fails
// //   const [hotels, setHotels] = useState([]); 

// //   const [searchIds, setSearchIds] = useState([]);
// //   const [hotelData, setHotelData] = useState([]);

// //   useEffect(() => {
// //     console.log("Hotel Data Updated:", hotelData);
// //   }, [hotelData]);

// //   const fetchHotels = async () => {
// //     if (!selectedLocation || !checkinDate || !checkoutDate) {
// //       setError("Please fill in all required fields");
// //       return;
// //     }
  
// //     setLoading(true);
// //     setError(null);
  
// //     const requestBody = {
// //       searchQuery: {
// //         checkinDate,
// //         checkoutDate,
// //         roomInfo: [
// //           {
// //             numberOfAdults,
// //             numberOfChild: numberOfChildren,
// //             childAge,
// //           },
// //         ],
// //         searchCriteria: {
// //           city: selectedLocation,
// //           nationality: "106",
// //           currency: "INR",
// //         },
// //         searchPreferences: {
// //           ratings,
// //           fsc: true,
// //         },
// //       },
// //       sync: false,
// //     };
  
// //     try {
// //       const response = await axios.post(
// //         'https://tripjack.com/hms/v1/hotel-searchquery-list',
// //         requestBody,
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //             "apikey": "610720564f329c1c-ae91-4b19-b5b0-6083cb2fb172",
// //           },
// //         }
// //       );
  
// //       const searchIds = response.data?.searchIds || [];
// //       setSearchIds(searchIds); // Store search IDs
// //       console.log("Search IDs Captured:", searchIds);
  
// //       // Call the second API for each searchId
// //       if (searchIds.length > 0) {
// //         for (const searchId of searchIds) {
// //           await fetchHotelSearch(searchId);
// //         }
// //       } else {
// //         console.log("No Search IDs returned.");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching hotels:", error);
// //       setError("Failed to fetch hotels. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
  
    
    

// //     //3api hotel search
// //     const fetchHotelSearch = async (searchId) => {
// //       const apiKey = '610720564f329c1c-ae91-4b19-b5b0-6083cb2fb172';
// //       const url = 'https://tripjack.com/hms/v1/hotel-search';
    
// //       try {
// //         const response = await fetch(url, {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
            
// //             'apikey': ` 610720564f329c1c-ae91-4b19-b5b0-6083cb2fb172`, // Ensure format
// //           },
// //           body: JSON.stringify({ searchId }),
// //         });
    
// //         if (!response.ok) {
// //           const errorDetails = await response.json();
// //           throw new Error(errorDetails.message || 'Failed to fetch hotel data');
// //         }
    
// //         const data = await response.json();
// //         console.log(`Data for Search ID ${searchId}:`, data);
    
// //         // Append hotel data to the state
// //         setHotelData((prevData) => [...prevData, data]);
// //       } catch (error) {
// //         console.error(`Error fetching data for Search ID ${searchId}:`, error);
// //         setError(`Failed to fetch data for Search ID ${searchId}`);
// //       }
// //     };
    
    

  



// //   const updateSummary = () => {
// //     const totalRooms = rooms.length;
// //     const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
// //     const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);

// //     setSummary(
// //       `${totalRooms} Room${totalRooms > 1 ? "s" : ""} ${totalAdults} Adult${totalAdults > 1 ? "s" : ""} ${totalChildren} Child${totalChildren > 1 ? "ren" : ""}`
// //     );
// //     setDialogOpen(false);
// //   };

// //   const addRoom = () => {
// //     setRooms([...rooms, { adults: 1, children: 0, childAges: [] }]);
// //   };

// //   const removeRoom = (index) => {
// //     const updatedRooms = rooms.filter((_, i) => i !== index);
// //     setRooms(updatedRooms);
// //   };

// //   const updateAdults = (index, value) => {
// //     const updatedRooms = [...rooms];
// //     updatedRooms[index].adults = Math.max(1, updatedRooms[index].adults + value);
// //     setRooms(updatedRooms);
// //   };

// //   const updateChildren = (index, value) => {
// //     const updatedRooms = [...rooms];
// //     updatedRooms[index].children = Math.max(0, updatedRooms[index].children + value);

// //     if (value > 0) {
// //       updatedRooms[index].childAges.push(null); // Add a placeholder for child age
// //     } else {
// //       updatedRooms[index].childAges.pop(); // Remove the last child's age
// //     }

// //     setRooms(updatedRooms);
// //   };

// //   const updateChildAge = (roomIndex, childIndex, age) => {
// //     const updatedRooms = [...rooms];
// //     updatedRooms[roomIndex].childAges[childIndex] = age;
// //     setRooms(updatedRooms);
// //   };

// //   const maxRooms = 5;
// //   const calculateSummary = () => {
// //     const totalRooms = rooms.length;
// //     const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
// //     const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);
  
// //     setSummary(`${totalRooms} Room${totalRooms > 1 ? "s" : ""} ${totalAdults} Adult${totalAdults > 1 ? "s" : ""} ${totalChildren} Child${totalChildren > 1 ? "ren" : ""}`);
// //     setDialogOpen(false); // Close the dropdown after "Done"
// //   };
  


  

  

// //   const fetchLocations = async (inputValue, next = "") => {
// //     console.log("Fetching locations with input value:", inputValue); // Log input value

// //     setLoading(true);
// //     setNoResults(false);

// //     try {
// //       // Construct the API endpoint
// //       const endpoint = `https://tripjack.com/hms/v1/static-cities/${next}`;
// //       console.log("API endpoint:", endpoint); // Log the endpoint being hit

// //       const response = await axios.get(endpoint, {
// //         headers: {
// //           "Content-Type": "application/json",
// //           apikey: "610720564f329c1c-ae91-4b19-b5b0-6083cb2fb172",
// //         },
// //       });

// //       const { cil = [], next: nextPage = null } = response.data?.response || {};
// //       console.log("API Response:", response.data); // Log full response data

// //       // Filter locations based on the user's input
// //       const filteredLocations = cil.filter((location) =>
// //         location.fullRegionName.toLowerCase().includes(inputValue.toLowerCase())
// //       );

// //       console.log("Filtered Locations:", filteredLocations); // Log filtered locations

// //       // Remove duplicates by using a Set on the id
// //       setLocations((prev) => {
// //         const uniqueLocations = [
// //           ...new Map(prev.concat(filteredLocations).map((item) => [item.id, item])).values(),
// //         ];
// //         console.log("Unique Locations after filtering duplicates:", uniqueLocations);
// //         return uniqueLocations;
// //       });

// //       // If no locations are found and there are more pages, fetch the next page
// //       if (filteredLocations.length === 0 && nextPage) {
// //         console.log("No locations found, fetching next page:", nextPage); // Log if no results found
// //         return fetchLocations(inputValue, nextPage);
// //       }

// //       // Stop searching if no results found in the current page
// //       if (filteredLocations.length === 0 && !nextPage) {
// //         console.log("No results found, end of search"); // Log when no results are found
// //         setNoResults(true);
// //       }

// //       // Continue fetching if there is a `nextPage`
// //       if (nextPage) {
// //         console.log("Fetching next page with ID:", nextPage); // Log next page ID
// //         return fetchLocations(inputValue, nextPage);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching locations:", error);
// //       setLocations([]);
// //       setNoResults(true);
// //     } finally {
// //       console.log("Finished fetching locations"); // Log when done
// //       setLoading(false);
// //     }
// //   };

// //   const handleLocationInputChange = debounce((event, value) => {
// //     console.log("Location input changed:", value); // Log input value
// //     if (value.length > 2 && searching) {
// //       currentPage = 0; // Reset page count for a new search
// //       setLocations([]); // Clear previous locations
// //       fetchLocations(value);
// //     } else {
// //       setLocations([]);
// //       setNoResults(false);
// //     }
// //   }, 300);

// //   // When the user selects a location, stop the search
// //   const handleLocationSelect = (event, value) => {
// //     console.log("User selected location:", value);
// //     setSearching(false); // Stop searching after selection
// //     // You can now handle the selection (e.g., set the location, etc.)
// //     setSelectedLocation(value.id);
// //   };
  

// //   return (
// //     <Box
// //       sx={{
// //         backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba')`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         minHeight: "100vh",
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "center",
// //         padding: 2,
// //       }}
// //     >
// //       <Container
// //         maxWidth="lg"
// //         sx={{
// //           backgroundColor: "rgba(0, 0, 0, 0.7)",
// //           padding: 3,
// //           borderRadius: 2,
// //         }}
// //       >
// //         <Typography
// //           variant="h4"
// //           sx={{ color: "white", textAlign: "center", mb: 3 }}
// //         >
// //           Book your stay with India's largest network of Hotels
// //         </Typography>
// //         <Grid container spacing={2} alignItems="center">
// //           {/* Location */}
// //           <Grid item xs={12} md={3}>
// //             <Autocomplete
// //               freeSolo
// //               options={locations.map((location) => ({
// //                 label: location.fullRegionName,
// //                 id: location.id,
// //               }))}
// //               onInputChange={handleLocationInputChange}
// //               onChange={handleLocationSelect} // Handle selection
// //               renderInput={(params) => (
// //                 <TextField
// //                   {...params}
// //                   label="Location"
// //                   variant="outlined"
// //                   placeholder="Enter destination"
// //                   InputProps={{
// //                     ...params.InputProps,
// //                     style: { color: "white" },
// //                     endAdornment: (
// //                       <>
// //                         {loading ? (
// //                           <CircularProgress color="inherit" size={20} />
// //                         ) : null}
// //                         {params.InputProps.endAdornment}
// //                       </>
// //                     ),
// //                   }}
// //                   InputLabelProps={{ style: { color: "white" } }}
// //                 />
// //               )}
// //               renderOption={(props, option) => (
// //                 <Box {...props} key={option.id}>
// //                   <Typography variant="body1">{option.label}</Typography>
// //                 </Box>
// //               )}
// //             />
// //             {noResults && (
// //               <Typography
// //                 variant="body2"
// //                 color="error"
// //                 sx={{ mt: 1, color: "white" }}
// //               >
                      
// //               </Typography>
// //             )}
// //           </Grid>
// //           {/* Check-in */}
// //           <Grid item xs={12} md={2}>
// //             <TextField
// //               fullWidth
// //               type="date"
// //               label="Check in"
// //               value={checkinDate}
// //           onChange={(e) => setCheckinDate(e.target.value)}
// //               InputLabelProps={{ shrink: true, style: { color: "white" } }}
// //               InputProps={{ style: { color: "white" } }}
// //             />
// //           </Grid>

// //           {/* Check-out */}
// //           <Grid item xs={12} md={2}>
// //             <TextField
// //               fullWidth
// //               type="date"
// //               label="Check out"
// //               value={checkoutDate}
// //               onChange={(e) => setCheckoutDate(e.target.value)}
// //               InputLabelProps={{ shrink: true, style: { color: "white" } }}
// //               InputProps={{ style: { color: "white" } }}
// //             />
// //           </Grid>

// //           {/* Nights */}
// //           <Grid item xs={12} md={2}>
// //             <TextField
// //               fullWidth
// //               type="number"
// //               label="Total Night(s)"
// //               placeholder="e.g., 2"
// //               InputProps={{ style: { color: "white" } }}
// //               InputLabelProps={{ style: { color: "white" } }}
// //             />
// //           </Grid>

          






// //           {/* Persons & Rooms */}
// //           <Grid item xs={12} md={3}>
// //           <Select
// //         fullWidth
// //         displayEmpty
// //         value=""
// //         inputProps={{ style: { color: "white" } }}
// //         onClick={() => setDialogOpen(true)} // Open the dialog for room editing
// //         sx={{ color: "white" }}
// //       >
// //         <MenuItem value="" disabled>
// //           {summary}
// //         </MenuItem>
// //       </Select>

// //       {/* Room Editing Dialog */}
// //       <Dialog
// //         open={dialogOpen}
// //         onClose={() => setDialogOpen(false)}
// //         fullWidth
// //         maxWidth="sm"
// //       >
// //         <Box p={3}>
// //           {rooms.map((room, roomIndex) => (
// //             <Box
// //               key={roomIndex}
// //               sx={{
// //                 border: "1px solid lightgray",
// //                 borderRadius: 2,
// //                 padding: 2,
// //                 mb: 2,
// //                 backgroundColor: "rgba(0, 0, 0, 0.05)",
// //               }}
// //             >
// //               <Typography variant="h6" sx={{ mb: 1 }}>
// //                 Room {roomIndex + 1}
// //               </Typography>
// //               <Grid container spacing={2} alignItems="center">
// //                 <Grid item xs={4}>
// //                   <Typography>Adults</Typography>
// //                   <Box display="flex" alignItems="center">
// //                     <IconButton
// //                       onClick={() => updateAdults(roomIndex, -1)}
// //                     >
// //                       <Remove />
// //                     </IconButton>
// //                     <Typography>{room.adults}</Typography>
// //                     <IconButton
// //                       onClick={() => updateAdults(roomIndex, 1)}
// //                     >
// //                       <Add />
// //                     </IconButton>
// //                   </Box>
// //                 </Grid>

// //                 <Grid item xs={4}>
// //                   <Typography>Children</Typography>
// //                   <Box display="flex" alignItems="center">
// //                     <IconButton
// //                       onClick={() => updateChildren(roomIndex, -1)}
// //                     >
// //                       <Remove />
// //                     </IconButton>
// //                     <Typography>{room.children}</Typography>
// //                     <IconButton
// //                       onClick={() => updateChildren(roomIndex, 1)}
// //                     >
// //                       <Add />
// //                     </IconButton>
// //                   </Box>
// //                 </Grid>

// //                 <Grid item xs={4}>
// //                   {room.children > 0 && (
// //                     <>
// //                       <Typography>Child Ages</Typography>
// //                       {room.childAges.map((age, childIndex) => (
// //                         <Select
// //                           key={childIndex}
// //                           value={age || ""}
// //                           onChange={(e) =>
// //                             updateChildAge(roomIndex, childIndex, e.target.value)
// //                           }
// //                           sx={{ minWidth: 80 }}
// //                         >
// //                           {[...Array(18).keys()].map((age) => (
// //                             <MenuItem key={age} value={age + 1}>
// //                               {age + 1}
// //                             </MenuItem>
// //                           ))}
// //                         </Select>
// //                       ))}
// //                     </>
// //                   )}
// //                 </Grid>
// //               </Grid>
// //               {roomIndex > 0 && (
// //                 <Button
// //                   variant="outlined"
// //                   color="error"
// //                   sx={{ mt: 2 }}
// //                   onClick={() => removeRoom(roomIndex)}
// //                 >
// //                   Remove Room
// //                 </Button>
// //               )}
// //             </Box>
// //           ))}
// //           {rooms.length < 5 && (
// //             <Button variant="contained" onClick={addRoom} sx={{ mb: 2 }}>
// //               Add Room
// //             </Button>
// //           )}
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             onClick={updateSummary}
// //             fullWidth
// //           >
// //             Done
// //           </Button>
// //         </Box>
// //       </Dialog>
// //           </Grid>

// //           {/* Search Button */}
// //           <Grid item xs={12} md={1}>
// //   <Button
// //     variant="contained"
// //     sx={{
// //       backgroundColor: "#ff6600",
// //       color: "white",
// //       "&:hover": { backgroundColor: "#e65c00" },
// //       width: "100%",
// //       height: "100%",
// //     }}
// //     onClick={fetchHotels} // Trigger first API and subsequent calls
// //   >
// //     Search
// //   </Button>
// // </Grid>

// //         </Grid>

// //         {/* Filters */}
// //         <Box
// //           mt={3}
// //           display="flex"
// //           alignItems="center"
// //           justifyContent="space-between"
// //           flexWrap="wrap"
// //           sx={{
// //             backgroundColor: "rgba(255, 255, 255, 0.1)",
// //             padding: 2,
// //             borderRadius: 2,
// //           }}
// //         >
// //           {/* Rating */}
// //           <Box>
// //             <Typography variant="body1" sx={{ color: "white", mr: 1 }}>
// //               Rating
// //             </Typography>
// //             <Select
// //               value={rating}
// //               onChange={(e) => setRating(e.target.value)}
// //               sx={{ color: "white", minWidth: 120 }}
// //             >
// //               <MenuItem value="1 Star">1 Star</MenuItem>
// //               <MenuItem value="2 Star">2 Star</MenuItem>
// //               <MenuItem value="3 Star">3 Star</MenuItem>
// //               <MenuItem value="4 Star">4 Star</MenuItem>
// //               <MenuItem value="5 Star">5 Star</MenuItem>
// //             </Select>
// //           </Box>

// //           {/* Nationality */}
// //           <Box>
// //             <Typography variant="body1" sx={{ color: "white", mr: 1 }}>
// //               Nationality
// //             </Typography>
// //             <Select
// //               value={nationality}
// //               onChange={(e) => setNationality(e.target.value)}
// //               sx={{ color: "white", minWidth: 120 }}
// //             >
// //               <MenuItem value="India">India</MenuItem>
// //               <MenuItem value="USA">USA</MenuItem>
// //               <MenuItem value="UK">UK</MenuItem>
// //               <MenuItem value="Australia">Australia</MenuItem>
// //             </Select>
// //           </Box>

// //           {/* Country of Residence */}
// //           <Box>
// //             <Typography variant="body1" sx={{ color: "white", mr: 1 }}>
// //               Country of Residence
// //             </Typography>
// //             <Select
// //               value={country}
// //               onChange={(e) => setCountry(e.target.value)}
// //               sx={{ color: "white", minWidth: 120 }}
// //             >
// //               <MenuItem value="India">India</MenuItem>
// //               <MenuItem value="USA">USA</MenuItem>
// //               <MenuItem value="UK">UK</MenuItem>
// //               <MenuItem value="Australia">Australia</MenuItem>
// //             </Select>
// //           </Box>

// //           {/* Special Category */}
// //           <Box>
// //             <FormControlLabel
// //               control={
// //                 <Checkbox
// //                   checked={specialCategory}
// //                   onChange={(e) => setSpecialCategory(e.target.checked)}
// //                   sx={{ color: "white" }}
// //                 />
// //               }
// //               label={
// //                 <Typography variant="body1" sx={{ color: "white" }}>
// //                   Special Category
// //                 </Typography>
// //               }
// //             />
// //           </Box>
// //         </Box>
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default HotelBookingForm;
// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import {
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   Divider,
//   TextField,
//   Tabs,
//   Tab,
//   Box,
// } from '@mui/material';

// const HotelDetail = () => {
//   const location = useLocation();
//   const { hotelDetail } = location.state || {};
//   const [value, setValue] = useState(0); // State to manage active tab

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   if (!hotelDetail || !hotelDetail.hotel || !hotelDetail.hotel.img) {
//     return (
//       <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
//         <Typography variant="h5" color="textSecondary">
//           No hotel details available
//         </Typography>
//       </div>
//     );
//   }

//   const { name, img } = hotelDetail.hotel;

//   const uniqueImages = img.filter(
//     (image, index, self) => index === self.findIndex((i) => i.url === image.url) && image.sz === "Standard"
//   );

//   return (
//     <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
//       <Grid container spacing={2}>
//         {/* Left Section: Images and Overview */}
//         <Grid item xs={12} md={8}>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//             {/* Main Image */}
//             <div style={{ width: '100%', textAlign: 'center' }}>
//               <img
//                 src={uniqueImages[0]?.url}
//                 alt={`${name} main`}
//                 style={{
//                   width: '100%',
//                   maxHeight: '400px',
//                   objectFit: 'cover',
//                   borderRadius: '8px',
//                   boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
//                 }}
//               />
//             </div>

//             {/* Thumbnails Grid */}
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
//                 gap: '8px',
//                 marginTop: '16px',
//               }}
//             >
//               {uniqueImages.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image.url}
//                   alt={`${name} thumbnail ${index}`}
//                   style={{
//                     width: '100%',
//                     height: '90px',
//                     borderRadius: '4px',
//                     objectFit: 'cover',
//                     cursor: 'pointer',
//                     border: '2px solid transparent',
//                     transition: 'border 0.2s',
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.border = '2px solid #ff6f61')}
//                   onMouseLeave={(e) => (e.currentTarget.style.border = '2px solid transparent')}
//                 />
//               ))}
//             </div>

//             {/* Tabs for different sections */}
//             <Box sx={{ width: '100%', marginTop: '16px' }}>
//               <Tabs value={value} onChange={handleChange} aria-label="hotel details tabs">
//                 <Tab label="Hotel Overview" />
//                 <Tab label="Room Details" />
//                 <Tab label="Booking" />
//               </Tabs>

//               {/* Tab Panels */}
//               <div style={{ marginTop: '16px' }}>
//                 {value === 0 && (
//                   <div>
//                     <Typography variant="h6" gutterBottom>
//                       About This Hotel
//                     </Typography>
//                     <div style={{ margin: '16px 0' }}>
//                       {hotelDetail.hotel.des ? (
//                         (() => {
//                           const desObj = JSON.parse(hotelDetail.hotel.des);
//                           return (
//                             <div>
//                               {/* Headline */}
//                               {desObj.headline && (
//                                 <Typography variant="subtitle1" gutterBottom>
//                                   {desObj.headline}
//                                 </Typography>
//                               )}

//                               {/* Location */}
//                               {desObj.location && (
//                                 <div style={{ marginBottom: '16px' }}>
//                                   <Typography variant="body1" color="textSecondary">
//                                     <strong>Location:</strong> {desObj.location}
//                                   </Typography>
//                                 </div>
//                               )}

//                               {/* Spoken Languages */}
//                               {desObj.spoken_languages && (
//                                 <div style={{ marginBottom: '16px' }}>
//                                   <Typography variant="body1" color="textSecondary">
//                                     <strong>Languages Spoken:</strong> {desObj.spoken_languages}
//                                   </Typography>
//                                 </div>
//                               )}

//                               {/* Onsite Payments */}
//                               {desObj.onsite_payments && (
//                                 <div style={{ marginBottom: '16px' }}>
//                                   <Typography variant="body1" color="textSecondary">
//                                     <strong>Payment Options:</strong> {desObj.onsite_payments}
//                                   </Typography>
//                                 </div>
//                               )}

//                               {/* Business Amenities */}
//                               {desObj.business_amenities && (
//                                 <div style={{ marginBottom: '16px' }}>
//                                   <Typography variant="body1" color="textSecondary">
//                                     <strong>Business Amenities:</strong> {desObj.business_amenities}
//                                   </Typography>
//                                 </div>
//                               )}

//                               {/* Rooms */}
//                               {desObj.rooms && (
//                                 <div style={{ marginBottom: '16px' }}>
//                                   <Typography variant="body1" color="textSecondary">
//                                     <strong>Rooms:</strong> {desObj.rooms}
//                                   </Typography>
//                                 </div>
//                               )}

//                               {/* Attractions */}
//                               {desObj.attractions && (
//                                 <div style={{ marginBottom: '16px' }}>
//                                   <Typography variant="body1" color="textSecondary">
//                                     <strong>Nearby Attractions:</strong>
//                                   </Typography>
//                                   <Typography variant="body2" color="textSecondary">
//                                     {desObj.attractions}
//                                   </Typography>
//                                 </div>
//                               )}
//                             </div>
//                           );
//                         })()
//                       ) : (
//                         <Typography variant="body2" color="textSecondary">
//                           No description available
//                         </Typography>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {value === 1 && (
//                   <div>
//                     <Typography variant="h6" gutterBottom>
//                       Room Details
//                     </Typography>
//                     {hotelDetail?.hotel?.ops?.[0]?.ris?.[0] ? (
//                       <>
//                         <Typography variant="h6" color="primary" gutterBottom>
//                           ₹{hotelDetail.hotel.ops[0].ris[0]?.tfcs?.TF?.toFixed(2) || 'N/A'}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                           {hotelDetail.hotel.ops[0].ris[0]?.rc || 'Room Type Unavailable'}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                           {hotelDetail.hotel.ops[0].ris[0]?.mb || 'Meal Plan Unavailable'}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                           Check-in: {hotelDetail.hotel.ops[0].ris[0]?.checkInDate || 'N/A'}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                           Check-out: {hotelDetail.hotel.ops[0].ris[0]?.checkOutDate || 'N/A'}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                           {hotelDetail.hotel.ops[0].ris[0]?.tfcs?.TF === 0
//                             ? 'Non-Refundable'
//                             : 'Free Cancellation'}
//                         </Typography>
//                       </>
//                     ) : (
//                       <Typography variant="body2" color="textSecondary">
//                         No room information available.
//                       </Typography>
//                     )}
//                   </div>
//                 )}

//                 {value === 2 && (
//                   <div>
//                     <Typography variant="h6" gutterBottom>
//                       Booking Information
//                     </Typography>
//                     {/* Booking Form */}
//                     <Grid container spacing={2}>
//                       <Grid item xs={6}>
//                         <TextField
//                           label="Check-in"
//                           type="date"
//                           defaultValue={hotelDetail.hotel.ops?.[0]?.ris?.[0]?.checkInDate || ''}
//                           InputLabelProps={{
//                             shrink: true,
//                           }}
//                           fullWidth
//                         />
//                       </Grid>
//                       <Grid item xs={6}>
//                         <TextField
//                           label="Check-out"
//                           type="date"
//                           defaultValue={hotelDetail.hotel.ops?.[0]?.ris?.[0]?.checkOutDate || ''}
//                           InputLabelProps={{
//                             shrink: true,
//                           }}
//                           fullWidth
//                         />
//                       </Grid>
//                       <Grid item xs={12}>
//                         <TextField
//                           label="Persons and Rooms"
//                           defaultValue="1 Room, 2 Adults, 0 Children"
//                           InputProps={{
//                             readOnly: true,
//                           }}
//                           fullWidth
//                         />
//                       </Grid>
//                     </Grid>
//                     {/* Booking Button */}
//                     <Button
//                       variant="contained"
//                       color="warning"
//                       fullWidth
//                       style={{
//                         marginTop: '16px',
//                         backgroundColor: '#ff6600',
//                         color: 'white',
//                       }}
//                     >
//                       BOOK THIS ROOM
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </Box>
//           </div>
//         </Grid>

//         {/* Right Section: Pricing and Booking */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} style={{ padding: '16px' }}>
//             {/* Hotel Name */}
//             <Typography variant="h5" gutterBottom>
//               {hotelDetail?.hotel?.name || 'Hotel Name Unavailable'}
//             </Typography>
//             <Typography variant="body2" style={{ color: 'orange', fontWeight: 'bold' }}>
//               {'★'.repeat(hotelDetail?.hotel?.rt || 4)}{'☆'.repeat(5 - (hotelDetail?.hotel?.rt || 4))}
//             </Typography>
//             <Divider style={{ margin: '16px 0' }} />
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default HotelDetail;
// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import {
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   Divider,
//   TextField,
//   Tabs,
//   Tab,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper as MuiPaper,
// } from '@mui/material';

// const HotelDetail = () => {
//   const location = useLocation();
//   const { hotelDetail } = location.state || {};
//   const [value, setValue] = useState(0); // State to manage active tab

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   if (!hotelDetail || !hotelDetail.hotel || !hotelDetail.hotel.img) {
//     return (
//       <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
//         <Typography variant="h5" color="textSecondary">
//           No hotel details available
//         </Typography>
//       </div>
//     );
//   }

//   const { name, img } = hotelDetail.hotel;

//   const uniqueImages = img.filter(
//     (image, index, self) => index === self.findIndex((i) => i.url === image.url) && image.sz === "Standard"
//   );

//   return (
//     <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
//       <Grid container spacing={2}>
//         {/* Left Section: Images and Overview */}
//         <Grid item xs={12} md={8}>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//             {/* Main Image */}
//             <div style={{ width: '100%', textAlign: 'center' }}>
//               <img
//                 src={uniqueImages[0]?.url}
//                 alt={`${name} main`}
//                 style={{
//                   width: '100%',
//                   maxHeight: '400px',
//                   objectFit: 'cover',
//                   borderRadius: '8px',
//                   boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
//                 }}
//               />
//             </div>

//             {/* Tabs for different sections */}
//             <Box sx={{ width: '100%', marginTop: '16px' }}>
//               <Tabs value={value} onChange={handleChange} aria-label="hotel details tabs">
//                 <Tab label="Hotel Overview" />
//                 <Tab label="Room Details" />
//                 <Tab label="Booking" />
//                 <Tab label="Price Options" />
//               </Tabs>

//               {/* Tab Panels */}
//               <div style={{ marginTop: '16px' }}>
//                 {value === 3 && (
//                   <div>
//                     <Typography variant="h6" gutterBottom>
//                       Price Options
//                     </Typography>
//                     <TableContainer component={MuiPaper}>
//                       <Table>
//                         <TableHead>
//                           <TableRow>
//                             <TableCell>Meal Plan</TableCell>
//                             <TableCell>Price (INR)</TableCell>
//                             <TableCell>Cancellation Benefit</TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {hotelDetail?.hotel?.pops?.map((option, index) => (
//                             <TableRow key={index}>
//                               <TableCell>{option.fc.join(', ')}</TableCell>
//                               <TableCell>₹{option.tpc.toFixed(2)}</TableCell>
//                               <TableCell>{option.cb === 0 ? 'Non-refundable' : 'Free Cancellation'}</TableCell>
//                             </TableRow>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                   </div>
//                 )}
//               </div>
//             </Box>
//           </div>
//         </Grid>

//         {/* Right Section: Pricing and Booking */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} style={{ padding: '16px' }}>
//             {/* Hotel Name */}
//             <Typography variant="h5" gutterBottom>
//               {hotelDetail?.hotel?.name || 'Hotel Name Unavailable'}
//             </Typography>
//             <Typography variant="body2" style={{ color: 'orange', fontWeight: 'bold' }}>
//               {'★'.repeat(hotelDetail?.hotel?.rt || 4)}{'☆'.repeat(5 - (hotelDetail?.hotel?.rt || 4))}
//             </Typography>
//             <Divider style={{ margin: '16px 0' }} />
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default HotelDetail;
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

  useEffect(() => {
    console.log("Hotel Data Updated:", hotelData);
  }, [hotelData]);
  const countries = 
  ﻿[
    {
      "countryname": "India",
      "name": "India",
      "dial_code": "91",
      "countryid": "106",
      "code": "IN",
      "isocode": "IND"
    },
    {
      "countryname": "Afghanistan",
      "name": "Afghanistan",
      "dial_code": "93",
      "countryid": "97",
      "code": "AF",
      "isocode": "AFG"
    },
    {
      "countryname": "Albania",
      "name": "Albania",
      "dial_code": "355",
      "countryid": "43",
      "code": "AL",
      "isocode": "ALB"
    },
    {
      "countryname": "Algeria",
      "name": "Algeria",
      "dial_code": "213",
      "countryid": "142",
      "code": "DZ",
      "isocode": "DZA"
    },
    {
      "countryname": "Andorra",
      "name": "Andorra",
      "dial_code": "376",
      "countryid": "44",
      "code": "AD",
      "isocode": "AND"
    },
    {
      "countryname": "Angola",
      "name": "Angola",
      "dial_code": "244",
      "countryid": "143",
      "code": "AO",
      "isocode": "AGO"
    },
    {
      "countryname": "Argentina",
      "name": "Argentina",
      "dial_code": "54",
      "countryid": "29",
      "code": "AR",
      "isocode": "ARG"
    },
    {
      "countryname": "Armenia",
      "name": "Armenia",
      "dial_code": "374",
      "countryid": "45",
      "code": "AM",
      "isocode": "ARM"
    },
    {
      "countryname": "Aruba",
      "name": "Aruba",
      "dial_code": "297",
      "countryid": "231",
      "code": "AW",
      "isocode": "ABW"
    },
    {
      "countryname": "Australia",
      "name": "Australia",
      "dial_code": "61",
      "countryid": "196",
      "code": "AU",
      "isocode": "AUS"
    },
    {
      "countryname": "Austria",
      "name": "Austria",
      "dial_code": "43",
      "countryid": "46",
      "code": "AT",
      "isocode": "AUT"
    },
    {
      "countryname": "Azerbaijan",
      "name": "Azerbaijan",
      "dial_code": "994",
      "countryid": "47",
      "code": "AZ",
      "isocode": "AZE"
    },
    {
      "countryname": "Bahamas",
      "name": "Bahamas",
      "dial_code": "1242",
      "countryid": "3",
      "code": "BS",
      "isocode": "BHS"
    },
    {
      "countryname": "Bahrain",
      "name": "Bahrain",
      "dial_code": "973",
      "countryid": "98",
      "code": "BH",
      "isocode": "BHR"
    },
    {
      "countryname": "Bangladesh",
      "name": "Bangladesh",
      "dial_code": "880",
      "countryid": "99",
      "code": "BD",
      "isocode": "BGD"
    },
    {
      "countryname": "Barbados",
      "name": "Barbados",
      "dial_code": "1246",
      "countryid": "4",
      "code": "BB",
      "isocode": "BRB"
    },
    {
      "countryname": "Belarus",
      "name": "Belarus",
      "dial_code": "375",
      "countryid": "48",
      "code": "BY",
      "isocode": "BLR"
    },
    {
      "countryname": "Belgium",
      "name": "Belgium",
      "dial_code": "32",
      "countryid": "49",
      "code": "BE",
      "isocode": "BEL"
    },
    {
      "countryname": "Belize",
      "name": "Belize",
      "dial_code": "501",
      "countryid": "5",
      "code": "BZ",
      "isocode": "BLZ"
    },
    {
      "countryname": "Benin",
      "name": "Benin",
      "dial_code": "229",
      "countryid": "144",
      "code": "BJ",
      "isocode": "BEN"
    },
    {
      "countryname": "Bermuda",
      "name": "Bermuda",
      "dial_code": "1441",
      "countryid": "6",
      "code": "BM",
      "isocode": "BMU"
    },
    {
      "countryname": "Bhutan",
      "name": "Bhutan",
      "dial_code": "975",
      "countryid": "100",
      "code": "BT",
      "isocode": "BTN"
    },
    {
      "countryname": "Bolivia",
      "name": "Bolivia",
      "dial_code": "591",
      "countryid": "30",
      "code": "BO",
      "isocode": "BOL"
    },
    {
      "countryname": "Bosnia and Herzegovina",
      "name": "Bosnia and Herzegovina",
      "dial_code": "387",
      "countryid": "50",
      "code": "BA",
      "isocode": "BIH"
    },
    {
      "countryname": "Botswana",
      "name": "Botswana",
      "dial_code": "267",
      "countryid": "145",
      "code": "BW",
      "isocode": "BWA"
    },
    {
      "countryname": "Brazil",
      "name": "Brazil",
      "dial_code": "55",
      "countryid": "31",
      "code": "BR",
      "isocode": "BRA"
    },
    {
      "countryname": "British Virgin Islands",
      "name": "British Virgin Islands",
      "dial_code": "1284",
      "countryid": "7",
      "code": "VG",
      "isocode": "VGB"
    },
    {
      "countryname": "Brunei",
      "name": "Brunei",
      "dial_code": "673",
      "countryid": "101",
      "code": "BN",
      "isocode": "BRN"
    },
    {
      "countryname": "Bulgaria",
      "name": "Bulgaria",
      "dial_code": "359",
      "countryid": "51",
      "code": "BG",
      "isocode": "BGR"
    },
    {
      "countryname": "Burkina Faso",
      "name": "Burkina Faso",
      "dial_code": "226",
      "countryid": "146",
      "code": "BF",
      "isocode": "BFA"
    },
    {
      "countryname": "Burundi",
      "name": "Burundi",
      "dial_code": "257",
      "countryid": "147",
      "code": "BI",
      "isocode": "BDI"
    },
    {
      "countryname": "Cambodia",
      "name": "Cambodia",
      "dial_code": "855",
      "countryid": "102",
      "code": "KH",
      "isocode": "KHM"
    },
    {
      "countryname": "Cameroon",
      "name": "Cameroon",
      "dial_code": "237",
      "countryid": "148",
      "code": "CM",
      "isocode": "CMR"
    },
    {
      "countryname": "Canada",
      "name": "Canada",
      "dial_code": "1",
      "countryid": "2",
      "code": "CA",
      "isocode": "CAN"
    },
    {
      "countryname": "Cape Verde",
      "name": "Cape Verde",
      "dial_code": "238",
      "countryid": "149",
      "code": "CV",
      "isocode": "CPV"
    },
    {
      "countryname": "Cayman Islands",
      "name": "Cayman Islands",
      "dial_code": "1345",
      "countryid": "8",
      "code": "KY",
      "isocode": "CYM"
    },
    {
      "countryname": "Central African Republic",
      "name": "Central African Republic",
      "dial_code": "236",
      "countryid": "150",
      "code": "CF",
      "isocode": "CAF"
    },
    {
      "countryname": "Chad",
      "name": "Chad",
      "dial_code": "235",
      "countryid": "151",
      "code": "TD",
      "isocode": "TCD"
    },
    {
      "countryname": "Chile",
      "name": "Chile",
      "dial_code": "56",
      "countryid": "32",
      "code": "CL",
      "isocode": "CHL"
    },
    {
      "countryname": "China",
      "name": "China",
      "dial_code": "86",
      "countryid": "103",
      "code": "CN",
      "isocode": "CHN"
    },
    {
      "countryname": "Colombia",
      "name": "Colombia",
      "dial_code": "57",
      "countryid": "33",
      "code": "CO",
      "isocode": "COL"
    },
    {
      "countryname": "Comoros",
      "name": "Comoros",
      "dial_code": "269",
      "countryid": "294",
      "code": "KM",
      "isocode": "COM"
    },
    {
      "countryname": "Costa Rica",
      "name": "Costa Rica",
      "dial_code": "506",
      "countryid": "9",
      "code": "CR",
      "isocode": "CRC"
    },
    {
      "countryname": "Croatia",
      "name": "Croatia",
      "dial_code": "385",
      "countryid": "52",
      "code": "HR",
      "isocode": "HRV"
    },
    {
      "countryname": "Cuba",
      "name": "Cuba",
      "dial_code": "53",
      "countryid": "10",
      "code": "CU",
      "isocode": "CUB"
    },
    {
      "countryname": "Cyprus",
      "name": "Cyprus",
      "dial_code": "357",
      "countryid": "53",
      "code": "CY",
      "isocode": "CYP"
    },
    {
      "countryname": "Czech Republic",
      "name": "Czech Republic",
      "dial_code": "420",
      "countryid": "54",
      "code": "CZ",
      "isocode": "CZE"
    },
    {
      "countryname": "Democratic Republic of the Congo",
      "name": "Democratic Republic of the Congo",
      "dial_code": "243",
      "countryid": "153",
      "code": "CD",
      "isocode": "COD"
    },
    {
      "countryname": "Denmark",
      "name": "Denmark",
      "dial_code": "45",
      "countryid": "55",
      "code": "DK",
      "isocode": "DNK"
    },
    {
      "countryname": "Djibouti",
      "name": "Djibouti",
      "dial_code": "253",
      "countryid": "154",
      "code": "DJ",
      "isocode": "DJI"
    },
    {
      "countryname": "Dominica",
      "name": "Dominica",
      "dial_code": "1767",
      "countryid": "11",
      "code": "DM",
      "isocode": "DMA"
    },
    {
      "countryname": "Dominican Republic",
      "name": "Dominican Republic",
      "dial_code": "1 809, 1 829, 1 849",
      "countryid": "12",
      "code": "DO",
      "isocode": "DOM"
    },
    {
      "countryname": "Ecuador",
      "name": "Ecuador",
      "dial_code": "593",
      "countryid": "34",
      "code": "EC",
      "isocode": "ECU"
    },
    {
      "countryname": "Egypt",
      "name": "Egypt",
      "dial_code": "20",
      "countryid": "155",
      "code": "EG",
      "isocode": "EGY"
    },
    {
      "countryname": "El Salvador",
      "name": "El Salvador",
      "dial_code": "503",
      "countryid": "13",
      "code": "SV",
      "isocode": "SLV"
    },
    {
      "countryname": "Equatorial Guinea",
      "name": "Equatorial Guinea",
      "dial_code": "240",
      "countryid": "156",
      "code": "GQ",
      "isocode": "GNQ"
    },
    {
      "countryname": "Eritrea",
      "name": "Eritrea",
      "dial_code": "291",
      "countryid": "157",
      "code": "ER",
      "isocode": "ERI"
    },
    {
      "countryname": "Estonia",
      "name": "Estonia",
      "dial_code": "372",
      "countryid": "56",
      "code": "EE",
      "isocode": "EST"
    },
    {
      "countryname": "Ethiopia",
      "name": "Ethiopia",
      "dial_code": "251",
      "countryid": "158",
      "code": "ET",
      "isocode": "ETH"
    },
    {
      "countryname": "Falkland Islands",
      "name": "Falkland Islands",
      "dial_code": "500",
      "countryid": "35",
      "code": "FK",
      "isocode": "FLK"
    },
    {
      "countryname": "Fiji",
      "name": "Fiji",
      "dial_code": "679",
      "countryid": "198",
      "code": "FJ",
      "isocode": "FJI"
    },
    {
      "countryname": "Finland",
      "name": "Finland",
      "dial_code": "358",
      "countryid": "57",
      "code": "FI",
      "isocode": "FIN"
    },
    {
      "countryname": "France",
      "name": "France",
      "dial_code": "33",
      "countryid": "58",
      "code": "FR",
      "isocode": "FRA"
    },
    {
      "countryname": "French Guiana",
      "name": "French Guiana",
      "dial_code": "594",
      "countryid": "36",
      "code": "GF",
      "isocode": "GUF"
    },
    {
      "countryname": "French Polynesia",
      "name": "French Polynesia",
      "dial_code": "689",
      "countryid": "199",
      "code": "PF",
      "isocode": "PYF"
    },
    {
      "countryname": "Gabon",
      "name": "Gabon",
      "dial_code": "241",
      "countryid": "159",
      "code": "GA",
      "isocode": "GAB"
    },
    {
      "countryname": "Gambia",
      "name": "Gambia",
      "dial_code": "220",
      "countryid": "160",
      "code": "GM",
      "isocode": "GMB"
    },
    {
      "countryname": "Georgia",
      "name": "Georgia",
      "dial_code": "995",
      "countryid": "59",
      "code": "GE",
      "isocode": "GEO"
    },
    {
      "countryname": "Germany",
      "name": "Germany",
      "dial_code": "49",
      "countryid": "60",
      "code": "DE",
      "isocode": "DEU"
    },
    {
      "countryname": "Ghana",
      "name": "Ghana",
      "dial_code": "233",
      "countryid": "161",
      "code": "GH",
      "isocode": "GHA"
    },
    {
      "countryname": "Gibraltar",
      "name": "Gibraltar",
      "dial_code": "350",
      "countryid": "61",
      "code": "GI",
      "isocode": "GIB"
    },
    {
      "countryname": "Greece",
      "name": "Greece",
      "dial_code": "30",
      "countryid": "62",
      "code": "GR",
      "isocode": "GRC"
    },
    {
      "countryname": "Greenland",
      "name": "Greenland",
      "dial_code": "299",
      "countryid": "14",
      "code": "GL",
      "isocode": "GRL"
    },
    {
      "countryname": "Grenada",
      "name": "Grenada",
      "dial_code": "1473",
      "countryid": "15",
      "code": "GD",
      "isocode": "GRD"
    },
    {
      "countryname": "Guadeloupe",
      "name": "Guadeloupe",
      "dial_code": "590",
      "countryid": "16",
      "code": "GP",
      "isocode": "GLP"
    },
    {
      "countryname": "Guam",
      "name": "Guam",
      "dial_code": "1671",
      "countryid": "200",
      "code": "GU",
      "isocode": "GUM"
    },
    {
      "countryname": "Guatemala",
      "name": "Guatemala",
      "dial_code": "502",
      "countryid": "17",
      "code": "GT",
      "isocode": "GTM"
    },
    {
      "countryname": "Guinea",
      "name": "Guinea",
      "dial_code": "224",
      "countryid": "162",
      "code": "GN",
      "isocode": "GIN"
    },
    {
      "countryname": "Guinea-Bissau",
      "name": "Guinea-Bissau",
      "dial_code": "245",
      "countryid": "163",
      "code": "GW",
      "isocode": "GNB"
    },
    {
      "countryname": "Guyana",
      "name": "Guyana",
      "dial_code": "592",
      "countryid": "37",
      "code": "GY",
      "isocode": "GUY"
    },
    {
      "countryname": "Haiti",
      "name": "Haiti",
      "dial_code": "509",
      "countryid": "18",
      "code": "HT",
      "isocode": "HTI"
    },
    {
      "countryname": "Honduras",
      "name": "Honduras",
      "dial_code": "504",
      "countryid": "19",
      "code": "HN",
      "isocode": "HND"
    },
    {
      "countryname": "Hong Kong",
      "name": "Hong Kong",
      "dial_code": "852",
      "countryid": "105",
      "code": "HK",
      "isocode": "HKG"
    },
    {
      "countryname": "Hungary",
      "name": "Hungary",
      "dial_code": "36",
      "countryid": "64",
      "code": "HU",
      "isocode": "HUN"
    },
    {
      "countryname": "Iceland",
      "name": "Iceland",
      "dial_code": "354",
      "countryid": "65",
      "code": "IS",
      "isocode": "IS"
    },
    {
      "countryname": "Indonesia",
      "name": "Indonesia",
      "dial_code": "62",
      "countryid": "107",
      "code": "ID",
      "isocode": "IDN"
    },
    {
      "countryname": "Iran",
      "name": "Iran",
      "dial_code": "98",
      "countryid": "108",
      "code": "IR",
      "isocode": "IRN"
    },
    {
      "countryname": "Iraq",
      "name": "Iraq",
      "dial_code": "964",
      "countryid": "109",
      "code": "IQ",
      "isocode": "IRQ"
    },
    {
      "countryname": "Ireland",
      "name": "Ireland",
      "dial_code": "353",
      "countryid": "66",
      "code": "IE",
      "isocode": "IRL"
    },
    {
      "countryname": "Isle of Man",
      "name": "Isle of Man",
      "dial_code": "44",
      "countryid": "67",
      "code": "IM",
      "isocode": "IMN"
    },
    {
      "countryname": "Israel",
      "name": "Israel",
      "dial_code": "972",
      "countryid": "110",
      "code": "IL",
      "isocode": "ISR"
    },
    {
      "countryname": "Italy",
      "name": "Italy",
      "dial_code": "39",
      "countryid": "68",
      "code": "IT",
      "isocode": "ITA"
    },
    {
      "countryname": "Ivory Coast",
      "name": "Ivory Coast",
      "dial_code": "225",
      "countryid": "164",
      "code": "CI",
      "isocode": "CIV"
    },
    {
      "countryname": "Jamaica",
      "name": "Jamaica",
      "dial_code": "1876",
      "countryid": "20",
      "code": "JM",
      "isocode": "JAM"
    },
    {
      "countryname": "Japan",
      "name": "Japan",
      "dial_code": "81",
      "countryid": "111",
      "code": "JP",
      "isocode": "JPN"
    },
    {
      "countryname": "Jersey",
      "name": "Jersey",
      "dial_code": "44",
      "countryid": "69",
      "code": "JE",
      "isocode": "JEY"
    },
    {
      "countryname": "Jordan",
      "name": "Jordan",
      "dial_code": "962",
      "countryid": "112",
      "code": "JO",
      "isocode": "JOR"
    },
    {
      "countryname": "Kazakhstan",
      "name": "Kazakhstan",
      "dial_code": "7",
      "countryid": "113",
      "code": "KZ",
      "isocode": "KAZ"
    },
    {
      "countryname": "Kenya",
      "name": "Kenya",
      "dial_code": "254",
      "countryid": "165",
      "code": "KE",
      "isocode": "KEN"
    },
    {
      "countryname": "Kiribati",
      "name": "Kiribati",
      "dial_code": "686",
      "countryid": "201",
      "code": "KI",
      "isocode": "KIR"
    },
    {
      "countryname": "Kuwait",
      "name": "Kuwait",
      "dial_code": "965",
      "countryid": "114",
      "code": "KW",
      "isocode": "KWT"
    },
    {
      "countryname": "Kyrgyzstan",
      "name": "Kyrgyzstan",
      "dial_code": "996",
      "countryid": "115",
      "code": "KG",
      "isocode": "KGZ"
    },
    {
      "countryname": "Laos",
      "name": "Laos",
      "dial_code": "856",
      "countryid": "116",
      "code": "LA",
      "isocode": "LAO"
    },
    {
      "countryname": "Latvia",
      "name": "Latvia",
      "dial_code": "371",
      "countryid": "71",
      "code": "LV",
      "isocode": "LVA"
    },
    {
      "countryname": "Lebanon",
      "name": "Lebanon",
      "dial_code": "961",
      "countryid": "117",
      "code": "LB",
      "isocode": "LBN"
    },
    {
      "countryname": "Lesotho",
      "name": "Lesotho",
      "dial_code": "266",
      "countryid": "166",
      "code": "LS",
      "isocode": "LSO"
    },
    {
      "countryname": "Liberia",
      "name": "Liberia",
      "dial_code": "231",
      "countryid": "167",
      "code": "LR",
      "isocode": "LBR"
    },
    {
      "countryname": "Libya",
      "name": "Libya",
      "dial_code": "218",
      "countryid": "168",
      "code": "LY",
      "isocode": "LBY"
    },
    {
      "countryname": "Liechtenstein",
      "name": "Liechtenstein",
      "dial_code": "423",
      "countryid": "72",
      "code": "LI",
      "isocode": "LIE"
    },
    {
      "countryname": "Lithuania",
      "name": "Lithuania",
      "dial_code": "370",
      "countryid": "73",
      "code": "LT",
      "isocode": "LTU"
    },
    {
      "countryname": "Luxembourg",
      "name": "Luxembourg",
      "dial_code": "352",
      "countryid": "74",
      "code": "LU",
      "isocode": "LUX"
    },
    {
      "countryname": "Macau",
      "name": "Macau",
      "dial_code": "853",
      "countryid": "118",
      "code": "MO",
      "isocode": "MAC"
    },
    {
      "countryname": "Macedonia",
      "name": "Macedonia",
      "dial_code": "389",
      "countryid": "75",
      "code": "MK",
      "isocode": "MKD"
    },
    {
      "countryname": "Madagascar",
      "name": "Madagascar",
      "dial_code": "261",
      "countryid": "169",
      "code": "MG",
      "isocode": "MDG"
    },
    {
      "countryname": "Malawi",
      "name": "Malawi",
      "dial_code": "265",
      "countryid": "170",
      "code": "MW",
      "isocode": "MWI"
    },
    {
      "countryname": "Malaysia",
      "name": "Malaysia",
      "dial_code": "60",
      "countryid": "119",
      "code": "MY",
      "isocode": "MYS"
    },
    {
      "countryname": "Maldives",
      "name": "Maldives",
      "dial_code": "960",
      "countryid": "120",
      "code": "MV",
      "isocode": "MDV"
    },
    {
      "countryname": "Mali",
      "name": "Mali",
      "dial_code": "223",
      "countryid": "171",
      "code": "ML",
      "isocode": "MLI"
    },
    {
      "countryname": "Malta",
      "name": "Malta",
      "dial_code": "356",
      "countryid": "76",
      "code": "MT",
      "isocode": "MLT"
    },
    {
      "countryname": "Marshall Islands",
      "name": "Marshall Islands",
      "dial_code": "692",
      "countryid": "202",
      "code": "MH",
      "isocode": "MHL"
    },
    {
      "countryname": "Martinique",
      "name": "Martinique",
      "dial_code": "596",
      "countryid": "21",
      "code": "MQ",
      "isocode": "MTQ"
    },
    {
      "countryname": "Mauritania",
      "name": "Mauritania",
      "dial_code": "222",
      "countryid": "172",
      "code": "MR",
      "isocode": "MRT"
    },
    {
      "countryname": "Mauritius",
      "name": "Mauritius",
      "dial_code": "230",
      "countryid": "173",
      "code": "MU",
      "isocode": "MUS"
    },
    {
      "countryname": "Mexico",
      "name": "Mexico",
      "dial_code": "52",
      "countryid": "22",
      "code": "MX",
      "isocode": "MEX"
    },
    {
      "countryname": "Micronesia",
      "name": "Micronesia",
      "dial_code": "691",
      "countryid": "203",
      "code": "FM",
      "isocode": "FSM"
    },
    {
      "countryname": "Moldova",
      "name": "Moldova",
      "dial_code": "373",
      "countryid": "77",
      "code": "MD",
      "isocode": "MDA"
    },
    {
      "countryname": "Monaco",
      "name": "Monaco",
      "dial_code": "377",
      "countryid": "78",
      "code": "MC",
      "isocode": "MCO"
    },
    {
      "countryname": "Mongolia",
      "name": "Mongolia",
      "dial_code": "976",
      "countryid": "121",
      "code": "MN",
      "isocode": "MNG"
    },
    {
      "countryname": "Montenegro",
      "name": "Montenegro",
      "dial_code": "382",
      "countryid": "79",
      "code": "ME",
      "isocode": "MNE"
    },
    {
      "countryname": "Montserrat",
      "name": "Montserrat",
      "dial_code": "1664",
      "countryid": "23",
      "code": "MS",
      "isocode": "MSR"
    },
    {
      "countryname": "Morocco",
      "name": "Morocco",
      "dial_code": "212",
      "countryid": "174",
      "code": "MA",
      "isocode": "MAR"
    },
    {
      "countryname": "Mozambique",
      "name": "Mozambique",
      "dial_code": "258",
      "countryid": "175",
      "code": "MZ",
      "isocode": "MOZ"
    },
    {
      "countryname": "Namibia",
      "name": "Namibia",
      "dial_code": "264",
      "countryid": "176",
      "code": "NA",
      "isocode": "NAM"
    },
    {
      "countryname": "Nepal",
      "name": "Nepal",
      "dial_code": "977",
      "countryid": "123",
      "code": "NP",
      "isocode": "NPL"
    },
    {
      "countryname": "Netherlands",
      "name": "Netherlands",
      "dial_code": "31",
      "countryid": "80",
      "code": "NL",
      "isocode": "NLD"
    },
    {
      "countryname": "New Caledonia",
      "name": "New Caledonia",
      "dial_code": "687",
      "countryid": "205",
      "code": "NC",
      "isocode": "NCL"
    },
    {
      "countryname": "New Zealand",
      "name": "New Zealand",
      "dial_code": "64",
      "countryid": "197",
      "code": "NZ",
      "isocode": "NZL"
    },
    {
      "countryname": "Nicaragua",
      "name": "Nicaragua",
      "dial_code": "505",
      "countryid": "24",
      "code": "NI",
      "isocode": "NIC"
    },
    {
      "countryname": "Niger",
      "name": "Niger",
      "dial_code": "227",
      "countryid": "177",
      "code": "NE",
      "isocode": "NER"
    },
    {
      "countryname": "Nigeria",
      "name": "Nigeria",
      "dial_code": "234",
      "countryid": "178",
      "code": "NG",
      "isocode": "NGA"
    },
    {
      "countryname": "North Korea",
      "name": "North Korea",
      "dial_code": "850",
      "countryid": "124",
      "code": "KP",
      "isocode": "PRK"
    },
    {
      "countryname": "Norway",
      "name": "Norway",
      "dial_code": "47",
      "countryid": "81",
      "code": "NO",
      "isocode": "NOR"
    },
    {
      "countryname": "Oman",
      "name": "Oman",
      "dial_code": "968",
      "countryid": "125",
      "code": "OM",
      "isocode": "OMN"
    },
    {
      "countryname": "Pakistan",
      "name": "Pakistan",
      "dial_code": "92",
      "countryid": "126",
      "code": "PK",
      "isocode": "PAK"
    },
    {
      "countryname": "Palestine",
      "name": "Palestine",
      "dial_code": "970",
      "countryid": "228",
      "code": "PS",
      "isocode": "PSE"
    },
    {
      "countryname": "Panama",
      "name": "Panama",
      "dial_code": "507",
      "countryid": "25",
      "code": "PA",
      "isocode": "PAN"
    },
    {
      "countryname": "Papua New Guinea",
      "name": "Papua New Guinea",
      "dial_code": "675",
      "countryid": "206",
      "code": "PG",
      "isocode": "PNG"
    },
    {
      "countryname": "Paraguay",
      "name": "Paraguay",
      "dial_code": "595",
      "countryid": "38",
      "code": "PY",
      "isocode": "PRY"
    },
    {
      "countryname": "Peru",
      "name": "Peru",
      "dial_code": "51",
      "countryid": "39",
      "code": "PE",
      "isocode": "PER"
    },
    {
      "countryname": "Philippines",
      "name": "Philippines",
      "dial_code": "63",
      "countryid": "127",
      "code": "PH",
      "isocode": "PHL"
    },
    {
      "countryname": "Poland",
      "name": "Poland",
      "dial_code": "48",
      "countryid": "82",
      "code": "PL",
      "isocode": "POL"
    },
    {
      "countryname": "Portugal",
      "name": "Portugal",
      "dial_code": "351",
      "countryid": "83",
      "code": "PT",
      "isocode": "PRT"
    },
    {
      "countryname": "Puerto Rico",
      "name": "Puerto Rico",
      "dial_code": "1 787, 1 939",
      "countryid": "26",
      "code": "PR",
      "isocode": "PRI"
    },
    {
      "countryname": "Qatar",
      "name": "Qatar",
      "dial_code": "974",
      "countryid": "128",
      "code": "QA",
      "isocode": "QAT"
    },
    {
      "countryname": "Republic of the Congo",
      "name": "Republic of the Congo",
      "dial_code": "242",
      "countryid": "152",
      "code": "CG",
      "isocode": "COG"
    },
    {
      "countryname": "Romania",
      "name": "Romania",
      "dial_code": "40",
      "countryid": "84",
      "code": "RO",
      "isocode": "ROU"
    },
    {
      "countryname": "Russia",
      "name": "Russia",
      "dial_code": "7",
      "countryid": "85",
      "code": "RU",
      "isocode": "RUS"
    },
    {
      "countryname": "Rwanda",
      "name": "Rwanda",
      "dial_code": "250",
      "countryid": "180",
      "code": "RW",
      "isocode": "RWA"
    },
    {
      "countryname": "Samoa",
      "name": "Samoa",
      "dial_code": "685",
      "countryid": "207",
      "code": "WS",
      "isocode": "WSM"
    },
    {
      "countryname": "San Marino",
      "name": "San Marino",
      "dial_code": "378",
      "countryid": "86",
      "code": "SM",
      "isocode": "SMR"
    },
    {
      "countryname": "Sao Tome and Principe",
      "name": "Sao Tome and Principe",
      "dial_code": "239",
      "countryid": "181",
      "code": "ST",
      "isocode": "STP"
    },
    {
      "countryname": "Saudi Arabia",
      "name": "Saudi Arabia",
      "dial_code": "966",
      "countryid": "129",
      "code": "SA",
      "isocode": "SAU"
    },
    {
      "countryname": "Senegal",
      "name": "Senegal",
      "dial_code": "221",
      "countryid": "182",
      "code": "SN",
      "isocode": "SEN"
    },
    {
      "countryname": "Serbia",
      "name": "Serbia",
      "dial_code": "381",
      "countryid": "87",
      "code": "RS",
      "isocode": "SRB"
    },
    {
      "countryname": "Seychelles",
      "name": "Seychelles",
      "dial_code": "248",
      "countryid": "183",
      "code": "SC",
      "isocode": "SYC"
    },
    {
      "countryname": "Sierra Leone",
      "name": "Sierra Leone",
      "dial_code": "232",
      "countryid": "184",
      "code": "SL",
      "isocode": "SLE"
    },
    {
      "countryname": "Singapore",
      "name": "Singapore",
      "dial_code": "65",
      "countryid": "130",
      "code": "SG",
      "isocode": "SGP"
    },
    {
      "countryname": "Slovakia",
      "name": "Slovakia",
      "dial_code": "421",
      "countryid": "88",
      "code": "SK",
      "isocode": "SVK"
    },
    {
      "countryname": "Slovenia",
      "name": "Slovenia",
      "dial_code": "386",
      "countryid": "89",
      "code": "SI",
      "isocode": "SVN"
    },
    {
      "countryname": "Solomon Islands",
      "name": "Solomon Islands",
      "dial_code": "677",
      "countryid": "208",
      "code": "SB",
      "isocode": "SLB"
    },
    {
      "countryname": "Somalia",
      "name": "Somalia",
      "dial_code": "252",
      "countryid": "185",
      "code": "SO",
      "isocode": "SOM"
    },
    {
      "countryname": "South Africa",
      "name": "South Africa",
      "dial_code": "27",
      "countryid": "186",
      "code": "ZA",
      "isocode": "ZAF"
    },
    {
      "countryname": "South Korea",
      "name": "South Korea",
      "dial_code": "82",
      "countryid": "131",
      "code": "KR",
      "isocode": "KOR"
    },
    {
      "countryname": "Spain",
      "name": "Spain",
      "dial_code": "34",
      "countryid": "90",
      "code": "ES",
      "isocode": "ESP"
    },
    {
      "countryname": "Sri Lanka",
      "name": "Sri Lanka",
      "dial_code": "94",
      "countryid": "132",
      "code": "LK",
      "isocode": "LKA"
    },
    {
      "countryname": "Sudan",
      "name": "Sudan",
      "dial_code": "249",
      "countryid": "187",
      "code": "SD",
      "isocode": "SDN"
    },
    {
      "countryname": "Suriname",
      "name": "Suriname",
      "dial_code": "597",
      "countryid": "40",
      "code": "SR",
      "isocode": "SUR"
    },
    {
      "countryname": "Swaziland",
      "name": "Swaziland",
      "dial_code": "268",
      "countryid": "188",
      "code": "SZ",
      "isocode": "SWZ"
    },
    {
      "countryname": "Sweden",
      "name": "Sweden",
      "dial_code": "46",
      "countryid": "91",
      "code": "SE",
      "isocode": "SWE"
    },
    {
      "countryname": "Switzerland",
      "name": "Switzerland",
      "dial_code": "41",
      "countryid": "92",
      "code": "CH",
      "isocode": "CHE"
    },
    {
      "countryname": "Syria",
      "name": "Syria",
      "dial_code": "963",
      "countryid": "133",
      "code": "SY",
      "isocode": "SYR"
    },
    {
      "countryname": "Taiwan",
      "name": "Taiwan",
      "dial_code": "886",
      "countryid": "134",
      "code": "TW",
      "isocode": "TWN"
    },
    {
      "countryname": "Tajikistan",
      "name": "Tajikistan",
      "dial_code": "992",
      "countryid": "135",
      "code": "TJ",
      "isocode": "TJK"
    },
    {
      "countryname": "Tanzania",
      "name": "Tanzania",
      "dial_code": "255",
      "countryid": "189",
      "code": "TZ",
      "isocode": "TZA"
    },
    {
      "countryname": "Thailand",
      "name": "Thailand",
      "dial_code": "66",
      "countryid": "136",
      "code": "TH",
      "isocode": "THA"
    },
    {
      "countryname": "Togo",
      "name": "Togo",
      "dial_code": "228",
      "countryid": "190",
      "code": "TG",
      "isocode": "TGO"
    },
    {
      "countryname": "Trinidad and Tobago",
      "name": "Trinidad and Tobago",
      "dial_code": "1868",
      "countryid": "27",
      "code": "TT",
      "isocode": "TTO"
    },
    {
      "countryname": "Tunisia",
      "name": "Tunisia",
      "dial_code": "216",
      "countryid": "191",
      "code": "TN",
      "isocode": "TUN"
    },
    {
      "countryname": "Turkey",
      "name": "Turkey",
      "dial_code": "90",
      "countryid": "93",
      "code": "TR",
      "isocode": "TUR"
    },
    {
      "countryname": "Turkmenistan",
      "name": "Turkmenistan",
      "dial_code": "993",
      "countryid": "137",
      "code": "TM",
      "isocode": "TKM"
    },
    {
      "countryname": "Tuvalu",
      "name": "Tuvalu",
      "dial_code": "688",
      "countryid": "210",
      "code": "TV",
      "isocode": "TUV"
    },
    {
      "countryname": "Uganda",
      "name": "Uganda",
      "dial_code": "256",
      "countryid": "192",
      "code": "UG",
      "isocode": "UGA"
    },
    {
      "countryname": "Ukraine",
      "name": "Ukraine",
      "dial_code": "380",
      "countryid": "94",
      "code": "UA",
      "isocode": "UKR"
    },
    {
      "countryname": "United Arab Emirates",
      "name": "United Arab Emirates",
      "dial_code": "971",
      "countryid": "138",
      "code": "AE",
      "isocode": "ARE"
    },
    {
      "countryname": "United Kingdom",
      "name": "United Kingdom",
      "dial_code": "44",
      "countryid": "95",
      "code": "GB",
      "isocode": "GBR"
    },
    {
      "countryname": "United States",
      "name": "United States",
      "dial_code": "1",
      "countryid": "1",
      "code": "US",
      "isocode": "USA"
    },
    {
      "countryname": "Uruguay",
      "name": "Uruguay",
      "dial_code": "598",
      "countryid": "41",
      "code": "UY",
      "isocode": "URY"
    },
    {
      "countryname": "Uzbekistan",
      "name": "Uzbekistan",
      "dial_code": "998",
      "countryid": "139",
      "code": "UZ",
      "isocode": "UZB"
    },
    {
      "countryname": "Vanuatu",
      "name": "Vanuatu",
      "dial_code": "678",
      "countryid": "211",
      "code": "VU",
      "isocode": "VUT"
    },
    {
      "countryname": "Venezuela",
      "name": "Venezuela",
      "dial_code": "58",
      "countryid": "42",
      "code": "VE",
      "isocode": "VEN"
    },
    {
      "countryname": "Vietnam",
      "name": "Vietnam",
      "dial_code": "84",
      "countryid": "140",
      "code": "VN",
      "isocode": "VNM"
    },
    {
      "countryname": "Wallis and Futuna",
      "name": "Wallis and Futuna",
      "dial_code": "681",
      "countryid": "212",
      "code": "WF",
      "isocode": "WLF"
    },
    {
      "countryname": "Western Sahara",
      "name": "Western Sahara",
      "dial_code": "212",
      "countryid": "193",
      "code": "EH",
      "isocode": "ESH"
    },
    {
      "countryname": "Yemen",
      "name": "Yemen",
      "dial_code": "967",
      "countryid": "141",
      "code": "YE",
      "isocode": "YEM"
    },
    {
      "countryname": "Zambia",
      "name": "Zambia",
      "dial_code": "260",
      "countryid": "194",
      "code": "ZM",
      "isocode": "ZMB"
    },
    {
      "countryname": "Zimbabwe",
      "name": "Zimbabwe",
      "dial_code": "263",
      "countryid": "195",
      "code": "ZW",
      "isocode": "ZWE"
    }
  ]
  
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
          {/* <Box>
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
          </Box> */}

<Select
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      displayEmpty
      sx={{color:"white",minWidth:"120px"}}
    >
      <MenuItem value="" disabled>
        Select a Country
      </MenuItem>
      {countries.map((countryObj, index) => (
        <MenuItem key={index} value={countryObj.name}>
          {countryObj.name}
        </MenuItem>
      ))}
    </Select>
<Select
      value={country}
      onChange={(e) => setNationality(e.target.value)}
      displayEmpty
      sx={{color:"white",minWidth:"120px"}}
    >
      <MenuItem value="" disabled>
        Select a Country
      </MenuItem>
      {countries.map((countryObj, index) => (
        <MenuItem key={index} value={countryObj.name}>
          {countryObj.name}
        </MenuItem>
      ))}
    </Select>
          {/* Country of Residence */}
          {/* <Box>
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
          </Box> */}

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



// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import '../styles/ResultsPage.css';
// import { Grid, Paper, Typography, Button } from '@mui/material';

// const ResultsPage = () => {
//   const location = useLocation();
//   const { hotelData, message } = location.state || {};

//   // Extract the array of hotels from the nested structure
//   const hotels = hotelData?.searchResult?.his || [];

//   return (
//     <div className="results-page" style={{maxWidth: '1200px', margin: '0 auto', padding: '16px'}}>
//       <Grid container spacing={2}>
//         {/* Sidebar */}
//         <Grid item xs={12} sm={4} md={3}>
//           <Paper elevation={3} className="sidebar">
//             <Typography variant="h6" gutterBottom>
//               Sort By
//             </Typography>
//             <ul>
//               <li>Rating</li>
//               <li>Preferred</li>
//               <li>Price</li>
//             </ul>
//           </Paper>
//         </Grid>

//         {/* Hotel Results */}
//         <Grid item xs={12} sm={8} md={9}>
//           <Paper elevation={3} className="hotel-container">
//             {hotels.length > 0 ? (
//               <div>
//                 {hotels.map((hotel, index) => (
//                   <Paper key={index} className="hotel-card" elevation={1}>
//                     <Grid container spacing={2} alignItems="center">
//                       {/* Hotel Image */}
//                       <Grid item xs={3}>
//                         <img
//                           src={hotel.img[0]?.url || 'placeholder.jpg'}
//                           alt={hotel.name}
//                           className="hotel-image"
//                           style={{ width: '100%',height: '100%', borderRadius: '8px' }}
//                         />
//                       </Grid>

//                       {/* Hotel Details */}
//                       <Grid item xs={6}>
//                      <Typography variant="h6" gutterBottom style={{textAlign: 'left'}}>
//   {hotel.name}
// </Typography>
//                         <Typography variant="body2" color="textSecondary"  style={{textAlign: 'left'}}>
//                           {hotel.ad.adr}, {hotel.ad.city.name}, {hotel.ad.state.name}
//                         </Typography>
                        
                        
//                         <Typography variant="body2" className="rating" style={{ color: 'orange',textAlign: 'left' }}>
//                           {'★'.repeat(hotel.rt)}{'☆'.repeat(5 - hotel.rt)}
//                         </Typography>
//                         {hotel.ifca && (
//                           <Typography
//                             variant="body2"
//                             style={{ color: 'green', marginTop: '8px',textAlign: 'left' }}
//                           >
//                             Free Cancellation Available
//                           </Typography>
//                         )}
//                       </Grid>

//                       {/* Price and Action */}
//                       <Grid item xs={3} style={{ textAlign: 'right' }}>
//                         <Typography variant="h6" color="black" style={{fontWeight: 'bold'}}>
//                           ₹{hotel.pops[0]?.tpc.toFixed(0)}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                           {hotel.pops[0]?.fc[0]} <br />  Night(s)
//                         </Typography>
//                         <Button
//                           variant="contained"
//                           color="warning"
//                           style={{
//                             marginTop: '16px',
//                             backgroundColor: '#ff6600',
//                             color: 'white',
//                           }}
//                         >
//                           Select Room
//                         </Button>
//                       </Grid>
//                     </Grid>
//                   </Paper>
//                 ))}
//               </div>
//             ) : (
//               <Typography variant="h5" align="center" color="textSecondary">
//                 {message || 'No results found'}
//               </Typography>
//             )}
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default ResultsPage;

// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../styles/ResultsPage.css';
// import { Grid, Paper, Typography, Button } from '@mui/material';
// import axios from 'axios';

// const ResultsPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { hotelData, message } = location.state || {};

//   // Extract the array of hotels from the nested structure
//   const hotels = hotelData?.searchResult?.his || [];

//   // Handle Select Room Click
//   const handleSelectRoom = async (hotelId) => {
//     try {
//       const apiUrl = 'https://tripjack.com/hms/v1/hotelDetail-search';
//       const apiKey = '610720564f329c1c-ae91-4b19-b5b0-6083cb2fb172';
//       const requestBody = { id: hotelId };

//       const response = await axios.post(apiUrl, requestBody, {
//         headers: {
//           'Content-Type': 'application/json',
//           'apikey': apiKey,
//         },
//       });

//       // Navigate to HotelDetail page with fetched data
//       navigate('/hotelDetail', { state: { hotelDetail: response.data } });
//     } catch (error) {
//       console.error('Error fetching hotel details:', error);
//       alert('Failed to fetch hotel details. Please try again.');
//     }
//   };

//   return (
//     <div className="results-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
//       <Grid container spacing={2}>
//         {/* Sidebar */}
//         <Grid item xs={12} sm={4} md={3}>
//           <Paper elevation={3} className="sidebar">
//             <Typography variant="h6" gutterBottom>
//               Sort By
//             </Typography>
//             <ul style={{ listStyleType: 'none', padding: 0 }}>
//               <li style={{ padding: '8px 0', cursor: 'pointer' }}>Rating</li>
//               <li style={{ padding: '8px 0', cursor: 'pointer' }}>Preferred</li>
//               <li style={{ padding: '8px 0', cursor: 'pointer' }}>Price</li>
//             </ul>
//           </Paper>
//         </Grid>

//         {/* Hotel Results */}
//         <Grid item xs={12} sm={8} md={9}>
//           <Paper elevation={3} className="hotel-container">
//             {hotels.length > 0 ? (
//               <div>
//                 {hotels.map((hotel, index) => (
//                   <Paper key={index} className="hotel-card" elevation={1} style={{ marginBottom: '16px' }}>
//                     <Grid container spacing={2} alignItems="center">
//                       {/* Hotel Image */}
//                       <Grid item xs={12} sm={3}>
//                         <img
//                           src={hotel.img[0]?.url || 'placeholder.jpg'}
//                           alt={hotel.name}
//                           className="hotel-image"
//                           style={{
//                             width: '100%',
//                             height: '100%',
//                             borderRadius: '8px',
//                             objectFit: 'cover',
//                             maxHeight: '150px',
//                           }}
//                         />
//                       </Grid>

//                       {/* Hotel Details */}
//                       <Grid item xs={12} sm={6}>
//                         <Typography variant="h6" gutterBottom style={{ textAlign: 'left' }}>
//                           {hotel.name}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary" style={{ textAlign: 'left' }}>
//                           {hotel.ad.adr}, {hotel.ad.city.name}, {hotel.ad.state.name}
//                         </Typography>
//                         <Typography variant="body2" style={{ color: 'orange', textAlign: 'left' }}>
//                           {'★'.repeat(hotel.rt)}{'☆'.repeat(5 - hotel.rt)}
//                         </Typography>
//                         {hotel.ifca && (
//                           <Typography
//                             variant="body2"
//                             style={{ color: 'green', marginTop: '8px', textAlign: 'left' }}
//                           >
//                             Free Cancellation Available
//                           </Typography>
//                         )}
//                       </Grid>

//                       {/* Price and Action */}
//                       <Grid item xs={12} sm={3} style={{ textAlign: 'right' }}>
//                         <Typography variant="h6" color="black" style={{ fontWeight: 'bold' }}>
//                           ₹{hotel.pops[0]?.tpc.toFixed(0)}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                           {hotel.pops[0]?.fc[0]} <br /> Night(s)
//                         </Typography>
//                         <Button
//                           variant="contained"
//                           color="warning"
//                           style={{
//                             marginTop: '16px',
//                             backgroundColor: '#ff6600',
//                             color: 'white',
//                           }}
//                           onClick={() => handleSelectRoom(hotel.id)} // Pass the hotel ID
//                         >
//                           Select Room
//                         </Button>
//                       </Grid>
//                     </Grid>
//                   </Paper>
//                 ))}
//               </div>
//             ) : (
//               <Typography variant="h5" align="center" color="textSecondary">
//                 {message || 'No results found'}
//               </Typography>
//             )}
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default ResultsPage;