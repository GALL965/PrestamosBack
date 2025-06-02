const express = require('express');
const router = express.Router();
const { actualizarDisponibilidad, obtenerDisponibilidad } = require('../controllers/disponibilidad.controller');

router.get('/:idAdmin', obtenerDisponibilidad);
router.post('/', actualizarDisponibilidad);

module.exports = router;
