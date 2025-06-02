const { DataTypes } = require('sequelize');
const db = require('../config/database');

const MatriculaValida = db.define('MatriculaValida', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  matricula: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  tableName: 'matriculas_validas',
  timestamps: false
});

module.exports = MatriculaValida;
