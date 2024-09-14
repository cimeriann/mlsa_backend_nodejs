const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.post("/register", authController.createUser);
authRouter.post("/login", authController.login);
authRouter.put("/changePassword", authController.changePassword);

module.exports = authRouter;
