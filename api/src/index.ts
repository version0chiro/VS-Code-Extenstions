import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import { join } from "path";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "vstodo",
    username: "postgres",
    password: "Sachin@123",
    entities: [join(__dirname, "./entities/*.*")],
    logging: !__prod__,
    synchronize: !__prod__,
  });

  const app = express();

  app.get("/", (_req, res) => {
    res.send("hello");
  });

  app.listen(3002, () => {
    console.log("listing on 3002");
  });
};

main();
