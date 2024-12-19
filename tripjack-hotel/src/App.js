import React from 'react';
import './App.css';
//import HotelBookingForm from './components/HotelBookingForm';
import  HotelBookingForm from '../src/components/HotelBookingForm.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <div className="App">
      <Header/>
      
    <HotelBookingForm/>

    </div>
  );
}

export default App;
