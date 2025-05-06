import { Application } from "express";
import { MovieController } from "../controllers/MovieController";

export class MovieRoute {
  static init = (app: Application) => {
    app.post("/movies/", MovieController.create);
    app.patch("/movies/:id", MovieController.update);
    app.delete("/movies/:id", MovieController.destroy);
    app.get("/movies/:id", MovieController.get);
    app.get("/movies/", MovieController.getAll);
  };
}
