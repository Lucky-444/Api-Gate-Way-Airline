const express = require('express');

const { InfoController , UserController } = require('../../controllers');
const {AuthRequestMiddleware} = require('../../middlewares')
const UserRoutes = require('./user-routes');
const router = express.Router();

router.get('/info',AuthRequestMiddleware.checkAuth , InfoController.info);
router.use('/user' ,UserRoutes);

module.exports = router;