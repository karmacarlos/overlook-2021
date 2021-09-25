import { assert } from 'chai';
import data from './data-test'; 
import Booking from '../src/classes/booking';
import Hotel from '../src/classes/hotel';


describe.only('Booking class', function() {
  let booking1, booking2, hotel;
  beforeEach(function() {
    hotel = new Hotel(data.rooms, data.bookings, data.customers, data.roomImgs);
    hotel.prepareRooms();
    booking1 = new Booking(1, '2021/09/30', '2021/10/03', 9);
    booking2 = new Booking(2, '2021/10/02', '2021/10/07', 10);
  })

  it('should be a function', function() {
    assert.isFunction(Booking);
    assert.instanceOf(booking1, Booking);
    assert.instanceOf(booking2, Booking);
  })

  it('should contain the user id', function() {
    assert.equal(booking1.userID, 1);
    assert.equal(booking2.userID, 2);
  })

  it('should have the check in date', function() {
    assert.equal(booking1.checkIn, '2021/09/30');
    assert.equal(booking2.checkIn, '2021/10/02');
  })

  it('should contain the number of nights', function() {
    assert.equal(booking1.checkOut, '2021/10/03');
    assert.equal(booking2.checkOut, '2021/10/07');
  })

  it('should contain the room number', function() {
    assert.equal(booking1.roomNumber, 9);
    assert.equal(booking2.roomNumber, 10);
  })

  it('should be able to store all of the sub bookings', function() {
    assert.deepEqual(booking1.singleBookings, []);
    assert.deepEqual(booking2.singleBookings, []);
  })

  it('should be able to store the total cost of the booking', function() {
    assert.equal(booking1.bookingCost, 0);
    assert.equal(booking2.bookingCost, 0);
  })

  it('should create an individual booking per night', function() {
    booking1.getSingleBookings(hotel);
    booking2.getSingleBookings(hotel);
    assert.equal(booking1.singleBookings.length, 3);
    assert.equal(booking2.singleBookings.length, 5);
  })

  it('should be able to calculate the total amount of a booking', function() {
    booking1.getSingleBookings(hotel);
    booking2.getSingleBookings(hotel);
    booking1.getBookingCost(hotel);
    booking2.getBookingCost(hotel);
    assert.equal(booking1.bookingCost, 601.17);
    assert.equal(booking2.bookingCost, 2488.2);
  })
})