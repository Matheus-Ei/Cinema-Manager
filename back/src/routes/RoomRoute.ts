import { Application } from "express";
import { RoomController } from "../controllers/RoomController";

export class RoomRoute {
  static init = (app: Application) => {
    app.post("/rooms/", RoomController.create);
    app.patch("/rooms/:id", RoomController.update);
    app.delete("/rooms/:id", RoomController.destroy);
    app.get("/rooms/:id", RoomController.get);
    app.get("/rooms/", RoomController.getAll);
  };
}
