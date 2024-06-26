"use strict";

const shipItApi = require('../shipItApi');

shipItApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    shipItApi.shipProduct.mockReturnValue(1108);

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    // expect(resp.body).toEqual({ shipped: expect.any(Number) });

    expect(resp.body).toEqual({ shipped: 1108 });
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });

  test("throws error if invalid inputs", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send({
        productId: 1000,
        name: true,
        addr: "100 Test St",
        zip: 42098,
      });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance.name is not of a type(s) string",
          "instance.zip is not of a type(s) string"
        ],
        "status": 400
      }

    });
  });




});
