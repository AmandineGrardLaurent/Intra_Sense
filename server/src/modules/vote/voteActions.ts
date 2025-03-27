import type { RequestHandler } from "express";
import voteRepository from "./voteRepository";

//BROWSE voteFor From One Decision
const readAllFor: RequestHandler = async (req, res, next) => {
  try {
    const decisionId = Number.parseInt(req.params.id);
    const vote = await voteRepository.readAllFor(decisionId);
    if (vote == null) {
      res.sendStatus(404);
    } else {
      res.json(vote);
    }
  } catch (err) {
    next(err);
  }
};

//BROWSE voteAgainst From One Decision
const readAllAgainst: RequestHandler = async (req, res, next) => {
  try {
    const decisionId = Number.parseInt(req.params.id);
    const vote = await voteRepository.readAllAgainst(decisionId);
    if (vote == null) {
      res.sendStatus(404);
    } else {
      res.json(vote);
    }
  } catch (err) {
    next(err);
  }
};

//READ vote
const read: RequestHandler = async (req, res, next) => {
  try {
    const voteData = {
      decision_id: Number.parseInt(req.params.id),
      user_id: req.body.user_id,
    };
    const vote = await voteRepository.read(voteData);
    if (vote === null) {
      res.sendStatus(404);
    } else {
      res.json(vote);
    }
  } catch (err) {
    next(err);
  }
};

//EDIT vote
const edit: RequestHandler = async (req, res, next) => {
  try {
    const vote = {
      decision_id: Number.parseInt(req.params.id),
      state: req.body.state,
      user_id: req.body.user_id,
    };

    const affectedRows = await voteRepository.update(vote);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

//ADD vote
const add: RequestHandler = async (req, res, next) => {
  try {
    const newVote = {
      state: req.body.state,
      user_id: req.body.user_id,
      decision_id: Number.parseInt(req.params.id),
    };
    const insertId = await voteRepository.create(newVote);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { readAllFor, read, edit, add, readAllAgainst };
