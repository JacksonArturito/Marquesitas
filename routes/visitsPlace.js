const express = require('express');
let router = express.Router();

const authenticateOwner = require('../middelwares/authenticateOwner');
const visitsController = require('../controllers/VisitsControllers');
const placesController = require('../controllers/PlacesControllers');

router.route('/:id/visits')
   .get(placesController.find,visitsController.index)
   .post(placesController.find,visitsController.create);

router.route('/:id/visits/:visit_id')
   .delete(visitsController.find,authenticateOwner,visitsController.destroy);

module.exports = router;
