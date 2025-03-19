const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "venda_frutas",
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true,
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados estabelecida.");
    })
    .catch((err) => {
        console.error("Erro ao conectar ao banco de dados:", err);
    });

module.exports = sequelize;