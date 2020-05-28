const express = require('express');
let router = express.Router();

const favoritesController = require('../controllers/FavoritesControllers');
const findUser = require('../middelwares/findUser');

const authenticateOwner = require('../middelwares/authenticateOwner');

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secrets');

router.route('/')
   .get(jwtMiddleware({secret: secrets.jwtSecret}),findUser,favoritesController.index)
   .post(favoritesController.create);

router.route('/:id')
   .delete(favoritesController.find,authenticateOwner,favoritesController.destroy);
module.exports = router;
