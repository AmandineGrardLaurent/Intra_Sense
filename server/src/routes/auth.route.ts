import express from "express";
import { comparePassword } from "../middlewares/argon2.middleware";
import { getUserByEmail } from "../middlewares/user.middleware";
import { login, logout } from "../modules/auth/authActions";
import userActions from "../modules/user/userActions";

const router = express.Router();

router.post("/api/auth", getUserByEmail, comparePassword, login);
router.post("/logout", logout);

router.get("/api/admin/role", userActions.readRoleFromToken);

export default router;
