const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Puntuacion = db.define('Puntuacion', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre_estudiante: { type: DataTypes.STRING, allowNull: false },
  puntuacion: { type: DataTypes.INTEGER, allowNull: false },
  observaciones: { type: DataTypes.TEXT },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'puntuaciones',
  timestamps: false
});

module.exports = Puntuacion;
