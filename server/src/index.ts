import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
import path from "path";
import { checkToken, login, register } from "./controllers/user";
import { auth } from "./middleware/auth";
import { NotFoundError } from "./errors/NotFoundError";
import upload from "./middleware/upload";
import { errorHandler } from "./middleware/error-handler";
import cors from 'cors';
import { logger } from "./middleware/logger";
import { validateRegisterBody } from "./validation/validateRegisterBody";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.error(error));

//app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', upload.single('profilePhoto'), register);
app.post('/signin', login);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(auth);
app.get("/api/checkToken", checkToken);
app.use("/api/account", userRoutes);
app.use("/api/account/:id", userRoutes);
app.use("/api/people", upload.single('profilePhoto'), userRoutes);


app.use((req, res, next) => {
  next(new NotFoundError('The route does not exist.'));
});

app.use(errorHandler);


