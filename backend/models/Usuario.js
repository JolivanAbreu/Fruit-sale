const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define("Usuario", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  perfil: {
    type: DataTypes.ENUM("Administrador", "Vendedor"),
    allowNull: false,
  }
}, {
  timestamps: false,
  tableName: 'usuarios'
});

module.exports = Usuario;