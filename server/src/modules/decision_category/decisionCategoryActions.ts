import type { RequestHandler } from "express";
import decisionCategoryRepository from "./decisionCategoryRepository";

const addDecisionCategory: RequestHandler = async (req, res, next) => {
  try {
    if (req.body.category_id === 0) {
      next();
    } else {
      for (let i = 0; i < req.body.category_id.length; i++) {
        const decisionCategory = {
          decision_id: Number.parseInt(req.body.decision_id),
          category_id: Number.parseInt(req.body.category_id[i]),
        };
        await decisionCategoryRepository.create(decisionCategory);
      }
      next();
    }
  } catch (err) {
    next(err);
  }
};

export default { addDecisionCategory };
