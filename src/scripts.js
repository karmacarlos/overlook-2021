/* eslint-disable max-len */

import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/junior-suite.png';
import './images/Reception.png';
import './images/residential-suite.png';
import './images/single-room.png';
import './images/suite.png';
import data from '../test/data-test';

import { fetchData, updateBookings } from './apiCalls'

import Hotel from './classes/hotel';
import Room from './classes/room';
import Booking from './classes/booking';
import Customer from './classes/customer';

const roomImgs = data.roomImgs;

function getData() {
  Promise.all([fetchData('rooms'), fetchData('bookings'), fetchData('customers')])
    .then(data => createHotel(data, roomImgs)).then(hotel => console.log(hotel))
}

getData();

function createHotel(data, roomImgs) {
  const hotel = new Hotel(data[0], data[1], data[2], roomImgs);
  // hotel.prepareRooms();
  return hotel;
}
