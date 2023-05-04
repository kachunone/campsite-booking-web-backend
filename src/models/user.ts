import { Schema, model, Document } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(mongooseUniqueValidator);
const User = model<IUser>("User", userSchema);
export default User;
