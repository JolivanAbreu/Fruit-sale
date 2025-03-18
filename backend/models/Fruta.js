const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Fruta = sequelize.define("Fruta", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  classificacao: {
    type: DataTypes.ENUM("Extra", "Primeira", "Segunda", "Terceira"),
    allowNull: false,
  },
  fresca: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Fruta;
