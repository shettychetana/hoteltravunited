
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
  Paper as MuiPaper,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
const HotelDetail = () => {
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
  
  const apiUrl = `https://tripjack.com/hms/v1/hotel-review`;
  const apiKey = '610720564f329c1c-ae91-4b19-b5b0-6083cb2fb172';

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
      console.log(data); // Log response data
      // Navigate to the review page and pass the data as state
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
    src={hotelDetail?.hotel?.img[currentImageIndex]?.url || 'https://via.placeholder.com/300x150?text=No+Image+Available'}
    alt="Room type"
    style={{ width: '100%', height: 'auto', borderRadius: '8px' }} // Adjust styles as needed
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
            ? 'Non-Refundable'
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
                    <TableContainer component={MuiPaper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Meal Plan</TableCell>
                            <TableCell>Room Type</TableCell>
                           
                            <TableCell>Cancellation Policy</TableCell>
                            <TableCell>Price </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {hotelDetail?.hotel?.pops?.map((option, index) => (
                            <TableRow key={index}>
                              <TableCell>{option.fc.join(', ')}</TableCell>
                             <TableCell>{hotelDetail.hotel.ops[0].ris[0]?.rc}</TableCell>
                              <TableCell>{option.cb === 0 ? 'Non-refundable' : 'Free Cancellation'} </TableCell>
                              <TableCell>₹{option.tpc.toFixed(2)}<button style={{padding:"10px",marginLeft:"10px",backgroundColor:"#ff7b39",color:"white",border:" none",borderRadius:"5px"}} onClick={() => navigateToReviewPage(hotelDetail.hotel.id, hotelDetail.hotel.ops[0].id)}>Book Now</button></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <div>
                  <Grid container spacing={2} style={{ marginTop: '16px' }}>
  <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold',backgroundColor:"#ff7b39",color:"white",padding:"10px",borderRadius:"5px" }}>
    <Typography variant="h6" >Room Type</Typography>
    <Typography variant="h6">Room Options</Typography>
    <Typography variant="h6" >Description</Typography>
    <Typography variant="h6" >Cancellation Policy</Typography>
    <Typography variant="h6" >Price</Typography>
  </Grid>
  {hotelDetail?.hotel?.ops?.map((roomType, index) => (
    <Grid item xs={12} key={index} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #ddd', borderRadius: '8px', padding: '16px', backgroundColor: '#fff' }}>
      <div>
    <Typography variant="body2" color="textSecondary">
      {roomType.ris[0]?.rc || 'Room Type Unavailable'}
    </Typography>
    <Grid item xs={12} md={8}>
    <div style={{ position: 'relative', textAlign: 'center' }}>
  {standardImages.length > 0 && (
    <img
      src={standardImages[currentImageIndex]?.url}
      alt="Room type"
      style={{ width: '200px', height: '150px', borderRadius: '8px' }} // Adjust styles as needed
    />
  )}
  <IconButton onClick={handlePrev} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
    <ArrowBack />
  </IconButton>
  <IconButton onClick={handleNext} style={{ position: 'absolute', right: '0px', top: '50%', transform: 'translateY(-50%)' }}>
    <ArrowForward />
  </IconButton>
</div>
</Grid>
  </div>
      <Typography variant="body2" color="textSecondary">
        {roomType.ris[0]?.mb || 'Meal Plan Unavailable'}
      </Typography>
      <ul style={{ paddingLeft: '20px',textDecoration:"none",listStyleType:"none" }}>
  {roomType.ris[0]?.rexb?.BENEFIT?.[0]?.values?.map((benefit, index) => (
    <li key={index}>
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
      <Typography variant="body2" color="textSecondary" onClick={() => handleOpenModal(roomType.cnp)}>
  {roomType.cnp?.ifra === true ? 'Free Cancellation available' : 'Non-Refundable'}
</Typography>


<Dialog open={openModal} onClose={handleCloseModal}  >
  <DialogTitle style={{backgroundColor:"#333333",color:"white", padding:"10px",borderRadius:"5px"}}> Cancellation Policy </DialogTitle>
  <DialogContent>
    {modalData && (
      <div>
       
        <Typography variant="body2" >
        Cancellation Policy
        </Typography>
        {modalData.pd.map((penalty, index) => (
          <div>
          
          <Typography variant="body2" color="textSecondary">
  Cancellation Charges of ₹{penalty.am} applicable if cancelled between  {penalty.fdt.split('T')[0]} {penalty.fdt.split('T')[1].slice(0, 5)} to {penalty.tdt.split('T')[0]} {penalty.tdt.split('T')[1].slice(0, 5)}.
</Typography>


          </div>
          
        ))}
      </div>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseModal} color="primary">Close</Button>
  </DialogActions>
</Dialog>
<div>
<Typography variant="body2" color="textSecondary">
        ₹{roomType.ris[0]?.tfcs?.TF?.toFixed(2) || 'N/A'}
      </Typography>
      <Button
  variant="contained"
  color="warning"
  fullWidth
  style={{
    marginTop: '16px',
    backgroundColor: '#ff6600',
    color: 'white',
  }}
  onClick={() => navigateToReviewPage(hotelDetail?.hotel?.id, roomType.id)}
>
  BOOK ROOM
</Button>
</div>
      
    </Grid>
  ))}
  {hotelDetail?.hotel?.ops?.length === 0 && (
    <Grid item xs={12}>
      <Typography variant="body2" color="textSecondary">
        No room types available.
      </Typography>
    </Grid>
  )}
</Grid>
                    </div>
                 
                     </div>
                  
                )}

                {value === 1 && (
                  <div>
                    <Typography variant="h6" gutterBottom>
                      Room Details
                    </Typography>
                    {hotelDetail?.hotel?.ops?.[0]?.ris?.[0] ? (
                      <>
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
                            ? 'Non-Refundable'
                            : 'Free Cancellation'}
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No room information available.
                      </Typography>
                    )}
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

















