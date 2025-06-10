const express = require('express');
const router = express.Router();

const {
  crearUsuario,
  obtenerUsuarios,
  crearAdministrador,
  obtenerAdministradores,
  loginUsuario,
  obtenerEstudiantes
} = require('../controllers/usuario.controller');

const validateUsuario = require('../middlewares/validateUsuario');

// Rutas
router.post('/', validateUsuario, crearUsuario);
router.get('/', obtenerUsuarios);
router.post('/admin', crearAdministrador);
router.get('/admins', obtenerAdministradores);
router.post('/login', loginUsuario);
router.get('/estudiantes', obtenerEstudiantes); // esta es la nueva

module.exports = router;
