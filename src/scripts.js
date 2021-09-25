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
  // datesInput,
  submitDates,
  dashBoard,
  roomsPool,
} = domUpdates;

// Global Variables
const roomImgs = data.roomImgs;
let hotel;
let randomCustomer;
let customerBookings;
let spentAmount;
let checkInDate;
let checkOutDate;

//Event Listeners

window.addEventListener('load', loadPage);
// submitDates.addEventListener('click', displayAvailableRooms);

//Event Handlers

function loadPage() {
  getData()
}

function displayAvailableRooms(event) {
  event.preventDefault();
  domUpdates.hide(dashBoard);
  domUpdates.show(roomsPool);
  checkInDate = checkInInput.value;
  console.log('check In', checkInDate)
  checkOutDate = checkOutInput.value;
  console.log('check Out', checkOutDate)
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
  submitDates.addEventListener('click', displayAvailableRooms);
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