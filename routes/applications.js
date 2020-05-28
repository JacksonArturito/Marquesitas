const express = require('express');
let router = express.Router();

const authenticateAdmin = require('../middelwares/authenticateAdmin');
const findUser = require('../middelwares/findUser');
const applicationsController = require('../controllers/AppsControllers');

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secrets');

router.all('*',jwtMiddleware({secret: secrets.jwtSecret}),findUser,authenticateAdmin)

router.route('/')
   .get(applicationsController.index)
   .post(applicationsController.create);

router.route('/:id')
   .delete(applicationsController.find,applicationsController.destroy)

module.exports = router;
