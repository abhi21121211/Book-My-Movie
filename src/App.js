// App.js

import React, { useState } from 'react';
import SeatingArrangementVisualization from './SeatingArrangementVisualization';
import TicketBookingForm from './TicketBookingForm';
import SeatSelector from './SeatSelector';
import BookingDetails from './BookingDetails';
import './App.css';

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
      <h1>Book My Movie</h1>
      <SeatingArrangementVisualization selectedSeats={selectedSeats} onSelectSeat={handleSeatSelect} />
      <TicketBookingForm onSubmit={handleBookingSubmit} />
      <BookingDetails bookings={bookings} totalSeats={totalSeats} />
    </div>
  );
};

export default App;
