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

router.post("/vendas", async (req, res) => {
  try {
    const { frutaId, quantidade, desconto } = req.body;
    const fruta = await Fruta.findByPk(frutaId);

    if (!fruta) {
      return res.status(404).json({ error: "Lamento, fruta não encontrada." });
    }

    if (fruta.quantidade < quantidade) {
      return res.status(400).json({ error: "Estoque insuficiente." });
    }

    fruta.quantidade -= quantidade;
    await fruta.save();

    res.json({ message: "Venda realizada com sucesso!", frutaAtualizada: fruta });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar venda." });
  }
});

/* router.put("/:id", async (req, res) => {
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
}); */

/* router.delete("/:id", async (req, res) => {
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
}); */


module.exports = router;
