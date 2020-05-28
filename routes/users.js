const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersControllers');
const sessionsController = require('../controllers/SessionsController');
router.route('/')
   .post(
           usersController.create,
           sessionsController.generateToken,
           sessionsController.sendToken)
  




module.exports = router;
