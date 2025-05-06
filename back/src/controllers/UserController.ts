import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { Res } from "../utils/response";
import { Token } from "../utils/token";

export class UserController {
  static get = async (req: Request, res: Response) => {
    const id = Token.getId(req);

    try {
      const resource = await UserService.get(Number(id));
      if (!resource) return Res.sendByType(res, "internalError");

      return Res.sendByType(res, "found", undefined, resource);
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };

  static recover = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      await UserService.recover(email);

      return Res.sendByType(res, "success");
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };

  static changePassword = async (req: Request, res: Response) => {
    const { code, newPassword, email } = req.body;

    try {
      await UserService.changePassword(code, newPassword, email);

      return Res.sendByType(res, "success");
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };

  static getAll = async (_: Request, res: Response) => {
    try {
      const resource = await UserService.getAll();
      if (!resource) return Res.sendByType(res, "internalError");

      return Res.sendByType(res, "found", undefined, resource);
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };

  static getSessions = async (req: Request, res: Response) => {
    const id = Token.getId(req);

    try {
      const resource = await UserService.getSessions(Number(id));
      if (!resource) return Res.sendByType(res, "internalError");

      return Res.sendByType(res, "found", undefined, resource);
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const resource = await UserService.login(email, password);
      if (!resource) return Res.sendByType(res, "badRequest");

      return Res.sendByType(res, "success", undefined, resource);
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };

  static create = async (req: Request, res: Response) => {
    const data = req.body;

    try {
      const resource = await UserService.create(data);
      if (!resource) return Res.sendByType(res, "internalError");

      return Res.sendByType(res, "created", undefined, resource);
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };

  static update = async (req: Request, res: Response) => {
    const id = Token.getId(req);
    const data = req.body;

    try {
      const resource = await UserService.update(Number(id), data);
      if (!resource) return Res.sendByType(res, "internalError");

      return Res.sendByType(res, "updated", undefined, resource);
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };

  static destroy = async (req: Request, res: Response) => {
    try {
      const id = Token.getId(req);

      await UserService.destroy(Number(id));

      return Res.sendByType(res, "deleted");
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };
}
