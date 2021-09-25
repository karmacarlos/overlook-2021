/* eslint-disable max-len */

const data = {
  customers: [
    {
      "id": 1,
      "name": "Leatha Ullrich"
    },
    {
      "id": 2,
      "name": "Rocio Schuster"
    },
    {
      "id": 3,
      "name": "Kelvin Schiller"
    },
    {
      "id": 4,
      "name": "Kennedi Emard"
    },
    {
      "id": 5,
      "name": "Rhiannon Little"
    },
    {
      "id": 6,
      "name": "Fleta Schuppe"
    },
    {
      "id": 7,
      "name": "Dell Rath"
    },
    {
      "id": 8,
      "name": "Era Hand"
    },
    {
      "id": 9,
      "name": "Faustino Quitzon"
    },
    {
      "id": 10,
      "name": "Tony Armstrong"
    }
  ],

  rooms: [
    {
      "number": 1,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
    },
    {
      "number": 2,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 2,
      "costPerNight": 477.38
    },
    {
      "number": 3,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "king",
      "numBeds": 1,
      "costPerNight": 491.14
    },
    {
      "number": 4,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 429.44
    },
    {
      "number": 5,
      "roomType": "single room",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 340.17
    },
    {
      "number": 6,
      "roomType": "junior suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 397.02
    },
    {
      "number": 7,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 231.46
    },
    {
      "number": 8,
      "roomType": "junior suite",
      "bidet": false,
      "bedSize": "king",
      "numBeds": 1,
      "costPerNight": 261.26
    },
    {
      "number": 9,
      "roomType": "single room",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 200.39
    },
    {
      "number": 10,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "twin",
      "numBeds": 1,
      "costPerNight": 497.64
    }
  ],

  bookings: [
    {
      "id": "5fwrgu4i7k55hl6sz",
      "userID": 9,
      "date": "2021/09/30",
      "roomNumber": 1,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6t5",
      "userID": 43,
      "date": "2021/10/2",
      "roomNumber": 2,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 13,
      "date": "2021/10/3",
      "roomNumber": 3,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6t7",
      "userID": 20,
      "date": "2020/02/16",
      "roomNumber": 4,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6t8",
      "userID": 1,
      "date": "2020/02/05",
      "roomNumber": 5,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6t9",
      "userID": 38,
      "date": "2020/02/14",
      "roomNumber": 6,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6ta",
      "userID": 1,
      "date": "2020/01/11",
      "roomNumber": 7,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6tb",
      "userID": 49,
      "date": "2020/02/06",
      "roomNumber": 8,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6tc",
      "userID": 22,
      "date": "2020/01/30",
      "roomNumber": 9,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6td",
      "userID": 27,
      "date": "2020/01/31",
      "roomNumber": 1,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6te",
      "userID": 1,
      "date": "2020/01/19",
      "roomNumber": 3,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6tf",
      "userID": 36,
      "date": "2020/01/25",
      "roomNumber": 5,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6tg",
      "userID": 2,
      "date": "2020/02/03",
      "roomNumber": 2,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6th",
      "userID": 2,
      "date": "2020/02/26",
      "roomNumber": 8,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6ti",
      "userID": 6,
      "date": "2020/01/22",
      "roomNumber": 1,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6tj",
      "userID": 21,
      "date": "2020/01/17",
      "roomNumber": 7,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6tk",
      "userID": 2,
      "date": "2020/01/27",
      "roomNumber": 4,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6tl",
      "userID": 2,
      "date": "2020/01/10",
      "roomNumber": 8,
      "roomServiceCharges": []
    }
  ],
  roomImgs: [
    {
      roomType: 'residential suite',
      imageUrl: '../src/images/residential-suite.png'
    },
    {
      roomType: 'suite',
      imageUrl: '../src/images/suite.png'
    },
    {
      roomType: 'single room',
      imageUrl: '../src/images/single-room.png'
    },
    {
      roomType: 'junior suite',
      imageUrl: '../src/images/junior-suite.png'
    }
  ]
}

export default data;

