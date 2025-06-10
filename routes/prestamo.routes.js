const Prestamo = require('../models/prestamo.model'); 
const express = require('express');
const router = express.Router();
const prestamoController = require('../controllers/prestamo.controller');

router.post('/', prestamoController.crearPrestamo);

module.exports = router;


router.get('/dia/:id', prestamoController.obtenerPrestamosDelDia);

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const eliminado = await Prestamo.destroy({ where: { id_prestamo: id } });
    if (eliminado) {
      res.json({ mensaje: "Préstamo eliminado" });
    } else {
      res.status(404).json({ error: "Préstamo no encontrado" });
    }
  } catch (err) {
    console.error("Error al eliminar préstamo:", err);
    res.status(500).json({ error: "Error interno" });
  }
});
