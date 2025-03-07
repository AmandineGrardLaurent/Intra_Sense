import type { RequestHandler } from "express";
import Joi from "joi";
import decisionRepository from "./decisionRepository";

const browseAllDecisions: RequestHandler = async (req, res, next) => {
  try {
    const decision = await decisionRepository.readAllDecisions();
    res.json(decision);
  } catch (err) {
    next(err);
  }
};

const browseArchivedDecisions: RequestHandler = async (req, res, next) => {
  try {
    const decision = await decisionRepository.readArchivedDecisions();
    res.json(decision);
  } catch (err) {
    next(err);
  }
};

const browseMyDecisions: RequestHandler = async (req, res, next) => {
  try {
    const user_id = req.body.user_id;
    const decision = await decisionRepository.readMyDecisions(user_id);
    res.json(decision);
  } catch (err) {
    next(err);
  }
};

const browseParticipatingDecisions: RequestHandler = async (req, res, next) => {
  try {
    const user_id = req.body.user_id;
    const decision =
      await decisionRepository.readParticipatingDecisions(user_id);
    res.json(decision);
  } catch (err) {
    next(err);
  }
};

const browseRunningDecisions: RequestHandler = async (req, res, next) => {
  try {
    const decision = await decisionRepository.readRunningDecisions();
    res.json(decision);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const decisionId = Number.parseInt(req.params.id);
    const decision = await decisionRepository.read(decisionId);

    if (decision == null) {
      res.sendStatus(404);
    } else {
      res.json(decision);
    }
  } catch (err) {
    next(err);
  }
};

// Crée une décision et récupère l'id
const addDecision: RequestHandler = async (req, res, next) => {
  try {
    const newDecision = {
      title: req.body.title,
      description: req.body.description,
      max_date: req.body.max_date,
      min_date: req.body.min_date,
      context: req.body.context,
      profit: req.body.profit,
      risk: req.body.risk,
      country_id: Number.parseInt(req.body.country_id),
      user_id: req.body.user_id,
    };
    const insertId = await decisionRepository.create(newDecision);
    req.body.decision_id = insertId;
    next();
  } catch (err) {
    next(err);
  }
};

const validateDataDecisionForm: RequestHandler = async (req, res, next) => {
  const dataSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    max_date: Joi.required(),
    min_date: Joi.required(),
    context: Joi.string().required(),
    profit: Joi.string().required(),
    risk: Joi.string().required(),
    country_id: Joi.number().required(),
    user_id: Joi.number().required(),
    category_id: Joi.array().items(Joi.number().required()),
    user_animator_id: Joi.array().items(Joi.number().required()),
    user_expert_id: Joi.array().items(Joi.number().required()),
    user_impacted_id: Joi.array().items(Joi.number().required()),
  });

  const { error } = dataSchema.validate(req.body, { abortEarly: false });
  if (error == null) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

export default {
  read,
  addDecision,
  validateDataDecisionForm,
  browseAllDecisions,
  browseArchivedDecisions,
  browseMyDecisions,
  browseParticipatingDecisions,
  browseRunningDecisions,
};
