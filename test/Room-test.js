import { assert } from 'chai';

import data from './data-test'; 

import Room  from '../src/classes/room';

describe.only('Room class', function() {
  let room1, room2;
  beforeEach(function () {
    room1 = new Room(data.rooms[0]);
    room2 = new Room(data.rooms[1]);
  })

  it('should be a function', function() {
    assert.isFunction(Room);
    assert.instanceOf(room1, Room);
    assert.instanceOf(room2, Room);
  })

  it('should have a number', function() {
    assert.isNumber(room1.number);
    assert.isNumber(room2.number);
    assert.equal(room1.number, 1);
    assert.equal(room2.number, 2);
  })

  it('should be a certain type', function() {
    assert.equal(room1.roomType, "residential suite");
    assert.equal(room2.roomType, "suite");
  })

  it('should indicate if it has a bidet', function() {
    assert.isBoolean(room1.hasBidet);
    assert.isBoolean(room2.hasBidet);
  })

  it('should indicate how many beds contains', function() {
    assert.equal(room1.bedsNumber, 1);
    assert.equal(room2.bedsNumber, 2);
  })

  it('should indicate the cost per night', function() {
    assert.equal(room1.costPerNight, 358.4);
    assert.equal(room2.costPerNight, 477.38);
  })

  it('should have a place to store it\'s own image', function() {
    assert.equal(room1.image, '');
    assert.equal(room2.image, '');
  })

  it('should be able to get the room image', function() {
    room1.getRoomImg(data.roomImgs);
    room2.getRoomImg(data.roomImgs);
    assert.equal(room1.image, data.roomImgs[0].imageUrl);
    assert.equal(room2.image, data.roomImgs[1].imageUrl);
  })
})