import express from "express";
import { comparePassword } from "../middlewares/argon2.middleware";
import { getUserByEmail } from "../middlewares/user.middleware";
import { login, logout } from "../modules/auth/authActions";

const router = express.Router();

router.post("/api/auth", getUserByEmail, comparePassword, login);
router.post("/logout", logout);

export default router;
