const express = require('express');
const {UserController} = require('../../controllers');
const {AuthRequestMiddleware} = require('../../middlewares')
const router = express.Router();

/**
 * POST /signup
 * body {email , password}
 */
router.post('/signup' ,AuthRequestMiddleware.validateAuthRequest, UserController.createUser);
/**
 * POST /signin
 * body {email , password};
 * 
 */
router.post('/signin' ,AuthRequestMiddleware.validateAuthRequest ,  UserController.signin);
/**
 * POST /role
 * body = {role , id};
 */
router.post('/role',AuthRequestMiddleware.checkAuth,AuthRequestMiddleware.isAdmin,UserController.addRoleToUser);







module.exports = router;