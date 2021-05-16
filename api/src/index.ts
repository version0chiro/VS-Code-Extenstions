import "reflect-metadata";
require("dotenv-safe").config();
import express from "express";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import { join } from "path";
import { User } from "./entities/User";
import { Strategy as GitHubStrategy } from "passport-github";
import passport from "passport";
import jwt from "jsonwebtoken";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "vstodo",
    username: "postgres",
    password: "Sachin@123",
    entities: [join(__dirname, "./entities/*.*")],
    logging: !__prod__,
    synchronize: !__prod__,
  });

  // const user = await User.create({ name: "sachin" }).save();

  // console.log({ user });

  const app = express();
  passport.serializeUser(function (user: any, done) {
    done(null, user.accessToken);
  });
  app.use(passport.initialize());

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3002/auth/github/callback",
      },
      async (_accessToken, _refreshToken, profile, cb) => {
        let user = await User.findOne({ where: { githubid: profile.id } });
        if (user) {
          user.name = profile.displayName;
          await user.save();
        } else {
          user = await User.create({
            name: profile.displayName,
            githubid: profile.id,
          }).save();
        }
        profile.id;
        User.create;
        cb(null, {
          accessToken: jwt.sign(
            { userId: user.id },
            process.env.RANDOM_ACCESS_TOKEN,
            {
              expiresIn: "1y",
            }
          ),
          refreshToken: "",
        });
      }
    )
  );

  app.get("/auth/github", passport.authenticate("github", { session: false }));

  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { session: false }),
    function (req:any, res) {
      // Successful authentication, redirect home.
      res.send(req.user.accessToken);
      res.redirect(`http://localhost:54321/auth/${req.user.accessToken}`);
    }
  );
  app.get("/", (_req, res) => {
    res.send("hello");
  });

  app.listen(3002, () => {
    console.log("listing on 3002");
  });
};

main();
