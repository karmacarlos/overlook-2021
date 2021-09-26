/* eslint-disable max-len */
import { assert } from 'chai';

import data from './data-test';

import Hotel from '../src/classes/hotel';

import Room from '../src/classes/room';

describe.only('Hotel class', function() {
  let hotel;
  beforeEach( function() {
    hotel = new Hotel(data.rooms, data.bookings, data.customers, data.roomImgs);
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
    assert.instanceOf(hotel.roomsToDisplay[0], Room);
    assert.equal(hotel.roomsToDisplay[0].image, data.roomImgs[0].imageUrl);
  })

  it('should be able to choose a random customer', function() {
    assert.isObject(hotel.getRandomCustomer(), 'is an object');
  })

  it('should be able to get a list of dates between checkin and checkout date', function() {
    assert.equal(hotel.getDates('2021/09/30', '2021/10/08').length, 8);
  })

  it('should be able to return all available rooms on a series of nights', function() {
    hotel.prepareRooms();
    assert.equal(hotel.getAvailableRooms('2021/09/30', '2021/10/01').length, 9);
    assert.instanceOf(hotel.getAvailableRooms('2021/09/30', '2021/10/08')[0], Room);
    assert.isArray(hotel.getAvailableRooms('2021/09/30', '2021/10/04'));
  })

  it('should give an apology if there\'s no available rooms', function() {
    assert.equal(hotel.getAvailableRooms(), 'We are very sorry, there is not an available room for this dates')
  })

  it('should have a way to obtain a customer details', function() {
    assert.deepEqual(hotel.getCustomerByID(1), data.customers[0]);
    assert.deepEqual(hotel.getCustomerByID(2), data.customers[1]);
  })
})