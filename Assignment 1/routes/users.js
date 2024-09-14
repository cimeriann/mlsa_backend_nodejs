const userController = require('../controllers/userController');
const express = require('express');
const userRouter = express.Router();

userRouter.get('/getUsers', userController.getUsers)
userRouter.get('/getUserById/:id', userController.getUserById)

module.exports = userRouter;