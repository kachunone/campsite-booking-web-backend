import { Schema, model, Document } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import Booking from "./booking";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  bookings: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      // ref: Booking.modelName,
    },
  ],
});

userSchema.plugin(mongooseUniqueValidator);
const User = model<IUser>("User", userSchema);
export default User;
