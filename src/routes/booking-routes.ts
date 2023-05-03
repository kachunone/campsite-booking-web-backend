import express, { Request, Response, NextFunction } from "express";
import BookingController from "../controllers/booking-controllers";

const router = express.Router();

router.post("/", BookingController.createBooking);

export default router;
