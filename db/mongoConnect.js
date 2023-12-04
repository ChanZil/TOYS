const mongoose = require("mongoose");
const dotenv = require("dotenv");

// read from enviroment variable
dotenv.config(); //=> { path: "./.env" }
const mongoURL = process.env.MONGO_URL;

//connect to database - mongoDB
const connectToDB = () => {
    mongoose
      .connect(mongoURL)
      .then((con) => {
        console.log("connected to database");
      })
      .catch((error) => {
        console.error("Error to connect to database");
        console.error(error);
      });
  };

  connectToDB();
