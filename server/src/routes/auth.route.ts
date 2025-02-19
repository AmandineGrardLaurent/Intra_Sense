import express from "express";
import {
  comparePassword,
  hashPassword,
} from "../middlewares/argon2.middleware";
import { getUserByEmail } from "../middlewares/user.middleware";
import { login } from "../modules/auth/authActions";
import userActions from "../modules/user/userActions";

const router = express.Router();

router.post("/api/auth", getUserByEmail, comparePassword, login);

router.post(
  "/api/user",
  userActions.validateData,
  hashPassword,
  userActions.checkEmail,
  userActions.add,
);

export default router;
