//Selectors

//Buttons

//Input
const checkInInput = document.getElementById('checkInInput');
const checkOutInput = document.getElementById('checkOutInput');
// const datesInput = document.querySelector(`form[name="${datesInput}"]`);
const submitDates = document.getElementById('datesSubmit');
const typesForm = document.getElementById('roomFeaturesInput');

//Sections
const allBookings = document.getElementById('allBookings');
const totalSpent = document.getElementById('totalSpent');
const dashBoard = document.getElementById('inputBooking');
const roomsPool = document.getElementById('availableRooms');
const roomsContainer = document.getElementById('roomDisplay');

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
      <div>
        <img src="${room.image}">
        <p>${room.roomType}</p>
        <p>Cost per night: $ ${room.costPerNight}</p>
      </div>
      `
    });
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
}

export default domUpdates;