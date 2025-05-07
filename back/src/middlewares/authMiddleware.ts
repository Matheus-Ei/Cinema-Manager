import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../core/enviroment";
import { Res } from "../utils/response";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ignorePath = ["/users", "/users/auth"];
    if (ignorePath.includes(req.path)) return next();

    const token = req.headers.authorization as string;
    const stringToken = token.split(" ")[1];

    const decoded = jwt.verify(stringToken, ENV.ACCESS_SECRET as string) as {
      id: string;
    };

    if (decoded.id) {
      return next();
    } else {
      return Res.sendByType(res, "forbidden");
    }
  } catch (error) {
    return Res.sendByType(res, "internalError", error);
  }
};
