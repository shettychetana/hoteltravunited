
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Paper, Button, Grid } from '@mui/material';
import "../styles/Review.css";

const ReviewPage = () => {
  const location = useLocation();
  const data = location.state?.data || null; // Access the data passed via navigate

  const calculateDateDifference = (checkinDate, checkoutDate) => {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const differenceInTime = checkout - checkin; // Difference in milliseconds
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert to days
    return differenceInDays;
  };

  // Calculate the difference
  const nightCount = data ? calculateDateDifference(data.query.checkinDate, data.query.checkoutDate) : 0;

  const renderImages = (images) => {
    if (images.length === 0) return null; // Return null if there are no images
  
    const image = images[0]; // Get the first image
    return (
      <img
        key={0} // Use a constant key since we're only rendering one image
        src={image.url}
        alt="Hotel Image"
        style={{ width: '150px', height: '100px', marginRight: '8px', borderRadius: '4px' }}
      />
    );
  };

  return (
    <div style={{ padding: '16px', maxWidth:"1200px", margin: '0 auto' }}>
      <div className="container">
      {/* Left Section */}
      <div className="left-section">
       <Grid container spacing={2} >
  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{ flexBasis: '4fr' }}>
  <h1 className="hotel-name" style={{textAlign:'left'}}>{data.hInfo.name}</h1>
        <p className="hotel-tag" style={{textAlign:'left'}}>{data.hInfo.pt}</p>
        <p className="hotel-address" style={{textAlign:'left',fontWeight:'bolder'}}>
          {data.hInfo.ad.adr}, {data.hInfo.ad.state.name}, {data.hInfo.ad.country.name}
        </p>
  </Grid>
  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{ flexBasis: '0.5fr',alignContent:"right" }}>
  <div style={{textAlign:'right'}}>{renderImages(data.hInfo.img)}</div>
  </Grid>
</Grid> 
        

        {/* Booking Details */}
        <div className="booking-details">
          <div>
            <strong>CHECK IN</strong>
            <p>{data.query.checkinDate}</p>
            
          </div>
          <div>
            {/* <strong>1 NIGHT</strong> */}
            <strong>{nightCount} NIGHT{nightCount !== 1 ? 'S' : ''}</strong>
          </div>
          <div>
            <strong>CHECK OUT</strong>
            <p>{data.query.checkoutDate}</p>
            
          </div>
        </div>

        {/* Room Details */}
        <div className="room-details">
          <h2 style={{textAlign:'left'}}>{data.hInfo.ops[0].ris[0]?.srn}</h2>
          <p style={{textAlign:'left'}}>{data.hInfo.ops[0].ris[0]?.adt} Adults {data.hInfo.ops[0].ris[0]?.chd > 0 && `, ${data.hInfo.ops[0].ris[0]?.chd} Children`}</p>
          
          <p>{data.hInfo.fl.join(', ')}</p>
          <p className="non-refundable">Non-Refundable</p>
          <p className="policy-link">Cancellation policy details</p>
        </div>

        {/* Important Information */}
        <div className="important-info">
          <h3>Important Information</h3>
          <ul>
            <li>Primary guest should be at least 18 years of age</li>
            <li>
              Passport, Aadhar, Driving License, and Govt. ID are accepted as ID
              proof(s)
            </li>
            <li>Pets are not allowed</li>
            <li>Outside food is not allowed</li>
          </ul>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Price Breakup */}
        <div className="price-breakup">
          <h3>Price Breakup</h3>
          <div className="price-row">
            <span>1 Room x 1 Night</span>
            <span>₹ 9,499</span>
          </div>
          <div className="price-row">
            <span>Hotel Taxes</span>
            <span>₹ 1,710</span>
          </div>
          <div className="price-row">
            <span>Donate ₹5 to build resilient travel destinations</span>
            <span>₹ 0</span>
          </div>
          <div className="total-price">
            <strong>Total Amount to be paid</strong>
            <strong>₹ 11,209</strong>
          </div>
        </div>

        {/* Coupon Code Section */}
        <div className="coupon-section">
          <h3>Coupon Codes</h3>
          <div className="coupon">
            <input type="radio" id="coupon1" name="coupon" />
            <label htmlFor="coupon1">
              <strong>MMTBIG5G</strong>
              <p>
                Enjoy 3-Month No-Cost EMI on Credit Cards from HDFC, ICICI, SBI,
                Axis, and more!
              </p>
            </label>
          </div>
          <p>MMT Gift Cards can be applied at payment step</p>
          <div className="apply-coupon">
            <input type="text" placeholder="Have a Coupon Code?" />
            <button>→</button>
          </div>
        </div>
      </div>
    </div>
      <div>
        <Grid container spacing={2} style={{ marginBottom: '16px' }}>
  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{ flexBasis: '4fr', border: '1px solid red' }}>
    cvcdhgtfkl uvyg
  </Grid>
  <Grid item xs={12} sm={6} md={6} lg={6} xl={6} style={{ flexBasis: '0.5fr',border: '1px solid red' }}>
    {/* Add content here */}
    hdddddd
  </Grid>
</Grid></div>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h4" gutterBottom>
          Review Details
        </Typography>
        {data ? (
          <div>
            <Typography variant="h6">Hotel Name: {data.hInfo.name}</Typography>
            <Typography variant="body1">Hotel ID: {data.hInfo.id}</Typography>
            <Typography variant="body1">Booking ID: {data.bookingId}</Typography>
            <Typography variant="h6" style={{ marginTop: '16px' }}>
              Hotel Images:
            </Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16px' }}>
              {renderImages(data.hInfo.img)}
            </div>
            <Typography variant="h6">Hotel Address:</Typography>
            <Typography variant="body1">
              {data.hInfo.ad.adr}, {data.hInfo.ad.city.name}, {data.hInfo.ad.state.name}, {data.hInfo.ad.country.name}
            </Typography>
            <Typography variant="h6" style={{ marginTop: '16px' }}>
              Features:
            </Typography>
            <ul>
              {data.hInfo.fl.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <Typography variant="h6" style={{ marginTop: '16px' }}>
              Room Details:
            </Typography>
            {data.hInfo.ops.map((option, index) => (
              <Paper
                key={index}
                elevation={2}
                style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#f9f9f9' }}
              >
                <Typography variant="body1">
                  Room Type: {option.ris[0].rc}
                </Typography>
                <Typography variant="body1">
                  Price: {option.tp} {option.sc}
                </Typography>
                <Typography variant="body1">
                  Check-in: {option.ris[0].checkInDate}
                </Typography>
                <Typography variant="body1">
                  Check-out: {option.ris[0].checkOutDate}
                </Typography>
                <Typography variant="body1">Meal: {option.ris[0].mb}</Typography>
              </Paper>
            ))}
            <Typography variant="h6" style={{ marginTop: '16px' }}>
              Alerts:
            </Typography>
            {data.alerts.length > 0 ? (
              data.alerts.map((alert, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  style={{ padding: '16px', marginBottom: '16px', backgroundColor: '#ffe9e9' }}
                >
                  <Typography variant="body1">
                    <strong>Type:</strong> {alert.type}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Old CNP:</strong> {JSON.stringify(alert.oldCnp, null, 2)}
                  </Typography>
                  <Typography variant="body1">
                    <strong>New CNP:</strong> {JSON.stringify(alert.newCnp, null, 2)}
                  </Typography>
                </Paper>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">
                No alerts available.
              </Typography>
            )}
          </div>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No review data available.
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </Paper>
    </div>
  );
};

export default ReviewPage;
