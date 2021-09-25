//Selectors

//Buttons

//Input
const checkInInput = document.getElementById('checkInInput');
const checkOutInput = document.getElementById('checkOutInput');

//Sections
const allBookings = document.getElementById('allBookings');
const totalSpent = document.getElementById('totalSpent');


const domUpdates = {

  renderAllBookings(customerBookings) {
    customerBookings.forEach(booking => {
      allBookings.innerHTML += `
      <p>${booking.date} - Room#: ${booking.roomNumber}</p>
      `
    })
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
  totalSpent,
  checkInInput,
  checkOutInput,
}

export default domUpdates;