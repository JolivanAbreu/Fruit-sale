const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ItensVenda = sequelize.define("ItensVenda", {
    venda_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "vendas", key: "id" }
    },
    fruta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "frutas", key: "id" }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco_unitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    desconto: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    }
}, {
    timestamps: false
});

module.exports = ItensVenda;
