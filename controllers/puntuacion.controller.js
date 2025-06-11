const Puntuacion = require('../models/puntuacion.model');

exports.crearPuntuacion = async (req, res) => {
  try {
    const { id_estudiante, puntuacion, observaciones } = req.body;

    // Validación básica
    if (!id_estudiante || !puntuacion) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const nueva = await Puntuacion.create({ id_estudiante, puntuacion, observaciones });
    res.status(201).json(nueva);
  } catch (err) {
    console.error("💥 Error al guardar la puntuación:", err);
    res.status(500).json({
      error: "Error al guardar la puntuación",
      detalles: err.message
    });
  }
};

const Usuario = require('../models/usuario.model');

exports.obtenerPuntuaciones = async (req, res) => {
  try {
    const datos = await Puntuacion.findAll({
      include: {
        model: Usuario,
        attributes: ['nombre']
      }
    });

    res.json(datos);
  } catch (err) {
    console.error("💥 Error al obtener puntuaciones:", err);
    res.status(500).json({ error: "Error al obtener puntuaciones" });
  }
};

exports.eliminarTodas = async (req, res) => {
  try {
    await Puntuacion.destroy({ where: {} });
    res.json({ mensaje: "Todas las puntuaciones eliminadas" });
  } catch (err) {
    console.error("💥 Error al eliminar puntuaciones:", err);
    res.status(500).json({ error: "No se pudo eliminar" });
  }
};


exports.obtenerPorEstudiante = async (req, res) => {
  try {
    const id_estudiante = req.params.id;
    const datos = await Puntuacion.findAll({
      where: { id_estudiante },
      order: [['fecha', 'DESC']]
    });
    res.json(datos);
  } catch (err) {
    console.error("💥 Error al obtener puntuaciones por estudiante:", err);
    res.status(500).json({ error: "Error al obtener puntuaciones del estudiante" });
  }
};
