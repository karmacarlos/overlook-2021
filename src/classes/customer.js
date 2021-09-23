/* eslint-disable max-len */
class Customer {
  constructor(customerDetails) {
    this.id = customerDetails.id;
    this.name = customerDetails.name;
    this.username = `customer${this.id}`;
    this.password = 'overlook2021';
    this.bookings = [];
  }

  getBookings(hotel) {
    const customerBookings = hotel.bookings.filter(booking => booking.userID === this.id);
    this.bookings = customerBookings;
    return customerBookings;
  }
}

export default Customer;