const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "",
    database: "venda_frutas",
    logging: false
});

module.exports = sequelize;