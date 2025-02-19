import express from "express";
const router = express.Router();

import { verifyToken } from "./modules/auth/authActions";
import AuthRoute from "./routes/auth.route";
import CategoryRoute from "./routes/category.route";
import CommentRoute from "./routes/comment.route";
import CountryRoute from "./routes/country.route";
import DecisionRoute from "./routes/decision.route";
import RoleRoute from "./routes/role.route";
import UserRoute from "./routes/user.route";
import VoteRoute from "./routes/vote.route";

router.use("/", AuthRoute);
router.use("/", verifyToken);
router.use("/", UserRoute);
router.use("/", CountryRoute);
router.use("/", RoleRoute);
router.use("/", VoteRoute);
router.use("/", CategoryRoute);
router.use("/", DecisionRoute);
router.use("/", CommentRoute);

/* ************************************************************************* */

export default router;
