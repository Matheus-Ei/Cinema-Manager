import { Request } from "express";
import { Movie } from "../entities/Movie";
import MoviesModel from "../models/MoviesModel";
import { Files } from "../utils/files";

export class MovieService {
  static get = async (id: number) => {
    return await MoviesModel.findOne({ where: { id } });
  };

  static getAll = async () => {
    return await MoviesModel.findAll();
  };

  static create = async (req: Request) => {
    const { image } = req.files as any;

    const movies = await MoviesModel.create({ ...req.body })

    const filePath = await Files.save(image, {
      table: "movies",
      type: "image",
      id: movies.dataValues.id,
    });

    await MoviesModel.update(
      { imagePath: filePath },
      { where: { id: movies.dataValues.id } },
    );

    return movies;
  };

  static update = async (id: number, data: Partial<Movie>) => {
    await MoviesModel.update(data, { where: { id } });
    return await MoviesModel.findOne({ where: { id } });
  };

  static destroy = async (id: number) => {
    const movie = await MoviesModel.findByPk(id);

    await Files.delete(movie?.dataValues.imagePath);

    await MoviesModel.destroy({ where: { id } });
  };
}
