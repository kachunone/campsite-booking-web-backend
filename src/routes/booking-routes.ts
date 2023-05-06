import express, { Request, Response, NextFunction } from "express";
import BookingController from "../controllers/booking-controllers";

const router = express.Router();

router.get("/", BookingController.getBookingsById);

router.post("/", BookingController.createBooking);

router.delete("/:bid", BookingController.deleteBooking);

export default router;
