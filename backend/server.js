require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const routes = require("./routes");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);
app.use("/usuarios", usuarioRoutes);
//app.use("/vendedores", usuarioRoutes);

app.get("/", (req, res) => {
    res.send("API de Vendas de Frutas funcionando!");
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("✅ Banco de dados conectado!");

        await sequelize.sync({ force: false });
        console.log("✅ Banco de dados sincronizado!");

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados:", error);
        process.exit(1);
    }
}

startServer();
