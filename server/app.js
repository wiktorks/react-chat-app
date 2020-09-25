const conn = require("./database").connection;
const query = require("./database").executeQuery;
const routes = require("./routes");
const cors = require("cors");
const passport = require("passport");
const express = require("express");
const app = express();
const { JWTStrategy } = require("./jwtStrategy");

conn.connect((e) => {
  if (e) console.log(e);
});

app.use(cors());

app.use(express.json({ limit: "10kb" }));

passport.use(JWTStrategy);

app.use(passport.initialize());

app.use("/auth", routes.authRouter);

app.get("/", (req, res, next) => {
  res.json({ message: "success" });
});

app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const result = await query("select * from users");
      console.log(result);
      res.end();
    } catch (e) {
      console.log(e);
    }
  }
);

app.listen("3001", () => {
  console.log("App is running on port 3001");
});