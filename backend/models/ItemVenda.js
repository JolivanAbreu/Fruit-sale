const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Venda = require("./Venda");
const Fruta = require("./Fruta");

const ItemVenda = sequelize.define("ItemVenda", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vendaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Venda,
      key: "id",
    },
  },
  frutaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Fruta,
      key: "id",
    },
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  desconto: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  valorFinal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = ItemVenda;
