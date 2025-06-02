const { Sequelize } = require('sequelize');

console.log("DATABASE_URL:", process.env.DATABASE_URL); // <- añade esto para debug

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: false
});

module.exports = db;
