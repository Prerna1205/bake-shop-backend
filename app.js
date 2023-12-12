import express from "express";
import { join } from "path";
import { createWriteStream } from "fs";
import morgan from "morgan";
import session from "express-session";
import compression from "compression";
import home from "./routes/home";
import admin from "./routes/admin";
import api from "./routes/api";
import order from "./routes/api/orderRoute";
import payment from "./routes/api/paymentRoute";
import connectToDb from "./db";
const app = express();
const logFile = join(__dirname, "bakeshop.log");
const fileUpload = require('express-fileupload');
app.use(compression());
app.use("/assets", express.static(join(__dirname, "public")));
app.use(express.static(join(__dirname, "public", "client")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
const dotenv = require ('dotenv').config ();
app.use(
  "/admin",
  session({
    name: "sessId",
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: app.get("env") === "production" ? true : false,
      httpOnly: true,
      maxAge: 18000000, // 5 hours
    },
  })
);
app.use(morgan(":method - :url - :date - :response-time ms"));
app.use(
  morgan(":method - :url - :date - :response-time ms", {
    stream: createWriteStream(logFile, { flags: "a" }),
  })
);

app.set("view engine", "pug");
app.use("/api/payment", payment);
app.use("/api/orders", order);
app.use("/api/admin", admin);
app.use("/api", api);
app.use("/", home);

Promise.all([connectToDb()])
  .then(() =>
    app.listen(3000, () => console.log("Bake Shop is cooking on port 3000"))
  )
  .catch((error) => {
    console.error(`MongoDB Atlas Error: ${error}`);
    process.exit();
  });
