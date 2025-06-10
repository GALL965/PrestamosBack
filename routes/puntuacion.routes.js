const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/puntuacion.controller');

router.post('/', ctrl.crearPuntuacion);
router.get('/', ctrl.obtenerPuntuaciones);
router.delete('/', ctrl.eliminarTodas);

module.exports = router;

