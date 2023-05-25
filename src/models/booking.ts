import { Document, model, Schema, PopulatedDoc, ObjectId } from "mongoose";
import User, { IUser } from "./user";
import Campsite, { ICampsite } from "./campsite";

interface IBooking extends Document {
  campsite: Schema.Types.ObjectId;
  createDate: Date;
  customer: Schema.Types.ObjectId;
  start: Date;
  end: Date;
  totalPrice: number;
}

const bookingSchema = new Schema<IBooking>(
  {
    createDate: { type: Date, required: true },
    campsite: {
      type: Schema.Types.ObjectId,
      ref: Campsite.modelName,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: User.modelName,
      required: true,
    },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    totalPrice: { type: Number, require: true },
  },
  { optimisticConcurrency: true }
);

const Booking = model<IBooking>("Booking", bookingSchema);
export default Booking;
