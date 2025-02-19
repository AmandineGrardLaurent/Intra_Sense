import type { RequestHandler } from "express";
import Joi from "joi";
import commentRepository from "./commentRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const newComment = {
      content: req.body.content,
      user_id: req.body.user_id,
      decision_id: req.body.id,
    };
    const insertId = await commentRepository.create(newComment);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const readComments: RequestHandler = async (req, res, next) => {
  try {
    const decisionId = Number.parseInt(req.params.id);
    const comments = await commentRepository.readAllComments(decisionId);

    if (comments == null) {
      res.sendStatus(404);
    } else {
      res.json(comments);
    }
  } catch (err) {
    next(err);
  }
};

const validateDataForm: RequestHandler = async (req, res, next) => {
  const dataSchema = Joi.object({
    content: Joi.string().required(),
    user_id: Joi.number().required(),
    id: Joi.string().required(),
  });

  const { error } = dataSchema.validate(req.body, { abortEarly: false });
  if (error == null) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

export default { add, readComments, validateDataForm };
