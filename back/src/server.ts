import "dotenv/config";

import express, { Application } from "express";
import { routes } from "./core/routes";
import cors from "cors";
import { ENV } from "./core/enviroment";
import { models } from "./core/models";
import fileUpload from "express-fileupload";

class Server {
  public app: Application = express();

  constructor() {
    this.middleware();
    // this.models();
    this.routes();
  }

  middleware = () => {
    this.app.use(
      cors({
        origin: ["http://localhost"],
        methods: "GET,PUT,PATCH,POST,DELETE",
        credentials: true,
      }),
    );

    this.app.use(express.json({ limit: "50mb" }));

    this.app.use(
      fileUpload({
        createParentPath: true,
        safeFileNames: true,
        preserveExtension: true,
        uriDecodeFileNames: true,
        debug: true,
        limits: { fileSize: 50 * 1024 * 1024 },
      }),
    );

    this.app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  };

  routes = () => {
    routes(this.app);
  };

  private models = () => {
    return models();
  };

  listen = () => {
    this.app.listen(ENV.SERVER_PORT, () => {
      console.clear();
      console.log("The server is running");
    });
  };
}

const run = new Server();
run.listen();
