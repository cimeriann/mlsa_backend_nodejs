import User from "../models/User.js";
import { errorResponse, successResponse } from "../utils/appError.js";
import logger from "../utils/logger.js";
import StatusCodes from "http-status-codes";
import { checkValidity, generateSecurePassword } from "../utils/auth.js";

export const registerAccount = async (req, res, next) => {
  try {
    logger.info("START: Register Account Service");

    const { firstName, lastName, email, userName, password, gender } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !userName ||
      !password ||
      !gender
    ) {
      logger.info(`END: Register Account Service`);
      return errorResponse(res, StatusCodes.BAD_REQUEST, "Missing parameters");
    }
    const isUserExisting = await User.findOne({ email });
    if (isUserExisting) {
      logger.info("END: Register Account Service");
      return errorResponse(
        res,
        StatusCodes.BAD_REQUEST,
        "User already exists, log in instead"
      );
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      userName,
      password: generateSecurePassword(password),
      gender,
    });

    logger.info("END: Register Account Service");
    successResponse(
      res,
      StatusCodes.CREATED,
      "User created successfully",
      user
    );
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    logger.info("START: Login Service");
    const { userName, password } = req.body;

    if (!userName || !password) {
      return errorResponse(
        res,
        StatusCodes.BAD_REQUEST,
        "Please provide email and password"
      );
    }
    const user = User.findOne({ userName });
    if (!user) {
      logger.info(`END: Login Service`);
      return errorResponse(
        res,
        StatusCodes.NOT_FOUND,
        "User does not exist, create a new account"
      );
    }
    if (!checkValidity(user.password, password)) {
      logger.info(`END: Login Service`);
      return errorResponse(
        res,
        StatusCodes.BAD_REQUEST,
        "You have entered wrong username or password"
      );
    }
    successResponse(res, StatusCodes.OK, `Successfully logged in`, user);
    logger.info(`END: Login Service`);
  } catch (error) {
    logger.error("Could not log user in");
    next(error);
  }
};
