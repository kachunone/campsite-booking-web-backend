import { Schema, model, Document, Types } from "mongoose";
import Booking, { IBooking } from "./booking";

interface ICampsite extends Document {
  title: string;
  description: string;
  region: string;
  equipment: string[];
  price: number;
  bookings: Types.DocumentArray<IBooking>;
}

const campsiteSchema = new Schema<ICampsite>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  region: { type: String, required: true },
  equipment: { type: [String], required: true },
  price: { type: Number, required: true },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: Booking.modelName,
    },
  ],
});

export default model<ICampsite>("Campsite", campsiteSchema);
