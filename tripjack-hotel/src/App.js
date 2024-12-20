import React from 'react';
import './App.css';
//import HotelBookingForm from './components/HotelBookingForm';
import  HotelBookingForm from '../src/components/HotelBookingForm.jsx';
import Header from './components/Header.jsx';
import MostSearchedLocations from './components/MostSearchedLocations.jsx';

function App() {
  return (
    <div className="App">
      <Header/>
      
    <HotelBookingForm/>
    <MostSearchedLocations/>
    
    </div>
  );
}

export default App;
