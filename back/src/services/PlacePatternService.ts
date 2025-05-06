import { PlacePattern } from "../entities/PlacePattern";
import PlacePatternsModel from "../models/PlacesPatternModel";

export class PlacePatternService {
  static get = async (id: number) => {
    return await PlacePatternsModel.findOne({ where: { id } });
  };

  static getAll = async () => {
    return await PlacePatternsModel.findAll();
  };

  static create = async () => {
    return await PlacePatternsModel.create();
  };

  static update = async (id: number, data: Partial<PlacePattern>) => {
    await PlacePatternsModel.update(data, { where: { id } });
    return await PlacePatternsModel.findOne({ where: { id } });
  };

  static destroy = async (id: number) => {
    await PlacePatternsModel.destroy({ where: { id } });
  };
}
