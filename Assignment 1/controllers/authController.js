const { StatusCodes } = require("http-status-codes");
const Users = require("../models/User");
const { errorResponse, successResponse } = require("../utils/appError");

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = Users.findOne({email});
        if (user){
            return errorResponse(res, StatusCodes.CONFLICT, 'User already exists');
        }
    } catch (error) {
        return errorResponse(res, StatusCodes.BAD_REQUEST, error);
    }
    if (!firstName || !email || !password || !lastName) {
        return errorResponse(res, StatusCodes.BAD_REQUEST, 'All fields are required');
    }
    const user = new Users({
        firstName,
        lastName,
        email,
        password
    });
    await user.save();
    successResponse(res, 201, 'User created successfully', user);
  } catch (error) {
    return errorResponse(res, StatusCodes.BAD_REQUEST, error);
  }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password){
            return errorResponse(res, StatusCodes.BAD_REQUEST, 'All fields are required');
        }
        const user = await Users.findOne({email});
        if (!user){
            return errorResponse(res, StatusCodes.BAD_REQUEST, 'User not found');
        }
        const validPassword = await user.comparePassword(password);
        if (!validPassword){
            return errorResponse(res, StatusCodes.BAD_REQUEST, 'Invalid password');
        }
        successResponse(res, 200, 'User logged in successfully', user);
    }catch(error){
        return errorResponse(res, StatusCodes.BAD_REQUEST, error);
    }
};

exports.changePassword = async (req, res) => {
    console.log('Under construction :(');
};
