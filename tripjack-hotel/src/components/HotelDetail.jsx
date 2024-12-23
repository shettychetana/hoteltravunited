import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  Box,
  TextField,
} from '@mui/material';

const HotelDetail = () => {
  const location = useLocation();
  const { hotelDetail } = location.state || {};

  // Check if hotelDetail is available
  if (!hotelDetail) {
    return (
      <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
        <Typography variant="h5" color="textSecondary">
          No hotel detail available
        </Typography>
      </div>
    );
  }

  const {
    name = 'Hotel Name Not Available',
    images = [],
    description = 'Description not available.',
    price = 0,
    rating = 0,
    address = 'Address not available.',
    amenities = [],
  } = hotelDetail;

  return (
    <div style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
      <Grid container spacing={2}>
        {/* Left Section: Images and Overview */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            {/* Main Image */}
            <img
              src={images[0] || 'placeholder.jpg'}
              alt={name}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            {/* Image Carousel */}
            <Box
              display="flex"
              overflow="auto"
              mt={2}
              style={{ gap: '8px', scrollbarWidth: 'thin' }}
            >
              {images.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={img || 'placeholder.jpg'}
                  alt={`Slide ${index}`}
                  style={{
                    width: '100px',
                    height: '70px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </Box>
            {/* Description */}
            <Typography variant="body1" mt={2}>
              {description}
            </Typography>
            {/* Amenities */}
            <Typography variant="subtitle1" mt={2}>
              Amenities:
            </Typography>
            <ul>
              {amenities.length > 0 ? (
                amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))
              ) : (
                <li>No amenities available</li>
              )}
            </ul>
          </Paper>
        </Grid>

        {/* Right Section: Pricing and Booking */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            {/* Hotel Name and Rating */}
            <Typography variant="h5" gutterBottom>
              {name}
            </Typography>
            <Typography
              variant="body2"
              style={{ color: 'orange', fontWeight: 'bold' }}
            >
              {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {address}
            </Typography>
            <Divider style={{ margin: '16px 0' }} />
            {/* Pricing */}
            <Typography variant="h6" color="primary">
              ₹{price.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Deluxe Double Room - 1 Double Bed - Package Deal
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Includes Breakfast
            </Typography>
            <Divider style={{ margin: '16px 0' }} />
            {/* Booking Form */}
            <Typography variant="subtitle1" gutterBottom>
              Check availability
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Check-in"
                  type="date"
                  defaultValue="2024-12-24"
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
                  defaultValue="2024-12-25"
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
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default HotelDetail;
