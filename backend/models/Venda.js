const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Venda = sequelize.define("Venda", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendedor_id: { type: DataTypes.INTEGER, allowNull: false }, // Referência ao vendedor
  data_hora: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  valor_total: { type: DataTypes.FLOAT, allowNull: false },
}, {
  tableName: "vendas", // Nome da tabela no banco de dados
  timestamps: false // Evita colunas createdAt e updatedAt
});

module.exports = Venda;
