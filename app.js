const express = require("express");
require("dotenv").config();
const connectDb = require("./src/config/db.config");
const notFound = require("./src/middlewares/not-found");
const tasks = require("./src/routes/tasks.routes");
const errorHandlerMiddleware = require("./src/middlewares/error");

const app = express();
const dev = process.env.port;
const Port = process.env.PORT || dev;

// static assets
app.use(express.static("./public"));

// Inbuild middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//custom middlewares

//routes
app.get("/", (req, res) => {
  res.status(200).send(`<h1>Task Manager Api</h1>`);
});
// tasks routes middleware
app.use(`${process.env.v1}/tasks`, tasks);

// not found middleware
app.use(notFound);

// error handler middleware
app.use(errorHandlerMiddleware);

// connect to db befor starting server
const start = async () => {
  try {
    await connectDb();
    console.log("🚀 Connected to Database");
    app.listen(Port, () => {
      console.log(`🚀 Server running on port: ${Port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
