// App.js

import React, { useState } from 'react';
import SeatingArrangementVisualization from './SeatingArrangementVisualization';
import TicketBookingForm from './TicketBookingForm';
import SeatSelector from './SeatSelector';
import BookingDetails from './BookingDetails';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import MovieDetailsPage from './MovieDetailsPage';
import BookingPage from './BookingPage';

const App = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalSeats] = useState(48); // Total seats in the theater

  const handleSeatSelect = (row, seat) => {
    const newSeat = { row, seat };
    const seatIndex = selectedSeats.findIndex(s => s.row === row && s.seat === seat);

    if (seatIndex !== -1) {
      const updatedSeats = [...selectedSeats.slice(0, seatIndex), ...selectedSeats.slice(seatIndex + 1)];
      setSelectedSeats(updatedSeats);
    } else {
      setSelectedSeats([...selectedSeats, newSeat]);
    }
  };

  const handleBookingSubmit = (name) => {
    if (name && selectedSeats.length > 0) {
      const newBooking = { name, seats: selectedSeats };
      setBookings([...bookings, newBooking]);
      setSelectedSeats([]);
      alert('Booking successful!');
    } else {
      alert('Please provide your name and select seats.');
    }
  };

  return (
    <div className="app">
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="/movies/booking/:movieId" element={<BookingPage/>} />
        
      </Routes>
    </Router>
  </div>
  );
};

export default App;
