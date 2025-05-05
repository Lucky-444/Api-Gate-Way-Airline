const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");
const bcrypt = require("bcrypt");
const { Auth } = require("../utils/common");

const UserRepo = new UserRepository();

async function create(data) {
  try {
    const user = await UserRepo.create(data);
    return user;
  } catch (error) {
    console.error("User creation failed:", error); // 👈 Add this line

    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "cant create a new User object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signin(data) {
  try {
    const user = await UserRepo.getUserByEmail(data.email);
    if (!user) {
      throw new AppError("no user found by this email", StatusCodes.NOT_FOUND);
    }

    const passwordMatch = Auth.checkPassword(data.password, user.password);

    if (!passwordMatch) {
      throw new AppError("INVALID PASSWORD", StatusCodes.BAD_REQUEST);
    }

    const jwtToken = Auth.createToken({id : user.id , email : user.email});
    return jwtToken;

  } catch (error) {
    console.log(error)
    if(error instanceof AppError) throw error;
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


async function isAuthenticated(token) {
    try {
      if(!token){
        throw new AppError("Missing JWT TOKEN" , StatusCodes.BAD_REQUEST);
      }
      const response = Auth.verifyToken(token);

      const user = UserRepo.get(response.id);
      if(!user){
        throw new AppError("No User Found" , StatusCodes.BAD_REQUEST);
      }

      return user.id;

    } catch (error) {
      if(error instanceof AppError) throw error;
      if(error.name === 'JsonWebTokenError' ){
        throw new AppError('INVALID TOKEN' , StatusCodes.BAD_REQUEST);
      }
      console.log(error);
      throw new AppError("Something Went Wrong " , StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

module.exports = {
  create,
  signin,
  isAuthenticated,
};
