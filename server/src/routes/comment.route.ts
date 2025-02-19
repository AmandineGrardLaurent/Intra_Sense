import express from "express";
import commentActions from "../modules/comment/commentActions";
import userActions from "../modules/user/userActions";

const router = express.Router();

router.post(
  "/api/comment",
  userActions.addUserByTokenEmailForComment,
  commentActions.validateDataForm,
  commentActions.add,
);

router.get("/api/decision/comment/:id", commentActions.readComments);

export default router;
