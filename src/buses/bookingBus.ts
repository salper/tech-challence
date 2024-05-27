import { EventEmitter } from "node:events";

export const BOOKING_ADDED = "BOOKING_ADDED";

export const bookingBus = new EventEmitter();
