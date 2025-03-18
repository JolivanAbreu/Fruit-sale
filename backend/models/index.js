const sequelize = require("../config/database");
const Usuario = require("./Usuario");
const Fruta = require("./Fruta");
const Venda = require("./Venda");
const ItemVenda = require("./ItemVenda");

// Relacionamentos
Usuario.hasMany(Venda, { foreignKey: "usuarioId" });
Venda.belongsTo(Usuario, { foreignKey: "usuarioId" });

Venda.hasMany(ItemVenda, { foreignKey: "vendaId" });
ItemVenda.belongsTo(Venda, { foreignKey: "vendaId" });

Fruta.hasMany(ItemVenda, { foreignKey: "frutaId" });
ItemVenda.belongsTo(Fruta, { foreignKey: "frutaId" });

module.exports = { sequelize, Usuario, Fruta, Venda, ItemVenda };
