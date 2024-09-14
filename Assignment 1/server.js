const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const taskRouter = require("./routes/tasks.js");
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth');
const app = express();
const port = process.env.PORT;
const mongo_url = process.env.MONGO_URI;
// const AppError = require('./utils/appError');

app.use(express.json());
// CONNECT DB
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(`Unable to connect to database - ${err}`);
  });

app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.get("/api", (req, res) => {
  res.send("Simple To Do API");
});

app.listen(port, () => {
  console.log(`server is listening on port http://localhost:${port}`);
});
