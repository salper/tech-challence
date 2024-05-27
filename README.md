# CQRS Booking

## About CQRS

CQRS for Command Query Responsibility Segregation Pattern.

A query returns data and does not alter the state of the object. A command changes the state of an object but does not return any data.

We will split our code in read and write code to really live this pattern.

## Booking subject

We want to make a booking solution for one hotel.

The first 2 user stories are :

- As a user I want to see all free rooms.
- As a user I want to book a room.

We kinda want to use the CQRS pattern. To do that we'll expose 2 REST routes:

- `GET /available-rooms?arrivedAt=YYYY-MM-DD&departedAt=YYYY-MM-DD`

Returns all available rooms for the given date range through a `Query` and the read repository (imagine that it's a micro service with it's own storage layer)

- `POST /bookings {arrivedAt: YYYY-MM-DD, customerName: string; departedAt: YYYY-MM-DD; roomName: string}`

Returns an empty 201 response if the booking is accepted, using a `command` and the write repository.

## Specs

The commands `npm run build` and `npm run test` must exit correctly.
