const {StatusCodes} = require('http-status-codes');

const {ErrorResponse} = require('../utils/common');

const AppError = require('../utils/errors/app-errors');

function validateAuthRequest(req , res, next){
        if(!req.body.email){
                ErrorResponse.message = "something went Wrong Please Give Your Email";
                ErrorResponse.error = new AppError(["Email Is Not Found From Incoming Request"] , StatusCodes.BAD_REQUEST);
                return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        if(!req.body.password){
                ErrorResponse.message = "something went Wrong Please Give Your password";
                ErrorResponse.error = new AppError(["password Is Not Found From Incoming Request"] , StatusCodes.BAD_REQUEST);
                return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        next();

}

module.exports = {
        validateAuthRequest
}