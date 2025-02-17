// import React from 'react';
// import './App.css';
// //import HotelBookingForm from './components/HotelBookingForm';
// import  HotelBookingForm from '../src/components/HotelBookingForm.jsx';
// import Header from './components/Header.jsx';
// import MostSearchedLocations from './components/MostSearchedLocations.jsx';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ResultsPage from './components/ResultsPage';
// function App() {
//   return (
//     <div className="App">
//             <Header/>
      
//       {/* <HotelBookingForm/>
//       <MostSearchedLocations/> */}
//       <Router>
//       <Routes>
//         <Route path="/"  element={
//               <>
//                 <HotelBookingForm />
//                 <MostSearchedLocations />
//               </> }/>
//         <Route path="/results" element={<ResultsPage />} />
//       </Routes>
//     </Router>

    
//     </div>
//   );
// }

// export default App;
//import React from 'react';

// import './App.css';
// import HotelBookingForm from './components/HotelBookingForm.jsx';
// import Header from './components/Header.jsx';
// import MostSearchedLocations from './components/MostSearchedLocations.jsx';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ResultsPage from './components/ResultsPage';
// import HotelDetail from './components/HotelDetail';
// import ReviewPage from './components/ReviewPage';
// import PopularPlaces from './components/PopularPlaces.jsx';
// import Testimonial from './components/Testimonial.jsx';
// import Footer from './components/Footer.jsx';
// import BookingPage from './components/BookingPage';
// import Payment from './components/Payment';
// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Header />
//         <Routes>
//           {/* Define routes here */}
//           <Route
//             path="/"
//             element={
//               <>
//                 <HotelBookingForm />
//                 <MostSearchedLocations />
//                 <PopularPlaces/>
//                 <Testimonial/>

//               </>
//             }
//           />
//           <Route path="/resultpage" element={<ResultsPage />} />
//           <Route path="/hotelDetail" element={<HotelDetail />} />
//           <Route path="/review/:hotelId/:roomId" element={<ReviewPage />} />
//           <Route path="/booking" element={<BookingPage />} />
//           <Route path="/payment" element={<Payment />} />
//         </Routes>
//         <Footer>
//         <Footer/>
//         </Footer>
        
//       </Router>
//     </div>
//   );
// }

// export default App;
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Import Components
import HotelBookingForm from "./components/HotelBookingForm.jsx";
import Header from "./components/Header.jsx";
import MostSearchedLocations from "./components/MostSearchedLocations.jsx";
import ResultsPage from "./components/ResultsPage";
import HotelDetail from "./components/HotelDetail";
import ReviewPage from "./components/ReviewPage";
import PopularPlaces from "./components/PopularPlaces.jsx";
import Testimonial from "./components/Testimonial.jsx";
import Footer from "./components/Footer.jsx";
import BookingPage from "./components/BookingPage";
import Payment from "./components/Payment";
import BookingDetails from "./components/BookingDetails";
// Import WebSocket functions
import { initSocket, closeSocket } from "./utils/socket"; // Ensure this file exists

function App() {
  useEffect(() => {
    const socket = initSocket(); // Initialize WebSocket when the app loads

    return () => {
      closeSocket(); // Close WebSocket when the app unmounts
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HotelBookingForm />
                <MostSearchedLocations />
                <PopularPlaces />
                <Testimonial />
              </>
            }
          />
          <Route path="/resultpage" element={<ResultsPage />} />
          <Route path="/hotelDetail" element={<HotelDetail />} />
          <Route path="/review/:hotelId/:roomId" element={<ReviewPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/booking-details" element={<BookingDetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
