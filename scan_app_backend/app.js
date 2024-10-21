const express = require("express");
const bodyParser = require("body-parser")
const User = require("./routes/user");
const app = express();

app.use(bodyParser.json())

 app.use("/",User);

module.exports = app;