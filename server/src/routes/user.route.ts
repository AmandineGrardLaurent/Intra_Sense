import express from "express";
import {
  hashModifiedPassword,
  hashPassword,
} from "../middlewares/argon2.middleware";
import userActions from "../modules/user/userActions";
import userDecisionActions from "../modules/user_decision/userDecisionActions";

const router = express.Router();

router.get("/api/user", userActions.browse);
router.get("/api/user/:id", userActions.read);

router.post(
  "/api/user",
  userActions.validateData,
  hashPassword,
  userActions.checkEmail,
  userActions.add,
);

router.put(
  "/api/user/:id",
  userActions.modifiedData,
  hashModifiedPassword,
  userActions.edit,
);

router.delete("/api/user/:id", userActions.destroy);

// affichage des animateurs, impactés, experts d'une décision

router.get("/api/user/animator/:id", userDecisionActions.browseAnimators);
router.get("/api/user/expert/:id", userDecisionActions.browseExperts);
router.get("/api/user/impacted/:id", userDecisionActions.browseImpacted);

// admin

router.get("/api/applicant", userActions.browseApplicant);
router.put("/api/applicant/:id", userActions.editApplicant);
router.delete("/api/applicant/:id", userActions.destroy);
router.get("/api/accepted", userActions.browseAccepted);

export default router;
