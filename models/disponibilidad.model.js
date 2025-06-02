module.exports = (sequelize, DataTypes) => {
  const Disponibilidad = sequelize.define('Disponibilidad', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_admin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dia: {
      type: DataTypes.ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'),
      allowNull: false
    },
    horario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'disponibilidad',
    timestamps: false
  });

  return Disponibilidad;
};
