console.log(
  "**************************Welcome to node with typescripts*******************************"
);
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import routes from "./routes/routes";
import "dotenv/config";

import swaggerUi from "swagger-ui-express";
import auth from "basic-auth";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const swaggerDoc = require("./public/swagger.json");
app.use("/api/v1", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

var basicAuthentication = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("basicAuthentication");
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    var credentials = auth(req);
    if (
      !credentials ||
      credentials.name !== process.env.BASIC_USERNAME ||
      credentials.pass !== process.env.BASIC_PASSWORD
    ) {
      res.statusCode = 401;
      res.send({ message: "Access denied" });
    } else {
      next();
    }
  }
};
app.use(basicAuthentication);

app.use("/", routes.taskRouter);

const url: string = process.env.URL ||"mongodb://localhost:27017/test";
mongoose.connect(url, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Database connect");
});

//const port: number = 5100 || process.env.PORT ;

app.listen(process.env.PORT, () => {
  console.log(`server is up ${process.env.PORT}`);
});
