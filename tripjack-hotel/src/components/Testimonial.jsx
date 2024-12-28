import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const testimonials = [
  {
    name: "John Doe",
    text: "This hotel was fantastic! The service was excellent and the rooms were clean.",
    image: "../images/portfoli1.png",
  },
  {
    name: "Jane Smith",
    text: "I had a wonderful experience. Highly recommend to anyone looking for a great stay!",
    image: "../images/portfoli2.png",
  },
  {
    name: "Alice Johnson",
    text: "The location was perfect, and the staff were very friendly.",
    image: "../images/portfoli3.png",
  },
];

const Testimonial = () => {
  return (
    <Box p={3} style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom align="center">
        What Our Guests Say
      </Typography>
      <Grid container spacing={3}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} style={{ padding: "16px", textAlign: "center" }}>
              <img src={testimonial.image} alt={testimonial.name} style={{ borderRadius: "50%", width: "100px", height: "100px" }} />
              <Typography variant="h6">{testimonial.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                "{testimonial.text}"
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonial;
