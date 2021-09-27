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
  submitDates,
  dashBoard,
  roomsPool,
  roomsContainer,
  typesForm,
  bookingContainer,
  bookingPreview,
  dashboard,
  logInBtn,
  usernameInp,
  passwordInp,
  logInBox,
  logInForm,
  logInError,
  checkoutError,
} = domUpdates;

// Global Variables
const roomImgs = data.roomImgs;
let hotel, customerBookings, spentAmount, checkInDate,
  checkOutDate, availableRooms, roomTypes, booking, newCustomer;

//Event Listeners

window.addEventListener('load', loadPage);
typesForm.addEventListener('click', getRoomTypes);
roomsContainer.addEventListener('click', checkRoomDetails);
bookingPreview.addEventListener('click', bookNow);
submitDates.addEventListener('click', displayAvailableRooms);
logInBtn.addEventListener('click', validateCustomer);
roomsPool.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    checkRoomDetails(event)
  }
})
// checkInInput.addEventListener('keyup', updateCheckoutMinimum)
// checkInInput.addEventListener('click', updateCheckoutMinimum)

//Event Handlers

function loadPage() {
  getData()
}

function displayAvailableRooms(event) {
  event.preventDefault();
  checkInDate = checkInInput.value;
  checkOutDate = checkOutInput.value;
  if (dayjs(checkOutDate).isBefore(dayjs(checkInDate))) {
    domUpdates.show(checkoutError);
  } else {
    domUpdates.hide(dashBoard);
    domUpdates.show(roomsPool);
    checkInDate = checkInInput.value;
    checkOutDate = checkOutInput.value;
    availableRooms = hotel.getAvailableRooms(checkInDate, checkOutDate);
    domUpdates.renderAvailableRooms(availableRooms);
  }
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
    displayDashboardInfo();
  }
}

function validateCustomer(event) {
  event.preventDefault();
  const username = usernameInp.value;
  const password = passwordInp.value;
  if ((username.length < 9 || username.length > 10) || password.length !== 12) {
    domUpdates.show(logInError);
  } else {
    const customerID = getUserID(username);
    const customerDetails = hotel.getCustomerByID(customerID);
    newCustomer = new Customer(customerDetails);
    if (newCustomer.password === password) {
    // customerBookings = newCustomer.getBookings(hotel);
      domUpdates.hide(logInBox);
      domUpdates.show(dashboard);
      logInForm.reset();
      displayDashboardInfo();
    }
  }
}

function updateCheckoutMinimum(event) {
  event.preventDefault();
  checkOutInput.min = dayjs().add('1', 'day').format('YYYY-MM-DD');
  checkOutInput.value = checkOutInput.min;
}

//Helper functions

function getData() {
  Promise.all([fetchData('rooms'), fetchData('bookings'), fetchData('customers')])
    .then(data => createHotel(data, roomImgs))
}

function createHotel(data, roomImgs) {
  hotel = new Hotel(data[0].rooms, data[1].bookings, data[2].customers, roomImgs);
  hotel.prepareRooms();
  limitDatesInput();
 
  return hotel;
}

function displayDashboardInfo() {
  customerBookings = newCustomer.getBookings(hotel);
  domUpdates.renderAllBookings(customerBookings);
  spentAmount = newCustomer.getSpentAmount(hotel);
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
    let filteredRooms = newCustomer.filterRoomsByType(roomTypes, availableRooms);
    roomsContainer.innerHTML = '';
    domUpdates.renderAvailableRooms(filteredRooms);
  } else {
    roomsContainer.innerHTML = '';
    domUpdates.renderAvailableRooms(availableRooms);
  }
}

function createBooking(roomNumber) {
  let booking = new Booking(newCustomer.id, checkInDate, checkOutDate, roomNumber);
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
      .then(() => newCustomer.getBookings(hotel))
      .then(() => displayDashboardInfo())
  })
}

function showConfirmation() {
  bookingPreview.innerHTML = `
  <h2>Your booking has been made!</h2>
  <button id="backToDashboard">Dashboard</button>
  `
  const backToDashboard = document.getElementById('backToDashboard');
  backToDashboard.addEventListener('click', function() {
    domUpdates.hide(bookingPreview)
    domUpdates.show(dashboard);
  })
}

function getUserID(username) {
  if (username.length === 10) {
    let splitedUsername = username.split('');
    let userID = parseInt(splitedUsername[8] + splitedUsername[9])
    return userID
  } else if (username.length === 9) {
    let splitedUsername = username.split('');
    let userID = parseInt(splitedUsername[8])
    return userID
  }
}