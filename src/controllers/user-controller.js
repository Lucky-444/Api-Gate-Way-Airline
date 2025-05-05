const { StatusCodes } = require("http-status-codes");

const { UserService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 * POST
 * /signup
 * req.body = {email ,password}
 */

async function createUser(req, res) {
  try {
    console.log(req.body.password);
    
    const user = UserService.create({
      email: req.body.email,
      password: req.body.password,
    });

    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
        ErrorResponse.error = error;
        res.status(error?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Something went wrong" });
  }
}

module.exports = {
        createUser,
}
