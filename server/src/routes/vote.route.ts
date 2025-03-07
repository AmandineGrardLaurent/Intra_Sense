import express from "express";
import userActions from "../modules/user/userActions";
import voteActions from "../modules/vote/voteActions";

const router = express.Router();

router.get("/api/decision/votefor/:id", voteActions.readAllFor);
router.get("/api/decision/voteagainst/:id", voteActions.readAllAgainst);
router.get(
  "/api/decision/vote/:id",
  userActions.addUserByTokenEmail,
  voteActions.read,
);

router.put(
  "/api/decision/vote/:id",
  userActions.addUserByTokenEmail,
  voteActions.edit,
);
router.post(
  "/api/decision/vote/:id",
  userActions.addUserByTokenEmail,
  voteActions.add,
);

export default router;
