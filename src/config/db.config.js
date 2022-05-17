const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = () => {
  return mongoose.connect(
    `mongodb+srv://delinuxsit:${process.env.dbpass}@cluster0.xs5jp.mongodb.net/Task-Manager?retryWrites=true&w=majority`
  );
};

module.exports = connectDb;
