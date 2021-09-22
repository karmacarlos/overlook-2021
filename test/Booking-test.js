import { assert } from 'chai';

import { data } from './data-test'; 

import { Booking } from '../src/classes/booking';

describe('Booking class', function() {
  let booking1, booking2;
  beforeEach(function() {
    booking1 = new Booking(1, '09/30/2021to10/07/2021', 14);
    booking2 = new Booking(2, '10/02/2021to10/8/2021', 25);
  })

  it('should be a function', function() {
    assert.isFunction(Booking);
    assert.instanceOf(booking1, Booking);
    assert.instanceOf(booking2, Booking);
  })

  it('should contain the user id', function() {
    assert.equal(booking1.userId, 1);
    assert.equal(booking1.userId, 2);
  })

  it('should have the check in date', function() {
    assert.equal(booking1.checkIn, '09/30/2021');
    assert.equal(booking2.checkIn, '10/02/2021');
  })

  it('should contain the checkout date', function() {
    assert.equal(booking1.checkOut, '10/07/2021');
    assert.equal(booking2.checkOut, '10/8/2021');
  })

  it('should contain the room number', function() {
    assert.equal(booking1.roomNumber, 14);
    assert.equal(booking2.roomNumber, 25);
  })

  it('should be able to store all of the sub bookings', function() {
    assert.deepEqual(booking1.singleBookings, []);
    assert.deepEqual(booking2.singleBookings, []);
  })

  it('should create an individual booking per night', function() {
    booking1.getSingleBookings();
    booking2.getSingleBookings();
    assert.equal(booking1.getSingleBookings.length, 8);
    assert.equal(booking2.getSingleBookings.length, 6);
  })
})