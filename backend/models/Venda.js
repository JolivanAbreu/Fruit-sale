const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Venda = sequelize.define("Venda", {
  vendedor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "usuarios", key: "id" }
  },
  valor_total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  data_hora: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

module.exports = Venda;