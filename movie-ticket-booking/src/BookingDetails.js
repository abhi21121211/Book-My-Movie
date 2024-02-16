// BookingDetails.js

import React from 'react';

const BookingDetails = ({ bookings, totalSeats }) => {
  const bookedSeatsCount = bookings.reduce((acc, curr) => acc + curr.seats.length, 0);
  const availableSeatsCount = totalSeats - bookedSeatsCount;

  return (
    <div className="booking-details">
      <h2>Booking Summary</h2>
      <p>Total Seats: {totalSeats}</p>
      <p>Booked Seats: {bookedSeatsCount}</p>
      <p>Available Seats: {availableSeatsCount}</p>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            {booking.name} - {booking.seats.map(seat => `${seat.row}${seat.seat}`).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingDetails;
