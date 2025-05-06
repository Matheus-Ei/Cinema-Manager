import { Place } from "../entities/Place";
import PlacesModel from "../models/PlacesModel";

export class PlaceService {
  static get = async (id: number) => {
    return await PlacesModel.findOne({ where: { id } });
  };

  static getAll = async () => {
    return await PlacesModel.findAll();
  };

  static create = async (data: Omit<Place, "id">) => {
    return await PlacesModel.create(data);
  };

  static update = async (id: number, data: Partial<Place>) => {
    await PlacesModel.update(data, { where: { id } });
    return await PlacesModel.findOne({ where: { id } });
  };

  static destroy = async (id: number) => {
    await PlacesModel.destroy({ where: { id } });
  };
}
