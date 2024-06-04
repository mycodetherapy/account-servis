import express from "express";
import { register, login, editUser, getUsers } from "../controllers/user";
import upload from "../middleware/upload";

const router = express.Router();

router.post("/register", upload.single("profilePhoto"), register);
router.post("/login", login);
router.patch("/:id", upload.single("profilePhoto"), editUser);
router.get("/", getUsers);

export default router;
