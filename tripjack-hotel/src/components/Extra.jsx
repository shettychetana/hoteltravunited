// import React, { useState } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Grid,
//   Select,
//   MenuItem,
//   Checkbox,
//   FormControlLabel,
//   Autocomplete,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";
// import debounce from "lodash/debounce";

// const HotelBookingForm = () => {
//   const [rating, setRating] = useState("");
//   const [nationality, setNationality] = useState("India");
//   const [country, setCountry] = useState("India");
//   const [specialCategory, setSpecialCategory] = useState(false);
//   const [locations, setLocations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [noResults, setNoResults] = useState(false);
//   const [searching, setSearching] = useState(true); // To track if the search should continue or not

//   let currentPage = 0;

//   const fetchLocations = async (inputValue, next = "") => {
//     console.log("Fetching locations with input value:", inputValue); // Log input value

//     setLoading(true);
//     setNoResults(false);

//     try {
//       // Construct the API endpoint
//       const endpoint = `https://tripjack.com/hms/v1/static-cities/${next}`;
//       console.log("API endpoint:", endpoint); // Log the endpoint being hit

//       const response = await axios.get(endpoint, {
//         headers: {
//           "Content-Type": "application/json",
//           apikey: "610720564f329c1c-ae91-4b19-b5b0-6083cb2fb172",
//         },
//       });

//       const { cil = [], next: nextPage = null } = response.data?.response || {};
//       console.log("API Response:", response.data); // Log full response data

//       // Filter locations based on the user's input
//       const filteredLocations = cil.filter((location) =>
//         location.fullRegionName.toLowerCase().includes(inputValue.toLowerCase())
//       );

//       console.log("Filtered Locations:", filteredLocations); // Log filtered locations

//       // Remove duplicates by using a Set on the id
//       setLocations((prev) => {
//         const uniqueLocations = [
//           ...new Map(prev.concat(filteredLocations).map((item) => [item.id, item])).values(),
//         ];
//         console.log("Unique Locations after filtering duplicates:", uniqueLocations);
//         return uniqueLocations;
//       });

//       // If no locations are found and there are more pages, fetch the next page
//       if (filteredLocations.length === 0 && nextPage) {
//         console.log("No locations found, fetching next page:", nextPage); // Log if no results found
//         return fetchLocations(inputValue, nextPage);
//       }

//       // Stop searching if no results found in the current page
//       if (filteredLocations.length === 0 && !nextPage) {
//         console.log("No results found, end of search"); // Log when no results are found
//         setNoResults(true);
//       }

//       // Continue fetching if there is a `nextPage`
//       if (nextPage) {
//         console.log("Fetching next page with ID:", nextPage); // Log next page ID
//         return fetchLocations(inputValue, nextPage);
//       }
//     } catch (error) {
//       console.error("Error fetching locations:", error);
//       setLocations([]);
//       setNoResults(true);
//     } finally {
//       console.log("Finished fetching locations"); // Log when done
//       setLoading(false);
//     }
//   };

//   const handleLocationInputChange = debounce((event, value) => {
//     console.log("Location input changed:", value); // Log input value
//     if (value.length > 2 && searching) {
//       currentPage = 0; // Reset page count for a new search
//       setLocations([]); // Clear previous locations
//       fetchLocations(value);
//     } else {
//       setLocations([]);
//       setNoResults(false);
//     }
//   }, 300);

//   // When the user selects a location, stop the search
//   const handleLocationSelect = (event, value) => {
//     console.log("User selected location:", value);
//     setSearching(false); // Stop searching after selection
//     // You can now handle the selection (e.g., set the location, etc.)
//   };

//   return (
//     <Box
//       sx={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 2,
//       }}
//     >
//       <Container
//         maxWidth="lg"
//         sx={{
//           backgroundColor: "rgba(0, 0, 0, 0.7)",
//           padding: 3,
//           borderRadius: 2,
//         }}
//       >
//         <Typography
//           variant="h4"
//           sx={{ color: "white", textAlign: "center", mb: 3 }}
//         >
//           Book your stay with India's largest network of Hotels
//         </Typography>
//         <Grid container spacing={2} alignItems="center">
//           {/* Location */}
//           <Grid item xs={12} md={3}>
//             <Autocomplete
//               freeSolo
//               options={locations.map((location) => ({
//                 label: location.fullRegionName,
//                 id: location.id,
//               }))}
//               onInputChange={handleLocationInputChange}
//               onChange={handleLocationSelect} // Handle selection
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Location"
//                   variant="outlined"
//                   placeholder="Enter destination"
//                   InputProps={{
//                     ...params.InputProps,
//                     style: { color: "white" },
//                     endAdornment: (
//                       <>
//                         {loading ? (
//                           <CircularProgress color="inherit" size={20} />
//                         ) : null}
//                         {params.InputProps.endAdornment}
//                       </>
//                     ),
//                   }}
//                   InputLabelProps={{ style: { color: "white" } }}
//                 />
//               )}
//               renderOption={(props, option) => (
//                 <Box {...props} key={option.id}>
//                   <Typography variant="body1">{option.label}</Typography>
//                 </Box>
//               )}
//             />
//             {noResults && (
//               <Typography
//                 variant="body2"
//                 color="error"
//                 sx={{ mt: 1, color: "white" }}
//               >
                      
//               </Typography>
//             )}
//           </Grid>
//           {/* Check-in */}
//           <Grid item xs={12} md={2}>
//             <TextField
//               fullWidth
//               type="date"
//               label="Check in"
//               InputLabelProps={{ shrink: true, style: { color: "white" } }}
//               InputProps={{ style: { color: "white" } }}
//             />
//           </Grid>

//           {/* Check-out */}
//           <Grid item xs={12} md={2}>
//             <TextField
//               fullWidth
//               type="date"
//               label="Check out"
//               InputLabelProps={{ shrink: true, style: { color: "white" } }}
//               InputProps={{ style: { color: "white" } }}
//             />
//           </Grid>

//           {/* Nights */}
//           <Grid item xs={12} md={2}>
//             <TextField
//               fullWidth
//               type="number"
//               label="Total Night(s)"
//               placeholder="e.g., 2"
//               InputProps={{ style: { color: "white" } }}
//               InputLabelProps={{ style: { color: "white" } }}
//             />
//           </Grid>

//           {/* Persons & Rooms */}
//           <Grid item xs={12} md={3}>
//             <Select
//               fullWidth
//               defaultValue="1 Room 2 Adults 0 Child"
//               displayEmpty
//               inputProps={{ style: { color: "white" } }}
//               sx={{ color: "white" }}
//             >
//               <MenuItem value="1 Room 2 Adults 0 Child">
//                 1 Room 2 Adults 0 Child
//               </MenuItem>
//               <MenuItem value="1 Room 1 Adult 0 Child">
//                 1 Room 1 Adult 0 Child
//               </MenuItem>
//               <MenuItem value="2 Rooms 4 Adults 2 Children">
//                 2 Rooms 4 Adults 2 Children
//               </MenuItem>
//             </Select>
//           </Grid>

//           {/* Search Button */}
//           <Grid item xs={12} md={1}>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#ff6600",
//                 color: "white",
//                 "&:hover": { backgroundColor: "#e65c00" },
//                 width: "100%",
//                 height: "100%",
//               }}
//             >
//               Search
//             </Button>
 

//           </Grid>
//         </Grid>

//         {/* Filters */}
//         <Box
//           mt={3}
//           display="flex"
//           alignItems="center"
//           justifyContent="space-between"
//           flexWrap="wrap"
//           sx={{
//             backgroundColor: "rgba(255, 255, 255, 0.1)",
//             padding: 2,
//             borderRadius: 2,
//           }}
//         >
//           {/* Rating */}
//           <Box>
//             <Typography variant="body1" sx={{ color: "white", mr: 1 }}>
//               Rating
//             </Typography>
//             <Select
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               sx={{ color: "white", minWidth: 120 }}
//             >
//               <MenuItem value="1 Star">1 Star</MenuItem>
//               <MenuItem value="2 Star">2 Star</MenuItem>
//               <MenuItem value="3 Star">3 Star</MenuItem>
//               <MenuItem value="4 Star">4 Star</MenuItem>
//               <MenuItem value="5 Star">5 Star</MenuItem>
//             </Select>
//           </Box>

//           {/* Nationality */}
//           <Box>
//             <Typography variant="body1" sx={{ color: "white", mr: 1 }}>
//               Nationality
//             </Typography>
//             <Select
//               value={nationality}
//               onChange={(e) => setNationality(e.target.value)}
//               sx={{ color: "white", minWidth: 120 }}
//             >
//               <MenuItem value="India">India</MenuItem>
//               <MenuItem value="USA">USA</MenuItem>
//               <MenuItem value="UK">UK</MenuItem>
//               <MenuItem value="Australia">Australia</MenuItem>
//             </Select>
//           </Box>

//           {/* Country of Residence */}
//           <Box>
//             <Typography variant="body1" sx={{ color: "white", mr: 1 }}>
//               Country of Residence
//             </Typography>
//             <Select
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//               sx={{ color: "white", minWidth: 120 }}
//             >
//               <MenuItem value="India">India</MenuItem>
//               <MenuItem value="USA">USA</MenuItem>
//               <MenuItem value="UK">UK</MenuItem>
//               <MenuItem value="Australia">Australia</MenuItem>
//             </Select>
//           </Box>

//           {/* Special Category */}
//           <Box>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={specialCategory}
//                   onChange={(e) => setSpecialCategory(e.target.checked)}
//                   sx={{ color: "white" }}
//                 />
//               }
//               label={
//                 <Typography variant="body1" sx={{ color: "white" }}>
//                   Special Category
//                 </Typography>
//               }
//             />
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default HotelBookingForm;
