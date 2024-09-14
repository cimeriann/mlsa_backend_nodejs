const Users = require('../models/User');
const { errorResponse, successResponse } = require('../utils/appError');
const StatusCodes = require('http-status-codes');

exports.getUsers = async (req, res)=>{
    try {
        const users = await Users.find({});
        res.json(users);
        successResponse(res, StatusCodes.OK, 'List of all users', users)
    } catch (error) {
        return errorResponse(res, 400, error)
    }
}

exports.getUserById = async (req, res) =>{
    try {
        const user = await Users.findById(req.params.id);
        res.json(user);
        successResponse(res, StatusCodes.OK, 'User found', user)
    } catch (error) {
        return errorResponse(res, 400, error)
    }
};