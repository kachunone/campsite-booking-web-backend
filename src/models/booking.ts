import { Document, model, Schema } from "mongoose";
import User from "./user";
import Campsite from "./campsite";

export interface IBooking extends Document {
  campsite: Schema.Types.ObjectId;
  createDate: Date;
  start: Date;
  end: Date;
  customer: Schema.Types.ObjectId;
}

const bookingSchema = new Schema<IBooking>({
  campsite: {
    type: Schema.Types.ObjectId,
    ref: Campsite.modelName,
    required: true,
  },
  createDate: { type: Date, required: true },
  customer: {
    type: Schema.Types.ObjectId,
    ref: User.modelName,
    required: true,
  },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

const Booking = model<IBooking>("Booking", bookingSchema);
export default Booking;
