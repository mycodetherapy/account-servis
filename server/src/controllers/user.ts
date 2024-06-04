import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { readAndConvertFileToBuffer } from "../utils/utils";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, birthDate, gender } = req.body;
  const profilePhoto = req.file?.path;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким email уже существует" });
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

    res.status(201).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findUserByCredentials(email, password);

    if (!existingUser) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Неверный пароль" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const editUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password } = req.body;
  const profilePhoto = req.file?.path;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 12);
    if (profilePhoto) {
      try {
        const profilePhotoBuffer = await readAndConvertFileToBuffer(
          profilePhoto
        );
        user.profilePhoto = profilePhotoBuffer;
      } catch (error) {
        console.error(`Ошибка при обработке файла: ${""}`);
      }
    }

    await user.save();

    res.status(200).json({ message: "Профиль успешно обновлен" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, "profilePhoto name birthDate");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
