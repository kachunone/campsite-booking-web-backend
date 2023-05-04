import express, { Request, Response, NextFunction } from "express";
import BookingController from "../controllers/booking-controllers";

const router = express.Router();

router.post("/", BookingController.createBooking);

router.get("/", BookingController.getBookingsById);

router.put("/", BookingController.updateBooking);

router.delete("/:bid", BookingController.deleteBooking);

export default router;
