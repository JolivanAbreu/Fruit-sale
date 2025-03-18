const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Fruta = sequelize.define("Fruta", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  classificacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fresca: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: "frutas",
  timestamps: false,
});

module.exports = Fruta;
