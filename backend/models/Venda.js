const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Venda = sequelize.define("Venda", {
    vendedor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valor_total: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Venda;
