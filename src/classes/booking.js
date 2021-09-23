class Booking {
  constructor(userID, checkInDate, checkOutDate, roomNumber) {
    this.userID = userID;
    this.checkIn = checkInDate;
    this.checkOut = checkOutDate;
    this.roomNumber = roomNumber;
    this.singleBookings = [];
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
}

export default Booking;