const Prestamo = require('../models/prestamo.model');
const Articulo = require('../models/articulo.model');
const Usuario = require('../models/usuario.model'); // ← ESTA LÍNEA FALTABA

exports.obtenerPrestamosDelDia = async (req, res) => {
  try {
    const idAdmin = req.params.id;

    const prestamos = await Prestamo.findAll({
      where: {
        id_admin: idAdmin
        // Si quieres ver solo los de hoy, descomenta esto:
        // fecha: new Date().toISOString().slice(0, 10)
      },
      include: [
        { model: Usuario, as: 'alumno', attributes: ['nombre'] },
        { model: Articulo, attributes: ['nombre'] }
      ]
    });

    const resultado = prestamos.map(p => ({
      id_prestamo: p.id_prestamo,
      nombre_alumno: p.alumno?.nombre || "Desconocido",
      fecha: p.fecha,
      hora_inicio: p.hora_inicio,
      hora_fin: p.hora_fin,
      nombre_articulo: p.Articulo?.nombre || "Desconocido",
      cantidad: p.cantidad
    }));

    res.json(resultado);
  } catch (err) {
    console.error("❌ Error al obtener préstamos del día:", err);
    res.status(500).json({ error: "Error interno" });
  }
};

exports.crearPrestamo = async (...) => {...}
exports.obtenerPrestamosDelDia = async (...) => {...}
