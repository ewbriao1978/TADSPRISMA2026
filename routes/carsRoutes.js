const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsController');

router.get('/cars', carsController.getAllCars);

module.exports = router;