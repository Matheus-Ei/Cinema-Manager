// Libraries
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request } from "express";

dotenv.config();

export class Token {
  public static generate(payload: Object, expiresIn: number, key: any) {
    const token = jwt.sign(payload, key as string, { expiresIn });
    return token;
  }

  public static verify(token: string, key: any) {
    try {
      return jwt.verify(token, key as string) as any;
    } catch {
      throw new Error("The token is invalid");
    }
  }

  public static decode(token: string) {
    try {
      return jwt.decode(token);
    } catch {
      return null;
    }
  }

  public static getId(req: Request) {
    const decode = this.decode(
      String(String(req.headers.authorization).split(" ")[1]),
    ) as { id: string };

    return decode.id;
  }
}
