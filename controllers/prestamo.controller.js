const Prestamo = require('../models/prestamo.model');

exports.crearPrestamo = async (req, res) => {
  try {
    const { id_admin, id_alumno, id_articulo, cantidad, fecha, hora_inicio, hora_fin } = req.body;

    if (!id_admin || !id_alumno || !id_articulo || !cantidad || !fecha || !hora_inicio || !hora_fin) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const nuevoPrestamo = await Prestamo.create({
      id_admin,
      id_alumno,
      id_articulo,
      cantidad,
      fecha,
      hora_inicio,
      hora_fin
    });

    res.status(201).json(nuevoPrestamo);
  } catch (error) {
    console.error("Error al crear préstamo:", error);
    res.status(500).json({ error: 'Error al registrar el préstamo' });
  }
};
