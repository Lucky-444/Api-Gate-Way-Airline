const express = require('express');

const { InfoController , UserController } = require('../../controllers');
const UserRoutes = require('./user-routes');
const router = express.Router();

router.get('/info', InfoController.info);
router.use('/user' ,UserRoutes);

module.exports = router;