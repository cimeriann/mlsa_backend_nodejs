const Tasks = require('../models/Task.js');
const { errorResponse, successResponse } = require('../utils/appError');
const StatusCodes = require('http-status-codes');

exports.getTasks = async (req, res) =>{
   try {
       const tasks = await Tasks.find({});
    //    res.json(tasks);
       successResponse(res, StatusCodes.OK, 'List of all tasks', tasks)
   }catch(error){
       return errorResponse(res, 400, error)
   }

};
exports.getTask = async (req, res) =>{
    try {
        const task = await Tasks.findById(req.params.id);
        if(!task){
            return errorResponse(res, StatusCodes.NOT_FOUND, 'Task not found');
        }
        successResponse(res, StatusCodes.OK, 'Task found', task);
    } catch (error) {
        return errorResponse(res, StatusCodes.BAD_REQUEST, error);
    }
};
exports.createTask = async (req, res) =>{
    try {
        const {title, description, isPending, isCompleted} = req.body;
        if (!title || !description || !isPending || !isCompleted){
            return errorResponse(res, StatusCodes.BAD_REQUEST, 'All fields are required');
        }
        const task = new Tasks({
            title,
            description,
            isPending,
            isCompleted
        });
        await task.save();
        successResponse(res, 201, 'Task created successfully', task);
    } catch (error) {
        return errorResponse(res, StatusCodes.BAD_REQUEST, error);
    }
};

exports.updateTask = async (req, res) =>{
    try {
        const task = await Tasks.findById(req.params.id);
        if (!task){
            return errorResponse(res, StatusCodes.NOT_FOUND, 'Task not found');
        }
        const {title, description, isPending, isCompleted} = req.body;
        if (!title || !description || !isPending || !isCompleted){
            return errorResponse(res, StatusCodes.BAD_REQUEST, 'All fields are required');
        }
        const updatedTask = await Tasks.findByIdAndUpdate(req.params.id, {
            title,
            description,
            isPending,
            isCompleted
        }, {new: true});
        successResponse(res, StatusCodes.ACCEPTED, 'Task updated successfully', updatedTask);
    } catch (error) {
        return errorResponse(res, StatusCodes.BAD_REQUEST, error);
    }
};



exports.deleteTask = async (req, res) =>{
    try {
        const task = await Tasks.findByIdAndDelete(req.params.id);
        if (!task){
            return errorResponse(res, StatusCodes.NOT_FOUND, 'No task found with that id');
        }
        successResponse(res, StatusCodes.ACCEPTED, 'Task deleted successfully', task);
    } catch (error) {
        return errorResponse(res, StatusCodes.BAD_REQUEST, error);
    }
};