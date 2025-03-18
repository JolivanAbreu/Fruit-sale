require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("API de Vendas de Frutas funcionando!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Conexão com o banco de dados
sequelize.authenticate()
    .then(() => console.log("Banco de dados conectado!"))
    .catch((err) => console.error("Erro ao conectar:", err));

// Sincronização do banco de dados
sequelize.sync({ force: false })
    .then(() => console.log("Banco de dados sincronizado!"))
    .catch((err) => console.error("Erro ao sincronizar o banco:", err));
