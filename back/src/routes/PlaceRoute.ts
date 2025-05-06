import { Application } from "express";
import { PlaceController } from "../controllers/PlaceController";

export class PlaceRoute {
  static init = (app: Application) => {
    app.post("/places/", PlaceController.create);
    app.patch("/places/:id", PlaceController.update);
    app.delete("/places/:id", PlaceController.destroy);
    app.get("/places/:id", PlaceController.get);
    app.get("/places/", PlaceController.getAll);
  };
}
