const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Venda = require("./Venda");
const Fruta = require("./Fruta");

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

ItensVenda.associate = (models) => {
    ItensVenda.belongsTo(models.Venda, { foreignKey: "venda_id", as: "Venda" });
    ItensVenda.belongsTo(models.Fruta, { foreignKey: "fruta_id", as: "Fruta" });
};

module.exports = ItensVenda;