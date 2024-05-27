import createApp, { ErrorRequestHandler } from "express";
import bodyParser from "body-parser";
import { NotFoundError } from "./errors/NotFoundError.js";
import { InvalidError } from "./errors/InvalidError.js";

export const app = createApp();

app.get("/available-rooms", async (_req, _res, next) => {
  try {
    throw new Error("Not implemented");
  } catch (err) {
    next(err);
  }
});

app.post("/bookings", bodyParser.json(), async (_req, _res, next) => {
  try {
    throw new Error("Not implemented");
  } catch (err) {
    next(err);
  }
});

app.use(function (err, _req, res, next) {
  if (err instanceof NotFoundError) {
    res.status(404).send(err.message);
    return;
  }

  if (err instanceof InvalidError) {
    res.status(400).send(err.message);
    return;
  }

  next(err);
} as ErrorRequestHandler);
