import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
import path from "path";
import { login, register } from "./controllers/user";
import { auth } from "./middleware/auth";
import { NotFoundError } from "./errors/NotFoundError";
import upload from "./middleware/upload";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', upload.single('profilePhoto'), register);
app.post('/signin', login);
app.use(auth);

app.use("/api/account", userRoutes);
app.use("/api/people", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не существует.'));
});

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.error(error));
