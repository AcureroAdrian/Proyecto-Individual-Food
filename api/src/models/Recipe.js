const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dishTypes: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    healthScore: {
      type: DataTypes.INTEGER,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://kangsblackbeltacademy.com/wp-content/uploads/2017/04/default-image.jpg"
    }
  }, {
    timestamps: false
  });
};
