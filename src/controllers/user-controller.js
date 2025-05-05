const { StatusCodes } = require("http-status-codes");
// const AppError  = require('../utils/errors');
const AppError = require("../utils/errors/app-errors");
const { UserService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const UserRepository = require("../repositories/user-repository");

/**
 * POST
 * /signup
 * req.body = {email ,password}
 */

async function createUser(req, res) {
  try {
    console.log(req.body.password);
    
    const user = await UserService.create({
      email: req.body.email,
      password: req.body.password,
    });

    console.log(user);
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error.message);
    
        ErrorResponse.error = error;
        res.status(error?.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Something went wrong" });
  }
}


async function signin(req , res) {
    try {
      const user = await UserService.signin({
        email : req.body.email,
        password : req.body.password,
      })
      SuccessResponse.data  = user;
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
      console.log(error);
      ErrorResponse.error = error;
      res.status(error?.statuscode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: error.message || "Something went wrong" });
    }
}








module.exports = {
        createUser,
        signin,
}
