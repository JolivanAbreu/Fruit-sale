const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Venda = sequelize.define("Venda", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendedor_id: { type: DataTypes.INTEGER, allowNull: false }, // Referência ao vendedor
  data_hora: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  valor_total: { type: DataTypes.FLOAT, allowNull: false },
}, {
  tableName: "vendas",
  timestamps: false
});

module.exports = Venda;
