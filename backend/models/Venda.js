const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const ItensVenda = require("./ItensVenda");

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

Venda.associate = (models) => {
  Venda.hasMany(models.ItensVenda, { foreignKey: "venda_id", as: "ItensVenda" });
  Venda.belongsTo(models.Usuario, { foreignKey: "vendedor_id", as: "Usuario" });
};

module.exports = Venda;