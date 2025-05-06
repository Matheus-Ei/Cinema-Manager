import { UserController } from "../controllers/UserController";
import { Application } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

export class UserRoute {
  static init = (app: Application) => {
    app.post("/users", UserController.create);
    app.patch("/users", UserController.update);
    app.delete("/users", UserController.destroy);
    app.get("/users", authMiddleware, UserController.get);
    app.get("/users/all", UserController.getAll);
    app.get("/users/:userId/sessions", UserController.getSessions);

    app.post("/users/recover", UserController.recover);
    app.post("/users/password", UserController.changePassword);

    app.post("/users/auth", UserController.login);
  };
}
