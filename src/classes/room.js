class Room {
  constructor(roomDetails) {
    this.number = roomDetails.number;
    this.roomType = roomDetails.roomType;
    this.hasBidet = roomDetails.bidet;
    this.bedsNumber = roomDetails.numBeds;
    this.bedSize = roomDetails.bedSize;
    this.costPerNight = roomDetails.costPerNight;
    this.image = '';
  }

  getRoomImg(imgs) {
    this.image = imgs.find(img => img.roomType === this.roomType).imageUrl;
    return this.image;
  }
}

export default Room;