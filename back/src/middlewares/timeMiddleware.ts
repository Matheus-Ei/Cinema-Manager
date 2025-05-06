import { NextFunction, Request, Response } from "express";

export const timeMiddleware = (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(new Date(Date.now()).toISOString());
    next();
  } catch (error) {
    res.status(500).send({ error });
  }
};
