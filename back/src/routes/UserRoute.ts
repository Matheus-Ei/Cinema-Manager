import { UserController } from "../controllers/UserController";
import { Application } from "express";

export class UserRoute {
  static init = (app: Application) => {
    app.post("/users", UserController.create);
    app.patch("/users/:id", UserController.update);
    app.delete("/users/:id", UserController.destroy);
    app.get("/users", UserController.getAll);
    app.get("/users/:userId/sessions", UserController.getSessions);

    app.post("/users/recover", UserController.recover);
    app.post("/users/password", UserController.changePassword);

    app.post("/users/auth", UserController.login);
  };
}
