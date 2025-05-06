import { NextFunction, Request, Response } from "express";

export const roleMiddleware = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      return next();
    } catch (error) {
      res.status(500).send({ error });
    }
  };
};
