/* eslint-disable max-len */
import Room from "./room";
const dayjs = require('dayjs');


class Hotel {
  constructor(rooms, bookings, customers, roomImgs) {
    this.rooms = rooms;
    this.bookings = bookings;
    this.customers = customers;
    this.roomImgs = roomImgs;
    this.roomsToDisplay = [];
  }

  prepareRooms() {
    this.rooms.forEach(roomDetails => {
      const roomReady = new Room(roomDetails);
      roomReady.getRoomImg(this.roomImgs);
      this.roomsToDisplay.push(roomReady);
    });
    return this.roomsToDisplay;
  }

  getRandomCustomer() {
    const randomCustomer = this.customers[Math.floor(Math.random() * this.customers.length)];
    return randomCustomer;
  }

  getDates(startDate, stopDate) {
    const dateArray = [];
    let currentDate = dayjs(startDate);
    const checkOutDate = dayjs(stopDate);
    while (currentDate < checkOutDate) {
      dateArray.push(dayjs(currentDate).format('YYYY/MM/DD') )
      currentDate = dayjs(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  getAvailableRooms(checkInDate, checkOutDate) {
    const bookingSearch = this.getDates(checkInDate, checkOutDate);
    const availableRooms = this.roomsToDisplay.reduce((acc, room) => {
      let filterBookingsByRoom = this.bookings.filter(booking => booking.roomNumber === room.number);
      let isBooked = filterBookingsByRoom.some(booking => bookingSearch.includes(booking.date))
      if (!filterBookingsByRoom.length) {
        acc.push(room);
      } else if (!isBooked) {
        acc.push(room);
      }
      return acc;
    }, [])

    if (!availableRooms.length) {
      return 'We are very sorry, there is not an available room for this dates';
    }
    return availableRooms;
  }
}

export default Hotel;
