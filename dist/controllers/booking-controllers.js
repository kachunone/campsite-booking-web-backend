"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_error_1 = __importDefault(require("../models/http-error"));
const booking_1 = __importDefault(require("../models/booking"));
const campsite_1 = __importDefault(require("../models/campsite"));
const mongoose_1 = __importDefault(require("mongoose"));
class BookingController {
    static async getBookingsById(req, res, next) {
        const userId = req.userId;
        try {
            const result = await booking_1.default.find({ customer: userId });
            res.json(result);
        }
        catch {
            return next(new http_error_1.default("something wrong when searching bookings", 422));
        }
    }
    static async createBooking(req, res, next) {
        const { campsiteId, start, end } = req.body;
        const session = await mongoose_1.default.startSession();
        try {
            const bookingToBeCreated = {
                campsite: campsiteId,
                customer: req.userId,
                createDate: new Date(),
                start: new Date(start),
                end: new Date(end),
            };
            session.startTransaction();
            const booking = new booking_1.default(bookingToBeCreated);
            const createdBooking = await booking.save({ session });
            const campsite = await campsite_1.default.findById(createdBooking.campsite);
            campsite.bookings.push(createdBooking.id);
            await campsite.save({ session });
            await session.commitTransaction();
            res.status(201).json({ message: "created successfully" });
        }
        catch (err) {
            console.log(err);
            await session.abortTransaction();
            return next(new http_error_1.default("cannot create a booking!", 422));
        }
        finally {
            session.endSession();
        }
    }
    static async updateBooking(req, res, next) {
        const { bookingId, start, end } = req.body;
        console.log(bookingId);
        const filter = { _id: bookingId };
        const update = { start: new Date(start), end: new Date(end) };
        try {
            // Note: findOneAndUpdate won't increase __v by default
            const bookingTobeUpdated = await booking_1.default.findOneAndUpdate(filter, update);
            if (bookingTobeUpdated === null) {
                return next(new http_error_1.default("cannot find the booking!", 422));
            }
            res.status(201).json({ message: "updated successfully" });
        }
        catch (err) {
            return next(new http_error_1.default("cannot update the booking!", 422));
        }
    }
    static async deleteBooking(req, res, next) {
        const bookingId = req.params.bid;
        const session = await mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const bookingToBeDeleted = await booking_1.default.findOne({
                _id: bookingId,
            }).populate({ path: "campsite", select: "bookings" });
            await bookingToBeDeleted.deleteOne({ session });
            bookingToBeDeleted.campsite.bookings.pull(bookingToBeDeleted);
            await bookingToBeDeleted.campsite.save({ session });
            await session.commitTransaction();
            res.status(201).json({ message: "deleted successfully" });
        }
        catch (err) {
            await session.abortTransaction();
            console.log(err);
            return next(new http_error_1.default("cannot delete the booking!", 422));
        }
        finally {
            session.endSession();
        }
    }
}
exports.default = BookingController;
//# sourceMappingURL=booking-controllers.js.map