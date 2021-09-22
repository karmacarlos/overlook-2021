/* eslint-disable max-len */
import { assert } from 'chai';

import { data } from './data-test'; 

import { Customer } from '../src/classes/customer';

describe('Customer class', function() {
  let customer1, customer2;
  beforeEach(function() {
    customer1 = new Customer(data.customers[0]);
    customer2 = new Customer(data.customers[1]);
  })

  it('should be a function', function() {
    assert.isFunction(Customer);
    assert.instanceOf(customer1, Customer);
    assert.instanceOf(customer2, Customer);
  })

  it('should have an id property', function() {
    assert.equal(customer1.id, data.customers[0].id);
    assert.equal(customer2.id, data.customers[2].id);
  })

  it('should have a name property', function() {
    assert.equal(customer1.name, data.customers[0].name);
    assert.equal(customer2.name, data.customers[2].name);
  })

  it('should have an username', function() {
    assert.equal(customer1.userName, 'customer1');
    assert.equal(customer2.userName, 'customer2');
  })
  
  it('should have a password', function() {
    assert.equal(customer1.password, 'overlook2021');
    assert.equal(customer2.password, 'overlook2021');
  })

  it('should have a way to store all it\'s bookings', function() {
    assert.deepEqual(customer1.bookings, []);
    assert.deepEqual(customer2.bookings, []);
  })

  it('should be able to get all the customer bookings', function() {
    assert.isArray(customer1.getBookings());
    assert.isArray(customer1.getBookings());
    assert.deepEqual(customer1.getBookings(), customer1.bookings);
    assert.deepEqual(customer2.getBookings(), customer2.bookings);
  })

  it('should be able to calculate how much has been spent on bookings', function() {
    assert.isNumber(customer1.getSpentAmount());
  })
})