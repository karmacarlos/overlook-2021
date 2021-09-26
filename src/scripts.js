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
  roomsContainer,
  typesForm,
  bookingContainer,
  bookingPreview,
  dashboard,
} = domUpdates;

// Global Variables
const roomImgs = data.roomImgs;
let hotel, randomCustomer, customerBookings, spentAmount, checkInDate,
  checkOutDate, availableRooms, roomTypes, booking

//Event Listeners

window.addEventListener('load', loadPage);
// submitDates.addEventListener('click', displayAvailableRooms);
typesForm.addEventListener('click', getRoomTypes);
roomsContainer.addEventListener('click', checkRoomDetails);
bookingPreview.addEventListener('click', bookNow);
submitDates.addEventListener('click', displayAvailableRooms);

//Event Handlers

function loadPage() {
  getData()
}

function displayAvailableRooms(event) {
  event.preventDefault();
  domUpdates.hide(dashBoard);
  domUpdates.show(roomsPool);
  checkInDate = checkInInput.value;
  checkOutDate = checkOutInput.value;
  availableRooms = hotel.getAvailableRooms(checkInDate, checkOutDate);
  domUpdates.renderAvailableRooms(availableRooms);
}

function checkRoomDetails(event) {
  event.preventDefault();
  domUpdates.hide(roomsPool);
  domUpdates.show(bookingPreview);
  domUpdates.show(bookingContainer);
  let roomNumber;
  if (parseInt(event.target.parentNode.id)) {
    roomNumber = parseInt(event.target.parentNode.id);
  } else {
    roomNumber = parseInt(event.target.id);
  }
  booking = createBooking(roomNumber);
  domUpdates.renderBookingPreview(booking);
}

function bookNow(event) {
  event.preventDefault();
  if (event.target.id === 'bookNow') {
    postBookings(booking)
  } else if (event.target.id === 'back') {
    domUpdates.hide(bookingPreview);
    domUpdates.show(roomsPool);
  }
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
  // submitDates.addEventListener('click', displayAvailableRooms);
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

function getRoomTypes() {
  roomTypes = [];
  let checkedTypes = document.querySelectorAll('input[type=checkbox]:checked');
  checkedTypes.forEach(checkedBox => {
    roomTypes.push(checkedBox.value);
  })
  if (roomTypes.length) {
    let filteredRooms = randomCustomer.filterRoomsByType(roomTypes, availableRooms);
    roomsContainer.innerHTML = '';
    domUpdates.renderAvailableRooms(filteredRooms);
  } else {
    roomsContainer.innerHTML = '';
    domUpdates.renderAvailableRooms(availableRooms);
  }
}

function createBooking(roomNumber) {
  let booking = new Booking(randomCustomer.id, checkInDate, checkOutDate, roomNumber);
  booking.getSingleBookings(hotel);
  booking.getRoomDetails(hotel);
  booking.getBookingCost(hotel);
  return booking;
}

function postBookings(booking) {
  Promise.all(
    booking.singleBookings.map(booking => {
      return updateBookings(booking.userID, booking.date, booking.roomNumber)
    })).then(() => {
    fetchData('bookings')
      .then(data => hotel.bookings = data.bookings)
      .then(() => showConfirmation())
  })
}

function showConfirmation() {
  bookingPreview.innerHTML = `
  <h2>Your booking has been made!</h2>
  <button id="backToDashboard">Dashboard</button>
  `
  const backToDashboard = document.getElementById('backToDashboard');
  backToDashboard.addEventListener('click', function() {
    domUpdates.hide(bookingPreview);
    domUpdates.show(dashboard);
  })
}