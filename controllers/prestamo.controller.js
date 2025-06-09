const Prestamo = require('../models/prestamo.model');
const Articulo = require('../models/articulo.model'); // asegúrate de importar esto

exports.crearPrestamo = async (req, res) => {
  try {
    const { id_admin, id_alumno, id_articulo, cantidad, fecha, hora_inicio, hora_fin } = req.body;

    if (!id_admin || !id_alumno || !id_articulo || !cantidad || !fecha || !hora_inicio || !hora_fin) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Verificar existencia del artículo y cantidad disponible
    const articulo = await Articulo.findByPk(id_articulo);

    if (!articulo) {
      return res.status(404).json({ error: "Artículo no encontrado" });
    }

    if (articulo.cantidad < cantidad) {
      return res.status(400).json({ error: "No hay suficientes unidades disponibles" });
    }

    // Restar cantidad y actualizar
    articulo.cantidad -= cantidad;
    await articulo.save();

    // Crear el préstamo
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
    console.error("Error al registrar préstamo:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
