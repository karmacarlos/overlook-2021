import { assert } from 'chai';

import { data } from './data-test'; 

import { Room } from '../src/classes/room';

describe('Room class', function() {
  let room1, room2;
  beforeEach(function () {
    room1 = new Room(data.rooms[0], data.roomImgs);
    room2 = new Room(data.rooms[1], data.roomImgs);
  })

  it('should be a function', function() {
    assert.isFunction(Room);
    assert.instanceOf(room1, Room);
    assert.instanceOf(room2, Room);
  })

  it('should have a number', function() {
    assert.isNumber(room1.number);
    assert.isNumber(room2.number);
    assert.equal(room1.number, data.rooms[0].number);
    assert.equal(room2.number, data.rooms[2].number);
  })

  it('should be a certain type', function() {
    assert.equal(room1.roomType, data.rooms[0].roomType);
    assert.equal(room1.roomType, data.rooms[1].roomType);
  })

  it('should indicate if it has a bidet', function() {
    assert.isBoolean(room1.hasBidet);
    assert.isBoolean(room2.hasBidet);
  })

  it('should indicate how many beds contains', function() {
    assert.equal(room1.bedsNumber, data.rooms[0].numBeds);
    assert.equal(room2.bedsNumber, data.rooms[1].numBeds);
  })

  it('should indicate the cost per night', function() {
    assert.equal(room1.costPerNight, data.rooms[0].costPerNight);
    assert.equal(room2.costPerNight, data.rooms[1].costPerNight);
  })

  it('should contain an image of the room', function() {
    assert.include(room1.image, 'https');
    assert.include(room2.image, 'https');
  })
})