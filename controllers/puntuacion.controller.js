const Puntuacion = require('../models/puntuacion.model');

exports.crearPuntuacion = async (req, res) => {
  try {
    const { nombre_estudiante, puntuacion, observaciones } = req.body;
    const nueva = await Puntuacion.create({ nombre_estudiante, puntuacion, observaciones });
    res.status(201).json(nueva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar la puntuación" });
  }
};

exports.obtenerPuntuaciones = async (req, res) => {
  try {
    const datos = await Puntuacion.findAll();
    res.json(datos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener puntuaciones" });
  }
};

exports.eliminarTodas = async (req, res) => {
  try {
    await Puntuacion.destroy({ where: {} });
    res.json({ mensaje: "Todas las puntuaciones eliminadas" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "No se pudo eliminar" });
  }
};
