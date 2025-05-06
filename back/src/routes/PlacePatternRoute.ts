import { Application } from "express";
import { PlacePatternController } from "../controllers/PlacePatternController";

export class PlacePatternRoute {
  static init = (app: Application) => {
    app.post("/places/patterns/", PlacePatternController.create);
    app.patch("/places/patterns/:id", PlacePatternController.update);
    app.delete("/places/patterns/:id", PlacePatternController.destroy);
    app.get("/places/patterns/:id", PlacePatternController.get);
    app.get("/places/patterns/", PlacePatternController.getAll);
  };
}
