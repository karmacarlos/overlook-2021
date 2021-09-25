/* eslint-disable max-len */
class Booking {
  constructor(userID, checkInDate, checkOutDate, roomNumber) {
    this.userID = userID;
    this.checkIn = checkInDate;
    this.checkOut = checkOutDate;
    this.roomNumber = roomNumber;
    this.singleBookings = [];
    this.bookingCost = 0;
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

  getBookingCost(hotel) {
    const room = hotel.roomsToDisplay.find(room => room.number === this.roomNumber);
    const bookingCost = room.costPerNight * this.singleBookings.length;
    this.bookingCost = bookingCost;
    return bookingCost;
  }
}

export default Booking;