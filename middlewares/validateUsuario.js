const { body, validationResult } = require('express-validator');

const validateUsuario = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('matricula').notEmpty().withMessage('La matrícula es obligatoria'),
  body('rol').isIn(['Estudiante', 'Profesor', 'Proveedor']).withMessage('Rol inválido'),
  body('contraseña').isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres'),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];

module.exports = validateUsuario;
