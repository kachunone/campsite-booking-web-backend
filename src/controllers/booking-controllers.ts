import HttpError from "../models/http-error";
import Booking from "../models/booking";
import Campsite from "../models/campsite";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { checkDateOverlap } from "..//utils/helpers";

export default class BookingController {
  static async getBookingsById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userId = req.userId;
    try {
      const result = await Booking.find({ customer: userId }).populate({
        path: "campsite",
        select: { image: true },
      });
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
      //fetch selected campsite and its occupied days
      const campsite = await Campsite.findById(campsiteId).populate({
        path: "bookings",
        select: { start: true, end: true },
      });

      //check if dateRange is overlapped
      //set campsite.bookings to any after populated
      const dateRangeOccupied = checkDateOverlap(
        { start: new Date(start), end: new Date(end) },
        campsite.bookings as any
      );

      if (dateRangeOccupied) {
        return next(new HttpError("DateRange occupied!", 422));
      }

      //create new booking object
      const bookingToBeCreated = {
        campsite: campsiteId,
        customer: req.userId,
        createDate: new Date(),
        start: new Date(start),
        end: new Date(end),
      };

      //create booking to database
      session.startTransaction();
      const booking = new Booking(bookingToBeCreated);
      const createdBooking = await booking.save({ session });
      campsite.bookings.push(createdBooking.id);
      await campsite.save({ session });
      await session.commitTransaction();

      res.status(201).json({ message: "created successfully" });
    } catch (err) {
      await session.abortTransaction();
      console.log(err);
      return next(new HttpError("cannot create a booking!", 422));
    } finally {
      session.endSession();
    }
  }

  static async deleteBooking(req: Request, res: Response, next: NextFunction) {
    const bookingId = req.params.bid;

    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const bookingToBeDeleted = await Booking.findOne({
        _id: bookingId,
      }).populate({ path: "campsite", select: { bookings: true, __v: true } });
      await bookingToBeDeleted.deleteOne({ session });

      //bookings cannot be detected after populated so set campsite to any type
      (bookingToBeDeleted.campsite as any).bookings.pull(bookingToBeDeleted);

      await (bookingToBeDeleted.campsite as any).save({ session });
      await session.commitTransaction();

      res.status(201).json({ message: "deleted successfully" });
    } catch (err) {
      console.log(err);
      await session.abortTransaction();
      return next(new HttpError("cannot delete the booking!", 422));
    } finally {
      session.endSession();
    }
  }
}
