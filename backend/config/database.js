const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("venda_frutas", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
