import { MovieRoute } from "../routes/MovieRoute";
import { PlacePatternRoute } from "../routes/PlacePatternRoute";
import { PlaceRoute } from "../routes/PlaceRoute";
import { RoomRoute } from "../routes/RoomRoute";
import { SessionRoute } from "../routes/SessionRoute";
import { TicketRoute } from "../routes/TicketRoute";
import { UserRoute } from "../routes/UserRoute";
import { Application } from "express";

export const routes = (app: Application) => {
  UserRoute.init(app);
  SessionRoute.init(app);
  RoomRoute.init(app);
  MovieRoute.init(app);
  PlacePatternRoute.init(app);
  PlaceRoute.init(app);
  TicketRoute.init(app);
};
