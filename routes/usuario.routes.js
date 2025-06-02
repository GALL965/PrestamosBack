const express = require('express');
const router = express.Router();

// Importar todo desde usuario.controller.js en un solo bloque
const {
  crearUsuario,
  obtenerUsuarios,
  crearAdministrador,
  obtenerAdministradores,
  loginUsuario
} = require('../controllers/usuario.controller');

const validateUsuario = require('../middlewares/validateUsuario');

// Rutas
router.post('/', validateUsuario, crearUsuario);
router.get('/', obtenerUsuarios);

router.post('/admin', crearAdministrador);
router.get('/admins', obtenerAdministradores);

router.post('/login', loginUsuario);

module.exports = router;
