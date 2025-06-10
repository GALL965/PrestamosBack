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


// Obtener préstamos del día actual por admin
exports.obtenerPrestamosDelDia = async (req, res) => {
  try {
    const idAdmin = req.params.id;

    const prestamos = await Prestamo.findAll({
      where: {
        id_admin: idAdmin,
        fecha: new Date().toISOString().slice(0, 10) // YYYY-MM-DD
      },
      include: [
        { model: Usuario, as: 'alumno', attributes: ['nombre'], foreignKey: 'id_alumno' },
        { model: Articulo, attributes: ['nombre'], foreignKey: 'id_articulo' }
      ]
    });

    const resultado = prestamos.map(p => ({
      id_prestamo: p.id_prestamo,
      nombre_alumno: p.alumno.nombre,
      fecha: p.fecha,
      hora_inicio: p.hora_inicio,
      hora_fin: p.hora_fin,
      nombre_articulo: p.Articulo.nombre,
      cantidad: p.cantidad
    }));

    res.json(resultado);
  } catch (err) {
    console.error("Error al obtener préstamos del día:", err);
    res.status(500).json({ error: "Error interno" });
  }
};
