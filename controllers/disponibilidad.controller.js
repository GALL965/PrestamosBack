const db = require('../config/database');
const Disponibilidad = require('../models/disponibilidad.model')(db, require('sequelize').DataTypes);

exports.actualizarDisponibilidad = async (req, res) => {
  const { idAdmin, datos } = req.body;

  try {
    await Disponibilidad.destroy({ where: { id_admin: idAdmin } });

    const registros = datos.map(item => ({
      id_admin: idAdmin,
      dia: item.dia,
      horario: item.horario,
      disponible: item.disponible
    }));

    await Disponibilidad.bulkCreate(registros);
    res.json({ mensaje: 'Disponibilidad actualizada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar disponibilidad', error });
  }
};

exports.obtenerDisponibilidad = async (req, res) => {
  const { idAdmin } = req.params;
  try {
    const disponibilidad = await Disponibilidad.findAll({ where: { id_admin: idAdmin } });
    res.json(disponibilidad);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener disponibilidad', error });
  }
};
