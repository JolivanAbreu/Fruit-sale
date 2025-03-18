const express = require("express");

const router = express.Router();

// Importação das rotas individuais
const frutaRoutes = require("./frutaRoutes");
const usuarioRoutes = require("./usuarioRoutes");
const vendaRoutes = require("./vendaRoutes");

router.use("/frutas", frutaRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/vendas", vendaRoutes);

module.exports = router;
