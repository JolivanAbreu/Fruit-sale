const express = require("express");
const router = express.Router();
const Fruta = require("../models/Fruta");

router.get("/", async (req, res) => {
  try {
    const frutas = await Fruta.findAll();
    res.json(frutas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar frutas" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome, classificacao, fresca, quantidade, valor } = req.body;
    const novaFruta = await Fruta.create({ nome, classificacao, fresca, quantidade, valor });
    res.json(novaFruta);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar fruta" });
  }
});

module.exports = router;
