import express from "express";
import decisionActions from "../modules/decision/decisionActions";
import decisionCategoryActions from "../modules/decision_category/decisionCategoryActions";
import userActions from "../modules/user/userActions";
import userDecisionActions from "../modules/user_decision/userDecisionActions";

const router = express.Router();

router.get("/api/decision/:id", decisionActions.read);
router.post(
  "/api/decisionform",
  userActions.addUserByTokenEmail,
  decisionActions.validateDataDecisionForm,
  decisionActions.addDecision,
  decisionCategoryActions.addDecisionCategory,
  userDecisionActions.addUserDecisionAnimator,
  userDecisionActions.addUserDecisionExpert,
  userDecisionActions.addUserDecisionImpacted,
);

//Routes pour l'affichage des décisions
router.get("/api/alldecisions", decisionActions.browseAllDecisions);
router.get("/api/archiveddecisions", decisionActions.browseArchivedDecisions);
router.get(
  "/api/mydecisions",
  userActions.addUserByTokenEmail,
  decisionActions.browseMyDecisions,
);
router.get(
  "/api/participatingdecisions",
  userActions.addUserByTokenEmail,
  decisionActions.browseParticipatingDecisions,
);
router.get("/api/runningdecisions", decisionActions.browseRunningDecisions);

export default router;
