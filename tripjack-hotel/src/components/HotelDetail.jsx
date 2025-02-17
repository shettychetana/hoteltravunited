
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  TextField,
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
   List, ListItem,
  Paper as MuiPaper,
} from '@mui/material';
import {   ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, DialogActions,useMediaQuery } from '@mui/material';
import { useTheme } from "@mui/material/styles";

const HotelDetail = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const { hotelDetail } = location.state || {};
  console.log("hotelroom details",hotelDetail);
 const [value, setValue] = useState(0); 
 const [openModal, setOpenModal] = useState(false);
 const [modalData, setModalData] = useState(null);
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 const [isExpanded, setIsExpanded] = useState(false);
 const childAge = hotelDetail?.searchQuery.roomInfo?.[0]?.childAge || [];
 const numberOfAdults = hotelDetail?.searchQuery.roomInfo?.[0]?.numberOfAdults || 0;
 const numberOfChild = hotelDetail?.searchQuery.roomInfo?.[0]?.numberOfChild || 0;
 const adultsText = numberOfAdults >= 1 ? `${numberOfAdults} Adults` : "";
const childrenText = numberOfChild >= 1 ? `${numberOfChild} Children` : "";
const childAgeText = childAge.length >= 1 ? `Age: ${childAge.join(", ")}` : "";
const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
const handleNext = () => {
  setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hotelDetail?.hotel?.img.length);
};
const standardImages = hotelDetail?.hotel?.img?.filter(image => image.sz === "Standard"
);
const handlePrev = () => {
  setCurrentImageIndex((prevIndex) => (prevIndex - 1 + hotelDetail?.hotel?.img.length) % hotelDetail?.hotel?.img.length);
};



const navigateToReviewPage = async (hotelId, roomId) => {
  
  const apiUrl = `https://apitest.tripjack.com/hms/v1/hotel-review`;
  const apiKey = '81210652be6625-ffb6-4457-8d7b-3b87bfa351c3';

  const body = {
    hotelId: hotelId,
    optionId: roomId
  };

 

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      const data = await response.json();
      console.log("REVEIEW DATA",data); 
      navigate(`/review/${hotelId}/${roomId}`, { state: { data } });
    } else {
      console.error('Failed to submit review:', response.statusText);
    }
  } catch (error) {
    console.error('Error during API call:', error);
  }
};

// Carousel JSX
<div style={{ position: 'relative' }}>
  <img
   src={
    Array.isArray(hotelDetail?.hotel?.img) &&
    hotelDetail.hotel.img.length > currentImageIndex &&
    hotelDetail.hotel.img[currentImageIndex]?.url
      ? hotelDetail.hotel.img[currentImageIndex].url
      : 'https://via.placeholder.com/300x150?text=No+Image+Available'
  }
  
    alt="Room type"
    style={{ width: '100%', height: 'auto', borderRadius: '8px' }} // Adjust
  />
  <button onClick={handlePrev} style={{ position: 'absolute', left: '10px' }}>Prev</button>
  <button onClick={handleNext} style={{ position: 'absolute', right: '10px' }}>Next</button>
</div>
 const handleOpenModal = (data) => {
   setModalData(data);
   setOpenModal(true);
 };
 
 const handleCloseModal = () => {
   setOpenModal(false);
 };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (!hotelDetail || !hotelDetail.hotel || !hotelDetail.hotel.img) {
    return (
      <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
        <Typography variant="h5" color="textSecondary">
          No hotel details available
        </Typography>
      </div>
    );
  }

  const { name, img } = hotelDetail.hotel;

  const uniqueImages = img.filter(
    (image, index, self) => index === self.findIndex((i) => i.url === image.url) && image.sz === "Standard"
  );
  

  return (
    <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
      <Grid container spacing={2}>
       
        <Grid item xs={12} md={8}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
           
            <div style={{ width: '100%', textAlign: 'center' }}>
              <img
                src={uniqueImages[0]?.url}
                alt={`${name} main`}
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                }}
              />
            </div>

          
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
                gap: '8px',
                marginTop: '16px',
              }}
            >
              {uniqueImages.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`${name} thumbnail ${index}`}
                  style={{
                    width: '100%',
                    height: '90px',
                    borderRadius: '4px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: '2px solid transparent',
                    transition: 'border 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.border = '2px solid #ff6f61')}
                  onMouseLeave={(e) => (e.currentTarget.style.border = '2px solid transparent')}
                />
              ))}
           
            </div>
 

<div> <Typography variant="h4">{hotelDetail?.hotel?.name}</Typography>
<Typography variant="body1" style={{color:"grey"}}>
  {isExpanded ? hotelDetail?.hotel?.des.replace(/{|}/g, '') : `${hotelDetail?.hotel?.des.substring(0, 100).replace(/{|}/g, '')}...`}
</Typography>
      <Button onClick={handleToggleDescription} style={{color:'#ff6748',display:"flex",alignItems:"flex-start"}}>
        {isExpanded ? 'Read Less' : 'Read More'}
      </Button></div>


          </div>
        </Grid>

        {/* Right Section: Pricing and Booking */}
        <Grid item xs={12} md={4}>
  <Paper elevation={3} style={{ padding: '16px' }}>
    {/* Hotel Name */}
    <Typography variant="h5" gutterBottom>
      {hotelDetail?.hotel?.name || 'Hotel Name Unavailable'}
    </Typography>
    <Typography
      variant="body2"
      style={{ color: 'orange', fontWeight: 'bold' }}
    >
      {'★'.repeat(hotelDetail?.hotel?.rt || 4)}{'☆'.repeat(5 - (hotelDetail?.hotel?.rt || 4))}
    </Typography>
    <Divider style={{ margin: '16px 0' }} />

    {/* First Room Info */}
    {hotelDetail?.hotel?.ops?.[0]?.ris?.[0] ? (
      <>
        {/* Room Details */}
        <Typography variant="h6" color="primary" gutterBottom>
          ₹{hotelDetail.hotel.ops[0].ris[0]?.tfcs?.TF?.toFixed(2) || 'N/A'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {hotelDetail.hotel.ops[0].ris[0]?.rc || 'Room Type Unavailable'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {hotelDetail.hotel.ops[0].ris[0]?.mb || 'Meal Plan Unavailable'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Check-in: {hotelDetail.hotel.ops[0].ris[0]?.checkInDate || 'N/A'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Check-out: {hotelDetail.hotel.ops[0].ris[0]?.checkOutDate || 'N/A'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {hotelDetail.hotel.ops[0].ris[0]?.tfcs?.TF === 0
            ? 'Refundable policy'
            : 'Free Cancellation'}
        </Typography>
        <Divider style={{ margin: '16px 0' }} />

        {/* Benefits */}
        <Typography variant="subtitle1" gutterBottom>
          Room Benefits:
        </Typography>
        {hotelDetail.hotel.ops[0].ris[0]?.rexb?.BENEFIT?.[0]?.values?.map(
          (benefit, index) => (
            <Typography
              key={index}
              variant="body2"
              color="textSecondary"
              style={{ marginLeft: '16px' }}
            >
              - {benefit}
            </Typography>
          )
        )}
      </>
    ) : (
      <Typography variant="body2" color="textSecondary">
        No room information available.
      </Typography>
    )}

    {/* Booking Form */}
    <Typography variant="subtitle1" gutterBottom>
      Check availability
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Check-in"
          type="date"
          defaultValue={hotelDetail.hotel.ops?.[0]?.ris?.[0]?.checkInDate || ''}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Check-out"
          type="date"
          defaultValue={hotelDetail.hotel.ops?.[0]?.ris?.[0]?.checkOutDate || ''}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Persons and Rooms"
          defaultValue={`${adultsText}, ${childrenText}, ${childAgeText}`}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
      </Grid>
    </Grid>
    {/* Booking Button */}
    <Button
      variant="contained"
      color="warning"
      fullWidth
      style={{
        marginTop: '16px',
        backgroundColor: '#ff6600',
        color: 'white',
      }}
      onClick={navigateToReviewPage ? () => navigateToReviewPage(hotelDetail.hotel.id, hotelDetail.hotel.ops[0].id) : null}
    >
      BOOK THIS ROOM
    </Button>
  </Paper>
</Grid>



      </Grid>
      <Box sx={{ width: '100%', marginTop: '16px' }}>
              <Tabs value={value} onChange={handleChange} aria-label="hotel details tabs">
                <Tab label="Room info" />
                <Tab label="Room Details" />
                <Tab label="Booking" />
              </Tabs>

              {/* Tab Panels */}
              <div style={{ marginTop: '16px' }}>
                {value === 0 && (
                  <div>
                    <Typography variant="h6" gutterBottom style={{"textAlign":"left"}}>
                      Rooms
                    </Typography>
                    <div>
                    <Typography variant="h6" gutterBottom>
                      Price Options
                    </Typography>
                    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table size={isMobile ? "small" : "medium"}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#ff7b39" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Meal Plan</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Room Type</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Cancellation Policy</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hotelDetail?.hotel?.pops?.map((option, index) => (
            <TableRow key={index}>
              <TableCell>{option.fc.join(", ")}</TableCell>
              <TableCell>{hotelDetail.hotel.ops[0].ris[0]?.rc || "N/A"}</TableCell>
              <TableCell>{option.cb === 0 ? "Non-refundable" : "Free Cancellation"}</TableCell>
              <TableCell>
                ₹{option.tpc.toFixed(2)}
                <Button
                  variant="contained"
                  sx={{
                    ml: 1,
                    backgroundColor: "#ff7b39",
                    color: "white",
                    "&:hover": { backgroundColor: "#e06c2b" },
                  }}
                  onClick={() => navigateToReviewPage(hotelDetail.hotel.id, hotelDetail.hotel.ops[0].id)}
                >
                  Book Now
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                  </div>
                  <div>
                  <Grid container spacing={2} style={{ marginTop: '16px' }}>
      {/* Header Row */}
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          backgroundColor: '#ff7b39',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          flexWrap: 'wrap', 
          textAlign: 'center',
        }}>
          <Typography variant="h6" sx={{ flex: 1, minWidth: '100px' }}>
          Room Type
        </Typography>
        {!isSmallScreen && (
        <Typography variant="h6" sx={{ flex: 1, minWidth: '100px' }}>
          Room Options
        </Typography>
        )}
        {!isSmallScreen && (
        <Grid item sm={3}>
          <Typography variant="h6">Description</Typography>
        </Grid>
      )}
      {!isSmallScreen && (
        <Grid item sm={2}>
          <Typography variant="h6">Cancellation Policy</Typography>
        </Grid>
      )}
        {!isSmallScreen && (
        <Typography variant="h6" sx={{ flex: 1, minWidth: '100px' }}>
          Price
        </Typography>
        )}
      </Grid>
      

      {/* Room Details */}
      {hotelDetail?.hotel?.ops?.map((roomType, index) => (
        <Grid
          item
          xs={12}
          key={index}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }, // Column layout on small screens, row on larger screens
            justifyContent: 'space-between',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: '#fff',
          }}
        >
          {/* Room Type */}
          <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              {roomType.ris[0]?.rc || 'Room Type Unavailable'}
            </Typography>
            <div style={{ position: 'relative', textAlign: 'center' }}>
              {standardImages.length > 0 && (
                <img
                  src={standardImages[currentImageIndex]?.url}
                  alt="Room type"
                  style={{
                    width: '100%',
                    maxWidth: '200px',
                    height: 'auto',
                    borderRadius: '8px',
                  }}
                />
              )}
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <ArrowBack />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: '0px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                <ArrowForward />
              </IconButton>
            </div>
          </Grid>

          {/* Room Options */}
          <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              {roomType.ris[0]?.mb || 'Meal Plan Unavailable'}
            </Typography>
          </Grid>

          {/* Description */}
          <Grid item xs={12} md={3}>
            <ul
              style={{
                paddingLeft: '20px',
                textDecoration: 'none',
                listStyleType: 'none',
              }}
            >
              {roomType.ris[0]?.rexb?.BENEFIT?.[0]?.values?.map((benefit, i) => (
                <li key={i}>
                  <Typography variant="body2" color="textSecondary">
                    {benefit}
                  </Typography>
                </li>
              )) || (
                <Typography variant="body2" color="textSecondary">
                  No Description Available
                </Typography>
              )}
            </ul>
          </Grid>

          {/* Cancellation Policy */}
          <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => handleOpenModal(roomType.cnp)}
            >
              {roomType.cnp?.ifra === true ? 'Free Cancellation available' : 'Non-Refundable'}
            </Typography>
          </Grid>

          {/* Price & Booking */}
          <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              ₹{roomType.ris[0]?.tfcs?.TF?.toFixed(2) || 'N/A'}
            </Typography>
            <Button
              variant="contained"
              color="warning"
              fullWidth
              sx={{
                marginTop: '16px',
                backgroundColor: '#ff6600',
                color: 'white',
              }}
              onClick={() => navigateToReviewPage(hotelDetail?.hotel?.id, roomType.id)}
            >
              BOOK ROOM
            </Button>
          </Grid>
        </Grid>
      ))}

      {/* No Room Types Available */}
      {hotelDetail?.hotel?.ops?.length === 0 && (
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary">
            No room types available.
          </Typography>
        </Grid>
      )}

      {/* Cancellation Policy Dialog */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle sx={{ backgroundColor: '#333333', color: 'white', padding: '10px' }}>
          Cancellation Policy
        </DialogTitle>
        <DialogContent>
          {modalData && (
            <div>
              <Typography variant="body2">Cancellation Policy</Typography>
              {modalData.pd.map((penalty, index) => (
                <Typography key={index} variant="body2" color="textSecondary">
                  Cancellation Charges of ₹{penalty.am} applicable if canceled between{' '}
                  {penalty.fdt.split('T')[0]} {penalty.fdt.split('T')[1].slice(0, 5)} to{' '}
                  {penalty.tdt.split('T')[0]} {penalty.tdt.split('T')[1].slice(0, 5)}.
                </Typography>
              ))}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
                    </div>
                 
                     </div>
                  
                )}

                {value === 1 && (
                  <div>
                    <Typography variant="h6" gutterBottom>
                    Facilities
                    </Typography>
                    <Paper 
      elevation={3} 
      sx={{ 
        padding: 2, 
        borderRadius: "12px", 
        backgroundColor: "#f9f9f9", 
        maxWidth: 500, 
        margin: "auto",
        textAlign: "center"
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "#ff6600" }}>
        Hotel Features
      </Typography>
      <List>
        {hotelDetail?.hotel?.fl?.map((feature, index) => (
          <ListItem key={index} sx={{ display: "flex", alignItems: "center" }}>
            <ListItemIcon>
              <CheckCircleIcon sx={{ color: "#ff6600" }} />
            </ListItemIcon>
            <ListItemText 
              primary={feature} 
              primaryTypographyProps={{ variant: "body1", fontWeight: "500" }} 
            />
          </ListItem>
        ))}
      </List>
    </Paper>
                    
                  </div>
                )}

                {value === 2 && (
                  <div>
                    <Typography variant="h6" gutterBottom>
                      Booking Information
                    </Typography>
                    {/* Booking Form */}
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Check-in"
                          type="date"
                          defaultValue={hotelDetail.hotel.ops?.[0]?.ris?.[0]?.checkInDate || ''}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Check-out"
                          type="date"
                          defaultValue={hotelDetail.hotel.ops?.[0]?.ris?.[0]?.checkOutDate || ''}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Persons and Rooms"
                          defaultValue="1 Room, 2 Adults, 0 Children"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    {/* Booking Button */}
                    <Button
                      variant="contained"
                      color="warning"
                      fullWidth
                      style={{
                        marginTop: '16px',
                        backgroundColor: '#ff6600',
                        color: 'white',
                      }}
                      onClick={() => navigateToReviewPage(hotelDetail?.hotel?.id, hotelDetail?.hotel?.ops?.id)}
                    >
                      BOOK THIS ROOM
                    </Button>
                  </div>
                )}
              </div>
            </Box>
            
    </div>
  );
};

export default HotelDetail;
