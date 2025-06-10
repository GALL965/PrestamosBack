const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Prestamo = db.define('Prestamo', {
  id_prestamo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_admin: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_alumno: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_articulo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora_inicio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hora_fin: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'prestamos',
  timestamps: false
});

module.exports = Prestamo;

const Usuario = require('./usuario.model');
const Articulo = require('./articulo.model');

Prestamo.belongsTo(Usuario, { as: 'alumno', foreignKey: 'id_alumno' });
Prestamo.belongsTo(Articulo, { foreignKey: 'id_articulo' });
