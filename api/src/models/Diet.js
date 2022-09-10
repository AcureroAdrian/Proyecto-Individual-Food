const { DataTypes } = require("sequelize")

module.exports = sequelize =>{

    sequelize.define("Diet", {
        name: {
            type: DataTypes.STRING,
            defaultValue: "Dieta desconocida"
        }
    },
    {
        timestamps: false
    })
}