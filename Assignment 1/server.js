const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const mongo_url = process.env.MONGO_URI;
// const AppError = require('./utils/appError');


// CONNECT DB
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(`Unable to connect to database - ${err}`);
  });

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    })
});

app.get("/", (req, res) => {
  res.send("Simple To Do API");
});

app.listen(port, () => {
  console.log(`server is listening on port http://localhost:${port}`);
});
