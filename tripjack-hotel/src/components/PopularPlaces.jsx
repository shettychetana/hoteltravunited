// import React from "react";
// import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

// const PopularPlaces = () => {
//   const places = [
//     {
//       name: "Delhi",
//       description: "Amazing journey",
//       image: "https://via.placeholder.com/300x200?text=Delhi",
//     },
//     {
//       name: "Gwalior",
//       description: "Historical architecture",
//       image: "https://via.placeholder.com/300x200?text=Gwalior",
//     },
//     {
//       name: "Jaipur",
//       description: "Iconic palaces",
//       image: "https://via.placeholder.com/300x200?text=Jaipur",
//     },
//     {
//       name: "Pune",
//       description: "Amazing nature",
//       image: "https://via.placeholder.com/300x200?text=Pune",
//     },
//   ];

//   return (
//     <Box p={3} style={{maxwidth:"1200px"}}> 
//       <Typography variant="h4" gutterBottom>
//         Popular Places
//       </Typography>
//       <Grid container spacing={3}>
//         {places.map((place, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={place.image}
//                 alt={place.name}
//               />
//               <CardContent>
//                 <Typography variant="h6">{place.name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {place.description}
//                 </Typography>
//               </CardContent>
//               <Box p={2}>
//                 <Button variant="contained" color="primary" fullWidth>
//                   Book a Hotel
//                 </Button>
//               </Box>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default PopularPlaces;
import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

const PopularPlaces = () => {
  const places = [
    {
      name: "Delhi",
      description: "Amazing journey",
      image: "../a.png",
    },
    {
      name: "Gwalior",
      description: "Historical architecture",
      image: "../a1.png",
    },
    {
      name: "Jaipur",
      description: "Iconic palaces",
      image: "../a2.png",
    },
    {
      name: "Pune",
      description: "Amazing nature",
      image: "../a4.png",
    },
  ];

  return (
    <Box p={3} style={{ maxWidth: "1200px", margin: "0 auto" }}> 
      <Typography variant="h4" gutterBottom align="center">
        Popular Places
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {places.map((place, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={place.image}
                alt={place.name}
              />
              <CardContent>
                <Typography variant="h6">{place.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {place.description}
                </Typography>
              </CardContent>
              <Box p={2}>
                <Button variant="contained"  fullWidth style={{backgroundColor:"#ff7043"}}>
                  Book a Hotel
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularPlaces;