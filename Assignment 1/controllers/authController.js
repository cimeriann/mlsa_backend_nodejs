const { StatusCodes } = require("http-status-codes");
const Users = require("../models/User");
const { errorResponse, successResponse } = require("../utils/appError");

exports.createUser = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
  
      // Validate required fields first
      if (!firstName || !email || !password || !lastName) {
        return errorResponse(res, StatusCodes.BAD_REQUEST, 'All fields are required');
      }
  
      // Check if the user already exists
      const user = await Users.findOne({ email });
      if (user) {
        return errorResponse(res, StatusCodes.CONFLICT, 'User already exists');
      }
  
      // Create and save new user
      const newUser = new Users({
        firstName,
        lastName,
        email,
        password
      });
      await newUser.save();
  
      // Send success response
      successResponse(res, 201, 'User created successfully', newUser);
    } catch (error) {
      return errorResponse(res, StatusCodes.BAD_REQUEST, error.message);
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
        if (user.password !== password){
            return errorResponse(res, StatusCodes.BAD_REQUEST, 'Invalid password');
        }
        return successResponse(res, 200, 'User logged in successfully', user);
    }catch(error){
        return errorResponse(res, StatusCodes.BAD_REQUEST, error);
    }
};

exports.changePassword = async (req, res) => {
    console.log('Under construction :(');
};
