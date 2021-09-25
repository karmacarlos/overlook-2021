/* eslint-disable max-len */
import dayjs from 'dayjs';

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

  getSpentAmount(hotel) {
    const spentAmount = this.bookings.reduce((acc, booking) => {
      if (dayjs(booking.date).isBefore(dayjs())) {
        const room = hotel.roomsToDisplay.find(room => room.number === booking.roomNumber);
        acc += room.costPerNight;
      }
      return acc;
    }, 0).toFixed(2);
    return spentAmount;
  }
}

export default Customer;