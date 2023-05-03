import HttpError from "../models/http-error";
import Booking from "../models/booking";
import { Request, Response, NextFunction } from "express";
import { Schema } from "mongoose";

export default class BookingController {
  // create a booking
  static async createBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const { start, end, userId, campsiteId } = req.body;
      const bookingToBeCreated = {
        campsite: campsiteId,
        customer: userId,
        createDate: new Date(),
        start: new Date(start),
        end: new Date(end),
      };

      const booking = new Booking(bookingToBeCreated);
      await booking.save();
      res.status(201).json({ message: "created successfully" });
    } catch (err) {
      return next(new HttpError("cannot create a booking!", 422));
    }
  }
}
