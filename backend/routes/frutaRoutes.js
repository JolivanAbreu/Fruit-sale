const express = require("express");
const router = express.Router();
const Fruta = require("../models/Fruta");

// Lista todas as frutas
router.get("/", async (req, res) => {
  try {
    const frutas = await Fruta.findAll();
    res.json(frutas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar frutas" });
  }
});

// Adicionar uma nova fruta
router.post("/", async (req, res) => {
  try {
    const { nome, classificacao, fresca, quantidade, valor } = req.body;
    const novaFruta = await Fruta.create({ nome, classificacao, fresca, quantidade, valor });
    res.json(novaFruta);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar fruta" });
  }
});

// Atualizar uma fruta
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, classificacao, fresca, quantidade, valor } = req.body;
    const fruta = await Fruta.findByPk(id);
    
    if (!fruta) {
      return res.status(404).json({ error: "Fruta não encontrada" });
    }

    await fruta.update({ nome, classificacao, fresca, quantidade, valor });
    res.json({ message: `Fruta ID ${id} atualizada com sucesso` });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar fruta" });
  }
});

// Deletar uma fruta
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fruta = await Fruta.findByPk(id);

    if (!fruta) {
      return res.status(404).json({ error: "Fruta não encontrada" });
    }

    await fruta.destroy();
    res.json({ message: `Fruta ID ${id} deletada com sucesso` });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar fruta" });
  }
});

module.exports = router;
