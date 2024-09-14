const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controllers/taskController");

taskRouter.get("/getTasks", taskController.getTasks);
taskRouter.post("/createTask", taskController.createTask);
taskRouter.put("/updateTask/:id", taskController.updateTask);
taskRouter.get("/getTask/:id", taskController.getTask);
taskRouter.delete("/deleteTask/:id", taskController.deleteTask);

exports.taskRouter = taskRouter;