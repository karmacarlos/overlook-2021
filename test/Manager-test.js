/* eslint-disable max-len */
import { assert } from 'chai';

import { data } from './data-test'; 

import { Manager } from '../src/classes/manager';

import { Hotel } from '../src/classes/hotel'

describe('Manager class', function() {
  let manager;
  beforeEach(function() {
    manager = new Manager(data.rooms, data.bookings, data.customers, data.roomImgs);
  })

  it('should extend from the hotel class', function() {
    assert.instanceOf(Manager.prototype, Hotel);
  })

  it('should have an username', function() {
    assert.equal(manager.userName, 'manager');
  })

  it('should have a password', function() {
    assert.equal(manager.password, 'overlook2021');
  })

  it('should be able to get the revenue for the day', function() {
    assert.isNumber(manager.getTodaysRevenue());
  })

  it('should be able to know the percentage of occupied rooms', function() {
    assert.isNumber(manager.getPercentageOfOccupiedRoomsToday())
  })

  it('should be able to see how many rooms are available today', function() {
    assert.isNumber(manager.getAvailableRoomsToday())
  })

  it('should be able to access a customer bookings', function() {
    assert.isArray(manager.getCustomerBookings());
  })

  it('should be able to delete a customer booking', function() {
    assert.equal(manager.deleteCustomerBooking().length, manager.getCustomerBookings().length - 1)
  })
})