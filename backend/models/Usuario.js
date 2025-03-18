const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Importa a configuração do banco

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
  timestamps: false // Desativa os campos createdAt e updatedAt
});

module.exports = Usuario;
