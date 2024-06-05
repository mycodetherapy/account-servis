import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { UnauthorizedError } from "../errors/UnauthorizedError";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  gender: string;
  profilePhoto: Buffer;
}

interface IUserModel extends Model<IUser> {
  findUserByCredentials(email: string, password: string): Promise<IUser>;
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  birthDate: { type: Date, required: true },
  gender: { type: String, required: true },
  profilePhoto: { type: Buffer, required: true },
});

userSchema.statics.findUserByCredentials = async function (
  email: string,
  password: string
) {
  const user = await this.findOne({ email }).select("+password");

  if (!user) {
    throw new UnauthorizedError("Неправильный email или пароль");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Неправильный email или пароль");
  }

  return user;
};

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;
export { IUser };
