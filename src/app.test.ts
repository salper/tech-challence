import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "./app.js";

describe("Booking app", () => {
  it("works correctly", async () => {
    await request(app).get("/available-rooms").expect(400);

    await request(app)
      .get("/available-rooms?arrivedAt=foo&departedAt=bar")
      .expect(400);

    await request(app)
      .get("/available-rooms?arrivedAt=2021-01-20&departedAt=2021-01-10")
      .expect(400);

    await request(app)
      .get("/available-rooms?arrivedAt=2021-01-10&departedAt=2021-01-20")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toMatchObject([
          { name: "Room 1" },
          { name: "Room 2" },
          { name: "Room 3" },
          { name: "Room 4" },
          { name: "Room 5" },
          { name: "Room 6" },
          { name: "Room 7" },
          { name: "Room 8" },
          { name: "Room 9" },
          { name: "Room 10" },
        ]);
      });

    await request(app)
      .post("/bookings")
      .send({
        arrivedAt: "2021-01-20",
        departedAt: "2021-01-10",
        customerName: "John Doe",
        roomName: "Room 2",
      })
      .expect(400);

    await request(app)
      .post("/bookings")
      .send({
        arrivedAt: "2021-01-10",
        departedAt: "2021-01-20",
        customerName: "John Doe",
        roomName: "Room 12",
      })
      .expect(404);

    await request(app)
      .post("/bookings")
      .send({
        arrivedAt: "2021-01-10",
        departedAt: "2021-01-20",
        customerName: "John Doe",
        roomName: "Room 2",
      })
      .expect(201);

    await request(app)
      .post("/bookings")
      .send({
        arrivedAt: "2021-01-05",
        departedAt: "2021-01-15",
        customerName: "John Doe",
        roomName: "Room 2",
      })
      .expect(400);

    await request(app)
      .post("/bookings")
      .send({
        arrivedAt: "2021-01-05",
        departedAt: "2021-01-15",
        customerName: "John Doe",
        roomName: "Room 4",
      })
      .expect(201);

    await request(app)
      .post("/bookings")
      .send({
        arrivedAt: "2021-01-15",
        departedAt: "2021-01-25",
        customerName: "John Doe",
        roomName: "Room 2",
      })
      .expect(400);

    await request(app)
      .post("/bookings")
      .send({
        arrivedAt: "2021-01-15",
        departedAt: "2021-01-25",
        customerName: "John Doe",
        roomName: "Room 6",
      })
      .expect(201);

    await request(app)
      .get("/available-rooms?arrivedAt=2021-01-10&departedAt=2021-01-20")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toMatchObject([
          { name: "Room 1" },
          { name: "Room 3" },
          { name: "Room 5" },
          { name: "Room 7" },
          { name: "Room 8" },
          { name: "Room 9" },
          { name: "Room 10" },
        ]);
      });
  });
});
