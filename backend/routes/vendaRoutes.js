const express = require("express");
const router = express.Router();
const Fruta = require("../models/Fruta");
const Venda = require("../models/Venda");
const Usuario = require("../models/Usuario");

// Registrar uma venda
router.post("/", async (req, res) => {
  try {
    const { vendedor_id, valor_total } = req.body;

    if (!vendedor_id || !valor_total) {
      return res.status(400).json({ error: "Campos vendedor_id e valor_total são obrigatórios" });
    }

    const novaVenda = await Venda.create({ vendedor_id, valor_total });
    res.status(201).json(novaVenda);
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar a venda", detalhes: error.message });
  }
});

// Listar todas as vendas
router.get("/", async (req, res) => {
  try {
    const vendas = await Venda.findAll();
    res.json(vendas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar vendas", detalhes: error.message });
  }
});

// Registrar venda
router.post("/vendas", async (req, res) => {
  try {
    const { frutaId, quantidade, desconto, valor_total, vendedor_id } = req.body;

    if (!vendedor_id || !valor_total) {
      return res.status(400).json({ error: "Campos vendedor_id e valor_total são obrigatórios." });
    }

    const fruta = await Fruta.findByPk(frutaId);
    const vendedor = await Usuario.findByPk(vendedor_id);

    if (!fruta) {
      return res.status(404).json({ error: "Fruta não encontrada." });
    }

    if (!vendedor || vendedor.perfil !== "Vendedor") {
      return res.status(400).json({ error: "Vendedor inválido." });
    }

    if (fruta.quantidade < quantidade) {
      return res.status(400).json({ error: "Estoque insuficiente." });
    }

    // Atualizar estoque
    fruta.quantidade -= quantidade;
    await fruta.save();

    // Registrar venda no banco
    await Venda.create({
      frutaId,
      quantidade,
      desconto,
      valor_total,
      vendedor_id
    });

    res.json({ message: "Venda realizada com sucesso!", frutaAtualizada: fruta });
  } catch (error) {
    console.error("Erro ao registrar venda:", error);
    res.status(500).json({ error: "Erro ao registrar venda." });
  }
});

module.exports = router;
