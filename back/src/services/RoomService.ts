import { Room } from "../entities/Room";
import RoomsModel from "../models/RoomsModel";

export class RoomService {
  static get = async (id: number) => {
    return await RoomsModel.findOne({ where: { id } });
  };

  static getAll = async () => {
    return await RoomsModel.findAll();
  };

  static create = async (data: Omit<Room, "id">) => {
    return await RoomsModel.create(data);
  };

  static update = async (id: number, data: Partial<Room>) => {
    await RoomsModel.update(data, { where: { id } });
    return await RoomsModel.findOne({ where: { id } });
  };

  static destroy = async (id: number) => {
    await RoomsModel.destroy({ where: { id } });
  };
}
