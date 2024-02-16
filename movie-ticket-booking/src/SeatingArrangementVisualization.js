// SeatingArrangementVisualization.js

import React from 'react';

const SeatingArrangementVisualization = ({ selectedSeats, onSelectSeat }) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];

  const handleClick = (row, seat) => {
    onSelectSeat(row, seat);
  };

  return (
    <div className="seating-arrangement">
      {rows.map(row => (
        <div key={row} className="row">
          {[...Array(row === 'F' ? 6 : 8).keys()].map(seat => (
            <div
              key={seat}
              className={`seat ${selectedSeats.some(s => s.row === row && s.seat === seat + 1) ? 'selected' : ''}`}
              onClick={() => handleClick(row, seat + 1)}
            >
              {seat + 1}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatingArrangementVisualization;
