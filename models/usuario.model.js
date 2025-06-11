const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Usuario = db.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  matricula: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
},
  correo: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
  },
  rol: {
    type: DataTypes.ENUM('Estudiante', 'Profesor', 'Proveedor'),
    allowNull: false
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  }
foto: {
  type: DataTypes.TEXT,
  allowNull: true
}


}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;
