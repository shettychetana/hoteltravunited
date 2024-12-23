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
import React from 'react';
import './App.css';
import HotelBookingForm from './components/HotelBookingForm.jsx';
import Header from './components/Header.jsx';
import MostSearchedLocations from './components/MostSearchedLocations.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResultsPage from './components/ResultsPage';
import HotelDetail from './components/HotelDetail';
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          {/* Define routes here */}
          <Route
            path="/"
            element={
              <>
                <HotelBookingForm />
                <MostSearchedLocations />
              </>
            }
          />
          <Route path="/resultpage" element={<ResultsPage />} />
          <Route path="/hotelDetail" element={<HotelDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
