import type { RequestHandler } from "express";
import categoryRepository from "./categoryRepository";

const categoryExist: RequestHandler = async (req, res, next) => {
  try {
    const newCategory = { label: req.body.label, color: req.body.color };
    const categoryExist = await categoryRepository.CategoryExist(
      newCategory.label,
    );

    if (categoryExist) {
      res.status(400).json({ message: "Cette catégorie existe déjà" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const newCategory = {
      label: req.body.label,
      color: req.body.color,
    };
    const insertId = await categoryRepository.create(newCategory);

    res.status(201).json({ id: insertId });
  } catch (err) {
    next(err);
  }
};

const browse: RequestHandler = async (req, res, next) => {
  try {
    const category = await categoryRepository.readAll();
    res.json(category);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const CategoryId = Number.parseInt(req.params.id);
    const category = await categoryRepository.read(CategoryId);
    if (category == null) {
      res.sendStatus(404);
    } else {
      res.json(category);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const category = {
      id: Number.parseInt(req.params.id),
      label: req.body.label,
      color: req.body.color,
    };
    const affectedRows = await categoryRepository.update(category);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = Number.parseInt(req.params.id);
    await categoryRepository.delete(categoryId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
  edit,
  add,
  categoryExist,
  destroy,
};
