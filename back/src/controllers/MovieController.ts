import { Request, Response } from "express";
import { MovieService } from "../services/MovieService";
import { Res } from "../utils/response";

export class MovieController {
  static get = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const resource = await MovieService.get(Number(id));
      if (!resource) return Res.sendByType(res, "internalError");

      return Res.sendByType(res, "found", undefined, resource);
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };

  static getAll = async (_: Request, res: Response) => {
    try {
      const resource = await MovieService.getAll();
      if (!resource) return Res.sendByType(res, "internalError");

      return Res.sendByType(res, "found", undefined, resource);
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      const resource = await MovieService.create(req);
      if (!resource) return Res.sendByType(res, "internalError");

      return Res.sendByType(res, "created", undefined, resource);
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    try {
      const resource = await MovieService.update(Number(id), data);
      if (!resource) return Res.sendByType(res, "internalError");

      return Res.sendByType(res, "updated", undefined, resource);
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };

  static destroy = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await MovieService.destroy(Number(id));

      return Res.sendByType(res, "deleted");
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };
}
