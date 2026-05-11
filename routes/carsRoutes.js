const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsController');

router.get('/cars', carsController.getAllCars);
router.get('/cars/:id', carsController.getCarById);
router.post('/cars', carsController.createCar);
router.delete('/cars/:id', carsController.deleteCar);
router.put('/cars/:id', carsController.updateCar);

module.exports = router;