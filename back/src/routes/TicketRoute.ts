import { Application } from "express";
import { TicketController } from "../controllers/TicketController";

export class TicketRoute {
  static init = (app: Application) => {
    app.post("/tickets/buy", TicketController.buy);
    app.post("/tickets/", TicketController.create);
    app.patch("/tickets/:id", TicketController.update);
    app.delete("/tickets/:id", TicketController.destroy);
    app.get("/tickets/:id", TicketController.get);
    app.get("/tickets/", TicketController.getAll);
  };
}
