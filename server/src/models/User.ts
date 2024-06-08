import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import validator from "validator";
import { isPath } from "../utils/utils";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  gender: "male | female | other";
  profilePhoto: string;
}
interface IUserModel extends Model<IUser> {
  findUserByCredentials(email: string, password: string): Promise<IUser>;
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    select: false,
  },
  birthDate: {
    type: Date,
    required: true,
    validate: {
      validator(value: Date) {
        return (
          value instanceof Date && !isNaN(value.getTime()) && value < new Date()
        );
      },
      message: "The field must contain a valid date in the past.",
    },
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
    validate: {
      validator(value: string) {
        const allowedGenders = ["male", "female", "other"];
        return allowedGenders.includes(value);
      },
      message:
        "The field must contain one of the following values: male, female, other.",
    },
  },
  profilePhoto: {
    type: String,
    required: true,
    validate: {
      validator: isPath,
      message: 'The field must contain a valid path.',
    },
  },
});

userSchema.statics.findUserByCredentials = async function (
  email: string,
  password: string
) {
  const user = await this.findOne({ email }).select("+password");

  if (!user) {
    throw new UnauthorizedError("Incorrect email or password.");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Incorrect email or password.");
  }

  return user;
};

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;
export { IUser };
