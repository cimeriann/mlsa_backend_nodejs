import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import { connectDB } from "./database/db.js";
import errorHandler from "./middleware/errorHandler/index.js"
import logger from "./utils/logger.js";
import notFound from "./middleware/notFound.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(notFound);
app.use(errorHandler);

app.use('/api/auth', authRouter);
app.get("/", (req, res) => {
  res.send(
    `<html><body><h1>Job Search API</h1><form><p font=comic-sans>Create a job listing</p><br><label for=name>Job Name: </label><input type=text id=name name=name><br/><br><label>Job Description: </label><input type=textArea><br><br><input type=submit></form></body></html>`
  );
});
//connect db

//start server
app.listen(PORT, async () => {
  await connectDB();
  logger.info(`server listening on http://127.0.0.1:${PORT}`);
});
