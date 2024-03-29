import React, { useState, useEffect } from 'react';


const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [bookings, setBookings] = useState([]); // State to store bookings

  useEffect(() => {
    // Load show data from localStorage on component mount
    const showData = JSON.parse(localStorage.getItem('showData'));
    if (showData) {
      // Initialize bookings state with any existing bookings from localStorage
      const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      setBookings(existingBookings);
    }
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleSeatSelect = (event) => {
    setSelectedSeats(parseInt(event.target.value));
  };

  const handleBookingSubmit = () => {
    if (selectedDate && selectedTime) {
      const newBooking = { date: selectedDate, time: selectedTime, seats: selectedSeats };
      setBookings([...bookings, newBooking]);
      localStorage.setItem('bookings', JSON.stringify([...bookings, newBooking]));
      // Reset selected data after booking
      setSelectedDate('');
      setSelectedTime('');
      setSelectedSeats(1);
      alert('Booking successful!');
    } else {
      alert('Please select date and time before booking.');
    }
  };

  const showData = JSON.parse(localStorage.getItem('showData'));

  return (
    <div className="booking-page">
      <h2>Book Movie Show</h2>
      <div className="date-selection">
        <h3>Select Date:</h3>
        {showData && showData.showDates.map(date => (
          <button key={date} onClick={() => handleDateSelect(date)}>{date}</button>
        ))}
      </div>
      {selectedDate && (
        <div className="time-selection">
          <h3>Select Time:</h3>
          {showData && showData.showTimings[selectedDate].map(time => (
            <button key={time} onClick={() => handleTimeSelect(time)}>{time}</button>
          ))}
        </div>
      )}
      {selectedTime && (
        <div className="seat-selection">
          <h3>Select Number of Seats:</h3>
          <select value={selectedSeats} onChange={handleSeatSelect}>
            {[...Array(showData.availableSeats[selectedDate][selectedTime] + 1).keys()].slice(1).map(seat => (
              <option key={seat} value={seat}>{seat}</option>
            ))}
          </select>
        </div>
      )}
      {selectedDate && selectedTime && (
        <div className="booking-button">
          <button onClick={handleBookingSubmit}>Book Show</button>
        </div>
      )}
      {/* Display current bookings */}
      <div className="current-bookings">
        <h2>Current Bookings</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Seats</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.seats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingPage;





// Function to generate sample show data
const generateSampleShowData = () => {
    const sampleData = {
      showDates: ['2024-02-20', '2024-02-21', '2024-02-22'], // Sample show dates
      showTimings: {
        '2024-02-20': ['10:00 AM', '2:00 PM', '6:00 PM'], // Sample show timings for each date
        '2024-02-21': ['11:00 AM', '3:00 PM', '7:00 PM'],
        '2024-02-22': ['9:00 AM', '1:00 PM', '5:00 PM'],
      },
      availableSeats: {
        '2024-02-20': {
          '10:00 AM': 50, '2:00 PM': 30, '6:00 PM': 20 // Sample available seats for each show timing
        },
        '2024-02-21': {
          '11:00 AM': 40, '3:00 PM': 25, '7:00 PM': 15
        },
        '2024-02-22': {
          '9:00 AM': 55, '1:00 PM': 35, '5:00 PM': 18
        }
      }
    };
  
    // Store sample data in localStorage
    localStorage.setItem('showData', JSON.stringify(sampleData));
  };
  
  // Function to get show data from localStorage
  const getShowData = () => {
    const storedData = localStorage.getItem('showData');
    return storedData ? JSON.parse(storedData) : null;
  };
  
  // Generate and store sample show data when needed
  if (!localStorage.getItem('showData')) {
    generateSampleShowData();
  }
  
  // Example usage:
  const showData = getShowData();
  console.log(showData);
  