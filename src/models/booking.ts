// booking.model.ts

import { Document, model, Schema } from "mongoose";

export interface IBooking extends Document {
  createDate: Date;
  customerEmail: String;
  start: Date;
  end: Date;
}

const bookingSchema = new Schema<IBooking>({
  createDate: { type: Date, required: true },
  customerEmail: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

const Booking = model<IBooking>("Booking", bookingSchema);

export default Booking;
