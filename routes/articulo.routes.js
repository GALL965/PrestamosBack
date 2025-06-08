const express = require('express');
const router = express.Router();

const {
  crearArticulo,
  obtenerArticulos,
  eliminarArticulo,
  eliminarTodos
} = require('../controllers/articulo.controller');

router.get('/por-admin/:idAdmin', articuloController.obtenerPorAdmin);
router.post('/', crearArticulo);
router.get('/', obtenerArticulos);
router.delete('/:id', eliminarArticulo);
router.delete('/', eliminarTodos);

module.exports = router;
