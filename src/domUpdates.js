//Selectors

//Buttons

//Input
const checkInInput = document.getElementById('checkInInput');
const checkOutInput = document.getElementById('checkOutInput');
// const datesInput = document.querySelector(`form[name="${datesInput}"]`);
const submitDates = document.getElementById('datesSubmit');
const typesForm = document.getElementById('roomFeaturesInput');
const logInForm = document.getElementById('logInForm');

//Sections
const allBookings = document.getElementById('allBookings');
const totalSpent = document.getElementById('totalSpent');
const dashBoard = document.getElementById('inputBooking');
const roomsPool = document.getElementById('availableRooms');
const roomsContainer = document.getElementById('roomDisplay');
const bookingContainer = document.getElementById('roomRender');
const bookingPreview = document.getElementById('bookingPreview');
const dashboard = document.getElementById('inputBooking');
const logInBtn = document.getElementById('logInSubmit');
const usernameInp = document.getElementById('username');
const passwordInp = document.getElementById('password');
const logInBox = document.getElementById('logInContainer');

const domUpdates = {

  renderAllBookings(customerBookings) {
    customerBookings.forEach(booking => {
      allBookings.innerHTML += `
      <p>${booking.date} - Room#: ${booking.roomNumber}</p>
      `
    })
  },

  renderAvailableRooms(availableRooms) {
    availableRooms.forEach(room => {
      roomsContainer.innerHTML += `
      <div id="${room.number}" >
        <img src="${room.image}" alt="Hotel room Image">
        <p>${room.roomType}</p>
        <p>Cost per night: $ ${room.costPerNight}</p>
      </div>
      `
    });
  },

  renderBookingPreview(booking) {
    bookingPreview.innerHTML = `
    <img src=${booking.roomToBook.image} 
    alt="Image of a hotel ${booking.roomToBook.roomType}">
    <article>${booking.roomDetails}</article>
    <article>${booking.checkIn} to ${booking.checkOut}</article>
    <article>Booking Total: $ ${booking.bookingCost}</article>
    <button id="bookNow">Book now</button>
    <button id="back">Back to rooms</button>
    `
  },

  renderSpentAmount(money) {
    totalSpent.innerText = `Total Bookings: $ ${money}`;
  },

  hide(element) {
    element.classList.add('hidden');
  },

  show(element) {
    element.classList.remove('hidden');
  },

  allBookings,
  // datesInput,
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
}

export default domUpdates;