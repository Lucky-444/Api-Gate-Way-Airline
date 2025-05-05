const express = require('express');
const {UserController} = require('../../controllers');
const {AuthRequestMiddleware} = require('../../middlewares')
const router = express.Router();

router.post('/signup' , UserController.createUser);
router.post('/signin' ,AuthRequestMiddleware.validateAuthRequest ,  UserController.signin);

module.exports = router;