import { Request, Response } from "express";
import { PlacePatternService } from "../services/PlacePatternService";
import { Res } from "../utils/response";

export class PlacePatternController {
  static get = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const resource = await PlacePatternService.get(Number(id));
      if (!resource) return Res.sendByType(res, "internalError");

      return Res.sendByType(res, "found", undefined, resource);
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };

  static getAll = async (_: Request, res: Response) => {
    try {
      const resource = await PlacePatternService.getAll();
      if (!resource) return Res.sendByType(res, "internalError");

      return Res.sendByType(res, "found", undefined, resource);
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };

  static create = async (_: Request, res: Response) => {
    try {
      const resource = await PlacePatternService.create();
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
      const resource = await PlacePatternService.update(Number(id), data);
      if (!resource) return Res.sendByType(res, "internalError");

      return Res.sendByType(res, "updated", undefined, resource);
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };

  static destroy = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await PlacePatternService.destroy(Number(id));

      return Res.sendByType(res, "deleted");
    } catch (error) {
      return Res.sendByType(res, "internalError", error);
    }
  };
}
