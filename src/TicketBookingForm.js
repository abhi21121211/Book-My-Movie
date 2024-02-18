// TicketBookingForm.js

import React, { useState } from 'react';

const TicketBookingForm = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleNameChange} placeholder="Your Name" required />
      <button type="submit">Book</button>
    </form>
  );
};

export default TicketBookingForm;
