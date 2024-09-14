const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.get('/getUsers', userController.getUsers)
router.get('/getUserById/:id', userController.getUserById)