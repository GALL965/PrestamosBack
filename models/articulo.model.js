const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Articulo = db.define('Articulo', {
  id_articulo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_proveedor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
  type: DataTypes.STRING,
  allowNull: false
  }
  estado: {
    type: DataTypes.ENUM('Disponible', 'No disponible'),
    defaultValue: 'Disponible'
  },
  razon_estado: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  foto: {
    type: DataTypes.TEXT, // base64 o url
    allowNull: true
  }
}, {
  tableName: 'articulos',
  timestamps: false
});

module.exports = Articulo;
