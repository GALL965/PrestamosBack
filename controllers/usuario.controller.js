const Usuario = require('../models/usuario.model');

exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, matricula, rol, contraseña, correo } = req.body;
    const nuevoUsuario = await Usuario.create({ nombre, matricula, rol, contraseña, correo });
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuario', detalles: err.message });
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios', detalles: err.message });
  }
};


const MatriculaValida = require('../models/matricula.model');

exports.crearAdministrador = async (req, res) => {
  const { nombre, matricula, contraseña, correo } = req.body;
  try {
    const existe = await MatriculaValida.findOne({ where: { matricula } });
    if (!existe) {
      return res.status(400).json({ error: "Matrícula no válida. No se creó la cuenta." });
    }

  const nuevoUsuario = await Usuario.create({
  nombre,
  matricula,
  rol: "Proveedor",
  contraseña,
  correo
  });

    res.status(201).json({ mensaje: "Administrador registrado correctamente", usuario: nuevoUsuario });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar administrador", detalles: err.message });
  }
};


exports.obtenerAdministradores = async (req, res) => {
  try {
    const admins = await Usuario.findAll({ where: { rol: 'Proveedor' } });
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener administradores', detalles: err.message });
  }
};


exports.loginUsuario = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo, contraseña } });

    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.json({ mensaje: "Login correcto", usuario });
  } catch (err) {
    res.status(500).json({ error: "Error en login", detalles: err.message });
  }
};
