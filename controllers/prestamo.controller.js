const Prestamo = require('../models/prestamo.model');
const Articulo = require('../models/articulo.model');
const Usuario = require('../models/usuario.model'); // 🔥 este es crucial

// 🔹 Crear préstamo
exports.crearPrestamo = async (req, res) => {
  try {
    const { id_admin, id_alumno, id_articulo, cantidad, fecha, hora_inicio, hora_fin } = req.body;

    if (!id_admin || !id_alumno || !id_articulo || !cantidad || !fecha || !hora_inicio || !hora_fin) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const articulo = await Articulo.findByPk(id_articulo);

    if (!articulo) {
      return res.status(404).json({ error: "Artículo no encontrado" });
    }

    if (articulo.cantidad < cantidad) {
      return res.status(400).json({ error: "No hay suficientes unidades disponibles" });
    }

    articulo.cantidad -= cantidad;
    await articulo.save();

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
    console.error("❌ Error al registrar préstamo:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// 🔹 Obtener préstamos del día
exports.obtenerPrestamosDelDia = async (req, res) => {
  try {
    const idAdmin = req.params.id;

    const prestamos = await Prestamo.findAll({
      where: {
        id_admin: idAdmin
        // Puedes agregar filtro de fecha aquí si quieres solo los de hoy
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


exports.eliminarPrestamosDelDia = async (req, res) => {
  try {
    const idAdmin = req.params.id;

    const eliminados = await Prestamo.destroy({
      where: {
        id_admin: idAdmin
        // También podrías filtrar por fecha actual si lo deseas
        // fecha: new Date().toISOString().slice(0, 10)
      }
    });

    res.json({ mensaje: `Eliminados ${eliminados} registros` });
  } catch (err) {
    console.error("❌ Error al eliminar préstamos del día:", err);
    res.status(500).json({ error: "Error interno" });
  }
};


exports.obtenerPrestamosPorAlumno = async (req, res) => {
  try {
    const idAlumno = req.params.id;

    const prestamos = await Prestamo.findAll({
      where: { id_alumno: idAlumno },
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
    console.error("❌ Error al obtener préstamos del alumno:", err);
    res.status(500).json({ error: "Error interno" });
  }
};


exports.eliminarPrestamosPorAlumno = async (req, res) => {
  try {
    const idAlumno = req.params.id;
    const eliminados = await Prestamo.destroy({ where: { id_alumno: idAlumno } });
    res.json({ mensaje: `Eliminados ${eliminados} préstamos del alumno` });
  } catch (err) {
    console.error("❌ Error al eliminar préstamos del alumno:", err);
    res.status(500).json({ error: "Error interno" });
  }
};
