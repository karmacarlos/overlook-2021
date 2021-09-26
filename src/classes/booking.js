/* eslint-disable max-len */
class Booking {
  constructor(userID, checkInDate, checkOutDate, roomNumber) {
    this.userID = userID;
    this.checkIn = checkInDate;
    this.checkOut = checkOutDate;
    this.roomNumber = roomNumber;
    this.singleBookings = [];
    this.bookingCost = 0;
    this.roomDetails = '';
    this.roomToBook = {};
  }

  getSingleBookings(hotel) {
    const singleDates = hotel.getDates(this.checkIn, this.checkOut);
    const bookingsToPost = singleDates.map(date => {
      const bookingDetails = {
        userID: this.userID,
        date,
        roomNumber: this.roomNumber
      }
      return bookingDetails;
    })
    this.singleBookings = bookingsToPost;
    return bookingsToPost;
  }

  getRoomDetails(hotel) {
    const room = hotel.roomsToDisplay.find(room => room.number === this.roomNumber);
    let roomKeys = Object.keys(room);
    let roomDetails = roomKeys.reduce((acc, detail) => {
      if (detail === 'hasBidet' && room[detail]) {
        acc += 'Bidet / ';
      } else if (detail === 'bedsNumber' && room[detail] > 1) {
        acc += '2 Beds /';
      } else if (detail === 'bedsNumber' && room[detail] === 1) {
        acc += '1 Bed / ';
      } else if (detail === 'bedSize') {
        acc += `${room[detail]} bed / `;
      } else if (detail === 'costPerNight') {
        acc += `Cost per night: $ ${room[detail]}`
      }
      return acc
    }, '');
    this.roomDetails = roomDetails;
    
    return roomDetails;
  }

  getBookingCost(hotel) {
    const room = hotel.roomsToDisplay.find(room => room.number === this.roomNumber);
    const bookingCost = room.costPerNight * this.singleBookings.length;
    this.roomToBook = room;
    this.bookingCost = bookingCost;
    return bookingCost;
  }
}

export default Booking;