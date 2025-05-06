import { Application } from "express";
import { SessionController } from "../controllers/SessionController";

export class SessionRoute {
  static init = (app: Application) => {
    app.post("/sessions/", SessionController.create);
    app.patch("/sessions/:id", SessionController.update);
    app.delete("/sessions/:id", SessionController.destroy);
    app.get("/sessions/:id", SessionController.get);
    app.get("/sessions/", SessionController.getAll);
    app.get("/sessions/:sessionId/feedback", SessionController.getFeedback);
    app.get("/sessions/places/free/:id", SessionController.getFreePlaces);
  };
}
