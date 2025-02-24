import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Paper, Typography, Button, Box, TextField, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import axios from "axios";
//import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "../styles/ResultsPage.css";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotelData, message } = location.state || {};
  const hotels = hotelData?.searchResult?.his || [];
  const size = hotelData?.searchResult?.size || 0;
  const destination = hotelData?.searchResult?.his[0]?.ad.ctn || "";
  
  // State management
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedRating, setSelectedRating] = useState(null);
  //const [freeCancellation, setFreeCancellation] = useState(false);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState([]);

  // Extract unique property types
  const propertyTypes = [...new Set(hotels.map(hotel => hotel.pt))];
  const handleRatingChange = (rating) => {
    setSelectedRating(prev => (prev === rating ? null : rating));
  };
  
  // Update filters whenever criteria changes
  useEffect(() => {
    if (!hotels || hotels.length === 0) return;
  
    const prices = hotels.map(hotel => hotel.pops[0]?.tpc || 0);
    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));
  
    // Update min/max price only if values are different
    setMinPrice(prevMin => (prevMin !== min ? min : prevMin));
    setMaxPrice(prevMax => (prevMax !== max ? max : prevMax));
  
    const filtered = hotels.filter(hotel => {
      const hotelPrice = hotel.pops[0]?.tpc || 0;
      const priceInRange = hotelPrice >= minPrice && hotelPrice <= maxPrice;
      const ratingMatches = selectedRating === null || hotel.rt === selectedRating;
      const propertyMatches = selectedPropertyType.length === 0 || selectedPropertyType.includes(hotel.pt);
      return priceInRange && ratingMatches && propertyMatches;
    });
  
    // Only update state if the filtered result is different to prevent infinite loops
    setFilteredHotels(prevFiltered => (JSON.stringify(prevFiltered) !== JSON.stringify(filtered) ? filtered : prevFiltered));
  
  }, [hotels, minPrice, maxPrice, selectedRating, selectedPropertyType]);
  
  // Handle property type change
  const handlePropertyTypeChange = (type) => {
    setSelectedPropertyType(prev => 
      prev.includes(type) 
        ? prev.filter(pt => pt !== type) 
        : [...prev, type]
    );
  };
  // Initialize price range from data
  useEffect(() => {
    if (!hotels || hotels.length === 0) return;
  
    const prices = hotels.map(hotel => hotel.pops[0]?.tpc || 0);
    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));
  
    // ✅ Only update state if the values actually change
    setMinPrice(prev => (prev !== min ? min : prev));
    setMaxPrice(prev => (prev !== max ? max : prev));
  }, [hotels]);
  

  // Update filters whenever criteria changes
  useEffect(() => {
    if (!hotels || hotels.length === 0) return;
  
    const filtered = hotels.filter(hotel => {
      const hotelPrice = hotel.pops[0]?.tpc || 0;
      const priceInRange = hotelPrice >= minPrice && hotelPrice <= maxPrice;
      const ratingMatches = selectedRating === null || hotel.rt === selectedRating;
      const propertyMatches = selectedPropertyType.length === 0 || selectedPropertyType.includes(hotel.pt);
      return priceInRange && ratingMatches && propertyMatches;
    });
  
    // ✅ Only update state if filtered hotels actually change
    if (JSON.stringify(filteredHotels) !== JSON.stringify(filtered)) {
      setFilteredHotels(filtered);
    }
  }, [hotels, minPrice, maxPrice, selectedRating, selectedPropertyType]);
  
  const handlePriceChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
  
    if (e.target.name === "minPrice") {
      if (value !== minPrice) setMinPrice(value);
      if (value > maxPrice) setMaxPrice(value);
    } else if (e.target.name === "maxPrice") {
      if (value !== maxPrice) setMaxPrice(value);
      if (value < minPrice) setMinPrice(value);
    }
  };
  
  

  const handleSelectRoom = async (hotelId) => {
    try {
      const apiUrl = "https://apitest.tripjack.com/hms/v1/hotelDetail-search";
      const apiKey = "81210652be6625-ffb6-4457-8d7b-3b87bfa351c3";
      const response = await axios.post(apiUrl, { id: hotelId }, {
        headers: { "Content-Type": "application/json", apikey: apiKey }
      });
      navigate("/hotelDetail", { state: { hotelDetail: response.data } });
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      alert("Failed to fetch hotel details. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
      <Grid container spacing={2}>
        {/* Filters Sidebar */}
        <Grid item xs={12} sm={4} md={3}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: "700" , color: "black",fontFamily:'lato',fontSize:'20px',lineHeight:"20px"}}>Filters</Typography>

            {/* Price Filter */}
            <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "700" , color: "black",fontFamily:'lato',fontSize:'16px',lineHeight:"16px"}}>Suggested For You</Typography>
            <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "700" , color: "black",fontFamily:'lato',fontSize:'16px',lineHeight:"16px",padding:"20px"}}>Price Range</Typography>

            <Box display="flex" gap={1} alignItems="center" marginBottom="16px">
              <TextField
                type="number"
                name="minPrice"
                value={minPrice}
                onChange={handlePriceChange}
                label="Min Price"
                variant="outlined"
                size="small"
                inputProps={{ min: 0 }}
              />
              <Typography variant="body1">to</Typography>
              <TextField
                type="number"
                name="maxPrice"
                value={maxPrice}
                onChange={handlePriceChange}
                label="Max Price"
                variant="outlined"
                size="small"
                inputProps={{ min: minPrice }}
              />
            </Box>

            {/* Star Rating Filter */}
            <Typography variant="subtitle1" gutterBottom style={{ fontWeight: "700" , color: "black",fontFamily:'lato',fontSize:'16px',lineHeight:"16px"}}>Star Rating</Typography>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
            {[5, 4, 3, 2, 1, 0].map((rating) => (
              <FormControlLabel style={{ fontWeight: "400" , color: "#4A4A4A",fontFamily:'lato',fontSize:'14px',lineHeight:"20px"}}
                key={rating}
                control={
                  <Checkbox
  checked={selectedRating === rating}
  onChange={() => handleRatingChange(rating)}
/>

                }
                label={`${rating} STAR${rating !== 1&& rating!==0 ? "S" : ""}`}
              />
            ))}
            </Box>
            

            {/* Property Type Filter */}
{/* Property Type Filter */}
<Typography variant="subtitle1" gutterBottom style={{ fontWeight: "700" , color: "black",fontFamily:'lato',fontSize:'16px',lineHeight:"16px"}}>Property Type</Typography>
<Box display="flex" flexDirection="column" alignItems="flex-start">
  {propertyTypes.map((type) => (
    <Box key={type} display="flex" flexDirection="row" alignItems="center"  style={{ fontWeight: "400" , color: "#4A4A4A",fontFamily:'lato',fontSize:'14px',lineHeight:"20px"}}>
      <Checkbox
        checked={selectedPropertyType.includes(type)}
        onChange={() => handlePropertyTypeChange(type)}
      />
      <Typography variant="body1" style={{ marginLeft: '8px' }}>{type}</Typography>
    </Box>
  ))}
</Box>


          </Paper>
        </Grid>

        {/* Results List */}
        <Grid item xs={12} sm={8} md={9}>
          <Typography variant="h4" style={{fontFamily:'lato',fontSize:'26px',fontWeight:'900',lineHeight:'26px',display:'flex',alignItems:'center',color:'#000000'}}>
            {filteredHotels.length} of {size} hotels in {destination}
          </Typography>

          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <Paper key={hotel.id} className="HOVER" style={{ marginBottom: '16px', padding: '16px' }} elevation={1}>
                <Grid container spacing={2} alignItems="center">
                  {/* Hotel Image */}
                  <Grid item xs={12} sm={3}>
                    <img
                      src={hotel.img?.[0]?.url || '../images/hotelll.png'}
                      //alt={hotel.name}
                      style={{
                        width: '100%',
                        height: '150px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      }}
                    />
                  </Grid>

                  {/* Hotel Details */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h5" style={{ 
                      fontWeight: 900,
                      fontFamily: 'lato',
                     textAlign: 'left',
                      marginBottom: '8px'
                    }}>
                      {hotel.name}
                    </Typography>
                    <Typography   >
                      <div style={{  alignItems: 'left' }}>
                        <div style={{textAlign:'left', fontFamily:'lato',fontSize:'14px',fontWeight:'700',lineHeight:"17px",padding:'5px 5px 5px 5px',color:'#ff6748'}}>{hotel.ad.city?.name}</div>
                        <div style={{textAlign:'left'}}> {hotel.ad.adr}</div>
                      </div>
                     
                    </Typography>
                    <Typography variant="body2" style={{ color: 'orange', margin: '8px 0', textAlign: 'left' }}>
                      {'★'.repeat(hotel.rt)}{'☆'.repeat(5 - hotel.rt)}
                    </Typography>
                    {/* {hotel.ifca && (
                      <Typography variant="body2" style={{ color: 'green' }}>
                        Free Cancellation Available
                      </Typography>
                    )} */}
                  </Grid>

                  {/* Price and Actions */}
                  <Grid item xs={12} sm={3} style={{ textAlign: 'right' }}>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
  ₹{hotel.pops[0]?.tpc.toFixed(0)}
</Typography>
                    <Typography variant="body2" color="textSecondary" style={{ margin: '8px 0' }}>
                    {hotel.pops[0]?.fc}
                    </Typography>
                    <Button
                      variant="contained"
                      style={{ 
                        backgroundColor: '#ff6748',
                        color: '#ffffff',
                        marginTop: '8px',
                        width: '100%'
                      }}
                      onClick={() => handleSelectRoom(hotel.id)}
                    >
                      View Rooms
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            ))
          ) : (
            <Box 
  display="flex" 
  flexDirection="column" 
  alignItems="center" 
  justifyContent="center" 
  style={{ marginTop: '50px', textAlign: 'center' }}
>
  <img 
    src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" 
    alt="No results found" 
    style={{ width: '150px', height: '150px', marginBottom: '20px' }}
  />
  <Typography 
    variant="h5" 
    color="textSecondary" 
    style={{ fontWeight: 700, fontSize: '22px', marginBottom: '10px' }}
  >
    No hotels found
  </Typography>
  <Typography 
    variant="body1" 
    color="textSecondary" 
    style={{ maxWidth: '400px', marginBottom: '20px' }}
  >
    Sorry, we couldn't find any hotels matching your criteria. Try adjusting your filters and searching again.
  </Typography>
  <Button 
    variant="contained" 
    style={{ backgroundColor: '#ff6748', color: '#ffffff', fontWeight: 600 }}
    onClick={() => {
      setMinPrice(0);
      setMaxPrice(10000);
      setSelectedRating(null);
      setSelectedPropertyType([]);
    }}
  >
    Reset Filters
  </Button>
</Box>

          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ResultsPage;