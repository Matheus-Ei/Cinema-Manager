import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../core/enviroment";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization as string;
    const stringToken = token.split(" ")[1];

    const decoded = jwt.verify(stringToken, ENV.ACCESS_SECRET as string) as {
      id: string;
    };

    if (decoded.id) {
      return next();
    } else {
      res.status(403);
      return;
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};
