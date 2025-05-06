import MoviesModel from "../models/MoviesModel";
import RoomsModel from "../models/RoomsModel";
import UsersModel from "../models/UsersModel";
import SessionsModel from "../models/SessionsModel";
import TicketsModel from "../models/TicketsModel";
import PlacesModel from "../models/PlacesModel";
import PlacesPatternModel from "../models/PlacesPatternModel";

// The order matters here
export const models = async () => {
  await PlacesPatternModel.sync({ force: true });
  await MoviesModel.sync({ force: true });
  await RoomsModel.sync({ force: true });
  await UsersModel.sync({ force: true });
  await SessionsModel.sync({ force: true });
  await PlacesModel.sync({ force: true });
  await TicketsModel.sync({ force: true });
};
