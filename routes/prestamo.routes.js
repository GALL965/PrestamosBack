const express = require('express');
const router = express.Router();
const prestamoController = require('../controllers/prestamo.controller');

router.post('/', prestamoController.crearPrestamo);

module.exports = router;
