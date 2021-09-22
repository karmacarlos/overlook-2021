import { assert } from 'chai';

import { data } from './data-test'; 

import { Booking } from '../src/classes/booking';

describe('Booking class', function() {
  let booking,
  beforeEach(function() {
    booking = new Booking(1, '09/30/2021to08/07/2021', 14);
  })

  it('should be a function', function() {
    assert.isFunction(Booking);
    assert.instanceOf(booking, Booking);
  })

  it('should contain the user id', function() {
    assert.equal()
  })

  it('should have the check in date', function() {

  })

  it('should contain the checkout date', function() {

  })

  it('should contain the room number', function() {

  })

  it('should store all of the sub bookings', function() {

  })

  it('should create an individual booking per night', function() {

  })
})