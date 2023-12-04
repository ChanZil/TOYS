const express = require("express");
const cors = require("cors");
const path = require("path");
const toysRoutes = require("./routes/toy.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/toys", toysRoutes);
app.use("/users", userRoutes);

app.get("/test", (req, res) => {
  res.json({ msg: "works properly" });
});


app.get("*", () => {})

module.exports.app = app;


// limit pages before find()
//?page=10
//const {query} = req;
//const perPage = 10;
//const limit = query.page*perPage
//const skip = (queryPage - 1) * perPage