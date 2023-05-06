import { Schema, model, Document } from "mongoose";
import Booking from "./booking";

export interface ICampsite extends Document {
  title: string;
  description: string;
  region: string;
  equipment: string[];
  price: number;
  image: String;
  bookings: Schema.Types.ObjectId[];
}

const campsiteSchema = new Schema<ICampsite>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    region: { type: String, required: true },
    equipment: { type: [String], required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    bookings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { optimisticConcurrency: true }
);

const Campsite = model<ICampsite>("Campsite", campsiteSchema);

export default Campsite;
