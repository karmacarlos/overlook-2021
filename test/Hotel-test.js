/* eslint-disable max-len */
import { assert } from 'chai';

import data from './data-test';

import Hotel from '../src/classes/hotel';

import Room from '../src/classes/room';

describe('Hotel class', function() {
  let hotel;
  beforeEach( function() {
    hotel = new Hotel(data.rooms, data.bookings, data.customers, data.roomImgs)
  })
  it('should be a function', function() {
    assert.isFunction(Hotel);
    assert.instanceOf(hotel, Hotel);
  })

  it('should have a rooms property that stores all the rooms in the hotel', function() {
    assert.deepEqual(hotel.rooms, data.rooms);
  })

  it('should have a booking property that stores all the bookings', function () {
    assert.deepEqual(hotel.bookings, data.bookings);
  })

  it('should have a customers property that stores all the customers of the hotel', function() {
    assert.deepEqual(hotel.customers, data.customers);
  })

  it('should contain pictures from the rooms', function() {
    assert.deepEqual(hotel.roomImgs, data.roomImgs);
  })

  it('should have a property to store the rooms to display', function() {
    assert.deepEqual(hotel.roomsToDisplay, []);
  })

  it('should be able to prepare the rooms to be displayed', function() {
    hotel.prepareRooms();
    assert.equal(hotel.roomsToDisplay.length, data.rooms.length);
    assert.include(hotel.roomsToDisplay[0].image, 'https');
  })

  it('should be able to choose a random customer', function() {
    assert.isObject(hotel.getRandomCustomer(), 'is an object');
  })

  it('should be able to return all available rooms', function() {
    assert.instanceOf(hotel.getAvailableRooms()[0], Room);
    assert.isArray(hotel.getAvailableRooms());
  })

  it('should give an apology if there\'s no available rooms', function() {
    //Write some code to not have available rooms.
    assert.equal(hotel.hotel.getAvailableRooms(), 'We are very sorry, there is not an available room for this dates')
  })
})