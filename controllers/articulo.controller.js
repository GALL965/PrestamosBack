const Articulo = require('../models/articulo.model');

exports.crearArticulo = async (req, res) => {
  try {
    const { id_proveedor, nombre, categoria, cantidad, estado, razon_estado, foto } = req.body;

    const nuevoArticulo = await Articulo.create({
      id_proveedor,
      nombre,
      categoria,
      cantidad,
      estado: estado || 'Disponible',
      razon_estado,
      foto
    });

    res.status(201).json(nuevoArticulo);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar el artículo', detalles: err.message });
  }
};



exports.obtenerArticulos = async (req, res) => {
  try {
    const articulos = await Articulo.findAll();
    res.json(articulos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener artículos', error });
  }
};


exports.eliminarArticulo = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Articulo.destroy({ where: { id_articulo: id } });
    if (eliminado === 0) {
      return res.status(404).json({ mensaje: 'Artículo no encontrado' });
    }
    res.json({ mensaje: 'Artículo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el artículo', error });
  }
};


exports.eliminarTodos = async (req, res) => {
  try {
    await Articulo.destroy({ where: {} });
    res.json({ mensaje: 'Todos los artículos eliminados' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar todos los artículos', error });
  }
};
