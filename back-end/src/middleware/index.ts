import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const loginSchema = Joi.object(
  {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  },
);

const readerSchema = Joi.object(
  {
    name: Joi.string().required(),
    address: Joi.string().required(),
    number: Joi.number(),
    zipCode: Joi.string().length(8),
    district: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().length(2),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }
)

const bookSchema = Joi.object(
  {
    isbn: Joi.string().required(),
    title: Joi.string().required(),
    year: Joi.string().length(4).required(),
    pages: Joi.number().required(),
    /* readerId: Joi.number().required(), */
    authors: Joi.array().required(),
  }
)

const updateBookSchema = Joi.object(
  {
    isbn: Joi.string().required(),
    title: Joi.string().required(),
    year: Joi.string().length(4).required(),
    pages: Joi.number().required(),
  }
)

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

export const validateReader = (req: Request, res: Response, next: NextFunction) => {
  const { error } = readerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

export const validateBook = (req: Request, res: Response, next: NextFunction) => {
  const { error } = bookSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  next();
};

export const validateUpdateBook = (req: Request, res: Response, next: NextFunction) => {
  const { isbn, title, year, pages } = req.body;
  const { error } = updateBookSchema.validate({ isbn, title, year, pages });
  if (error) return res.status(400).json({ message: error.message });
  next();
};
