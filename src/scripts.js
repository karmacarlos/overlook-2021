/* eslint-disable max-len */
//Imports
import './css/base.scss';
import dayjs from 'dayjs';
import data from '../test/data-test';
import { fetchData, updateBookings } from './apiCalls'
import Hotel from './classes/hotel';
import Booking from './classes/booking';
import Customer from './classes/customer';
import domUpdates from './domUpdates';
import './images/junior-suite.png';
import './images/suite.png';
import './images/residential-suite.png';
import './images/single-room.png';

const {
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
  apology,
  home,
  logOutBtn,
  logInContainer,
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
home.addEventListener('click', bringMeHome);
logOutBtn.addEventListener('click', logOut);
roomsPool.addEventListener('keyup', enableTab);
checkInInput.addEventListener('change', updateCheckoutMinimum);

//Event Handlers

function loadPage() {
  getData()
}

function displayAvailableRooms(event) {
  event.preventDefault();
  checkInDate = checkInInput.value;
  checkOutDate = checkOutInput.value;
  availableRooms = hotel.getAvailableRooms(checkInDate, checkOutDate);
  if (dayjs(checkOutDate).isBefore(dayjs(checkInDate))) {
    domUpdates.show(checkoutError);
    domUpdates.hide(apology);
  } else if (typeof(availableRooms) === 'string') {
    domUpdates.hide(checkoutError);
    domUpdates.show(apology);
  } else {
    domUpdates.hide(apology);
    domUpdates.hide(checkoutError);
    domUpdates.hide(dashBoard);
    domUpdates.show(roomsPool);
    checkInDate = checkInInput.value;
    checkOutDate = checkOutInput.value;
    domUpdates.renderAvailableRooms(availableRooms);
  }
}

function checkRoomDetails(event) {
  event.preventDefault();
  let roomNumber;
  let targetParentId = parseInt(event.target.parentNode.id);
  let targetId = parseInt(event.target.id);
  if (targetParentId) {
    domUpdates.hide(roomsPool);
    domUpdates.show(bookingPreview);
    domUpdates.show(bookingContainer);
    roomNumber = targetParentId;
    booking = createBooking(roomNumber);
    domUpdates.renderBookingPreview(booking);
  } else if (targetId) {
    domUpdates.hide(roomsPool);
    domUpdates.show(bookingPreview);
    domUpdates.show(bookingContainer);
    roomNumber = targetId;
    booking = createBooking(roomNumber);
    domUpdates.renderBookingPreview(booking);
  }
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
      domUpdates.hide(logInBox);
      domUpdates.show(dashboard);
      logInForm.reset();
      displayDashboardInfo();
    }
  }
}

function updateCheckoutMinimum(event) {
  event.preventDefault();
  checkOutInput.min = dayjs(checkInInput.value).add('1', 'day').format('YYYY-MM-DD')
  checkOutInput.value = checkOutInput.min;
}

function bringMeHome() {
  if (newCustomer) {
    domUpdates.show(dashboard);
    domUpdates.hide(roomsPool)
    domUpdates.hide(bookingPreview);
    domUpdates.hide(bookingContainer);
    limitDatesInput();
  }
}

function logOut() {
  newCustomer = null;
  domUpdates.show(logInBox);
  domUpdates.hide(dashboard);
  domUpdates.hide(roomsPool)
  domUpdates.hide(bookingPreview);
  domUpdates.hide(bookingContainer);
  limitDatesInput();
}

function enableTab() {
  if (event.keyCode === 13) {
    checkRoomDetails(event)
  }
}

//Helper functions

function getData() {
  Promise.all([fetchData('rooms'), fetchData('bookings'), fetchData('customers')])
    .then(data => createHotel(data, roomImgs))
    .catch(error => displayErrorMessage(error, logInContainer))
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
      .catch(error => displayErrorMessage(error, bookingPreview))
  })
}

function showConfirmation() {
  bookingPreview.innerHTML = `
  <h2>Your booking has been made!</h2>
  <button id="backToDashboard">Dashboard</button>
  `
  const backToDashboard = document.getElementById('backToDashboard');
  backToDashboard.addEventListener('click', function() {
    roomsContainer.innerHTML = ''
    domUpdates.hide(bookingPreview)
    domUpdates.show(dashboard);
  })
}

function getUserID(username) {
  if (username.length === 10) {
    let splittedUsername = username.split('');
    let userID = parseInt(splittedUsername[8] + splittedUsername[9])
    return userID
  } else if (username.length === 9) {
    let splittedUsername = username.split('');
    let userID = parseInt(splittedUsername[8])
    return userID
  }
}

function displayErrorMessage(error, container) {
  console.warn(error);
  container.innerHTML = `<p id="connectivityError" class="connectivity-error "> Our clerks are having lunch, please come back later </p>`;
}