import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { DuplicateEmailError, NotFoundError } from "../errors/index";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, birthDate, gender } = req.body;
  const profilePhoto = req.file ? `uploads/${req.file.filename}` : null; 
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new DuplicateEmailError(
        "A user with this email already exists."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
      birthDate,
      gender,
      profilePhoto,
    });

    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: newUser, token });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findUserByCredentials(email, password);

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    next(error);
  }
};

export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, password } = req.body;
  const profilePhoto = req.file ? `uploads/${req.file.filename}` : null;

  try {
    const user = await User.findById(id);

    if (!user) {
      throw new NotFoundError("The user was not found.");
    }

    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 12);
    if (profilePhoto) {
        user.profilePhoto = profilePhoto;
    }

    await user.save();

    res.status(200).json({ message: "The profile has been successfully updated" });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({}, "profilePhoto name birthDate");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const checkToken = (req: Request, res: Response) => {
  res.status(200).json({ message: "Token is valid" });
};

