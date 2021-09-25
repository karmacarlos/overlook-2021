/* eslint-disable max-len */
//Imports
import './css/base.scss';
import dayjs from 'dayjs';
import data from '../test/data-test';

import { fetchData, updateBookings } from './apiCalls'

import Hotel from './classes/hotel';
import Room from './classes/room';
import Booking from './classes/booking';
import Customer from './classes/customer';
import domUpdates from './domUpdates';

//Destructuring assignment
const {
  allBookings,
  totalSpent,
  checkInInput,
  checkOutInput,
} = domUpdates;

// Global Variables
const roomImgs = data.roomImgs;
let hotel;
let randomCustomer;
let customerBookings;
let spentAmount;

//Event Listeners

window.addEventListener('load', loadPage)

//Event Handlers

function loadPage() {
  getData()
}

//Helper functions

function getData() {
  Promise.all([fetchData('rooms'), fetchData('bookings'), fetchData('customers')])
    .then(data => createDashboard(data, roomImgs))
}

function createDashboard(data, roomImgs) {
  hotel = new Hotel(data[0].rooms, data[1].bookings, data[2].customers, roomImgs);
  hotel.prepareRooms();
  randomCustomer = new Customer(hotel.getRandomCustomer());
  customerBookings = randomCustomer.getBookings(hotel);
  displayDashboardInfo();
  limitDatesInput();
  
  return hotel;
}

function displayDashboardInfo() {
  domUpdates.renderAllBookings(customerBookings);
  spentAmount = randomCustomer.getSpentAmount(hotel);
  domUpdates.renderSpentAmount(spentAmount);
}

function limitDatesInput() {
  checkInInput.min = dayjs().format('YYYY-MM-DD');
  checkInInput.value = checkInInput.min;
  checkOutInput.min = dayjs().add('1', 'day').format('YYYY-MM-DD');
  checkOutInput.value = checkOutInput.min;
}