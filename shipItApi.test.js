"use strict";

const fetchMock = require("fetch-mock");


const {
  shipProduct,
  SHIPIT_SHIP_URL
} = require("./shipItApi");


// test("shipProduct", async function () {
//   const shipId = await shipProduct({
//     productId: 1000,
//     name: "Test Tester",
//     addr: "100 Test St",
//     zip: "12345-6789",
//   });

//   expect(shipId).toEqual(expect.any(Number));
// });

test("Mock shipProduct", async function () {
  fetchMock.post(SHIPIT_SHIP_URL, {
    body: {
      "receipt": {
        "shipId": 1108
      }
    },
    status: 201
  });

  const res = await shipProduct(
    {
      "itemId": 1000,
      "name": "Test Tester",
      "addr": "100 Test St",
      "zip": "12345-6789",
      "key": "SUPER-DUPER-SECRET"
    }
  );

  expect(res).toEqual(1108);
});