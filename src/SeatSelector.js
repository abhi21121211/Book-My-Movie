// SeatSelector.js

import React from 'react';

const SeatSelector = ({ selectedSeats, onSelectSeat }) => {
  const handleClick = (row, seat) => {
    onSelectSeat(row, seat);
  };

  return (
    <div className="seat-selector">
      <h2>Select Your Seats</h2>
     
    </div>
  );
};

export default SeatSelector;
