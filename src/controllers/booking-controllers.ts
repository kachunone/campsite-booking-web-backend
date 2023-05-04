import HttpError from "../models/http-error";
import Booking from "../models/booking";
import Campsite, { ICampsite } from "../models/campsite";
import { Request, Response, NextFunction } from "express";
import mongoose, { Schema, Document } from "mongoose";

export default class BookingController {
  static async getBookingsById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.userId;
    try {
      const result = await Booking.find({ customer: userId });
      res.json(result);
    } catch {
      return next(
        new HttpError("something wrong when searching bookings", 422)
      );
    }
  }

  static async createBooking(req: Request, res: Response, next: NextFunction) {
    const { campsiteId, start, end } = req.body;
    const session = await mongoose.startSession();

    try {
      const bookingToBeCreated = {
        campsite: campsiteId,
        customer: req.userId,
        createDate: new Date(),
        start: new Date(start),
        end: new Date(end),
      };

      session.startTransaction();
      const booking = new Booking(bookingToBeCreated);
      const createdBooking = await booking.save({ session });
      const campsite = await Campsite.findById(createdBooking.campsite);
      campsite.bookings.push(createdBooking.id);
      await campsite.save({ session });
      await session.commitTransaction();

      res.status(201).json({ message: "created successfully" });
    } catch (err) {
      console.log(err);
      await session.abortTransaction();
      return next(new HttpError("cannot create a booking!", 422));
    } finally {
      session.endSession();
    }
  }

  static async updateBooking(req: Request, res: Response, next: NextFunction) {
    const { bookingId, start, end } = req.body;
    console.log(bookingId);
    const filter = { _id: bookingId };
    const update = { start: new Date(start), end: new Date(end) };

    try {
      // Note: findOneAndUpdate won't increase __v by default
      const bookingTobeUpdated = await Booking.findOneAndUpdate(filter, update);
      if (bookingTobeUpdated === null) {
        return next(new HttpError("cannot find the booking!", 422));
      }
      res.status(201).json({ message: "updated successfully" });
    } catch (err) {
      return next(new HttpError("cannot update the booking!", 422));
    }
  }

  static async deleteBooking(req: Request, res: Response, next: NextFunction) {
    const bookingId = req.params.bid;

    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const bookingToBeDeleted = await Booking.findOne({
        _id: bookingId,
      }).populate({ path: "campsite", select: "bookings" });
      await bookingToBeDeleted.deleteOne({ session });
      (bookingToBeDeleted.campsite as any).bookings.pull(bookingToBeDeleted);
      await (bookingToBeDeleted.campsite as any).save({ session });

      await session.commitTransaction();

      res.status(201).json({ message: "deleted successfully" });
    } catch (err) {
      await session.abortTransaction();
      console.log(err);
      return next(new HttpError("cannot delete the booking!", 422));
    } finally {
      session.endSession();
    }
  }
}
