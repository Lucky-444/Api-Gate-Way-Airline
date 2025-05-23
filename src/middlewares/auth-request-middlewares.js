const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const { UserService } = require("../services");

const AppError = require("../utils/errors/app-errors");

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    ErrorResponse.message = "something went Wrong Please Give Your Email";
    ErrorResponse.error = new AppError(
      ["Email Is Not Found From Incoming Request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = "something went Wrong Please Give Your password";
    ErrorResponse.error = new AppError(
      ["password Is Not Found From Incoming Request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

async function checkAuth(req, res, next) {
  try {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const userId = await UserService.isAuthenticated(token);
    req.user = userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message || "Unauthorized" });
  }
}

async function isAdmin(req , res, next) {
  const response = await UserService.isAdmin(req.user);
  if(!response) {
      return res
              .status(StatusCodes.UNAUTHORIZED)
              .json({message: 'User not authorized for this action'});
  }
  next();
}



// Middleware to check if user has required role to modify flight data
// async function checkFlightAccess(req, res, next) {
//   try {
//     const userId = req.user; // Assuming req.user is set by checkAuth middleware
//     const isAdmin = await UserService.isAdmin(userId);
//     const isFlightCompany = await UserService.hasRole(userId, Enums.USER_ROLE_ENUMS.FLIGHT_COMPANY);

//     if (!isAdmin && !isFlightCompany) {
//       return res.status(403).json({ message: "You are not authorized to modify flight data." });
//     }
    
//     next(); // Allow access if authorized
//   } catch (error) {
//     return res.status(500).json({ message: "Internal Server Error." });
//   }
// }

module.exports = {
  validateAuthRequest,
  checkAuth,
  isAdmin,

}
