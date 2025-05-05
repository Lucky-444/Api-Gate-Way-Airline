const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

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
module.exports = {
        create,
        
}
