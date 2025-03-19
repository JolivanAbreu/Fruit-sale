const express = require("express");
const router = express.Router();
const Fruta = require("../models/Fruta");
const Venda = require("../models/Venda");
const Usuario = require("../models/Usuario");
const ItensVenda = require("../models/ItensVenda");
const sequelize = require("../config/database");

router.post("/registro", async (req, res) => {
  try {
    console.log("Dados recebidos no backend:", req.body);
    console.log("Vendedor ID recebido:", req.body.vendedor_id);

    const { frutaId, quantidade, desconto, valor_total, vendedor_id } = req.body;

    if (!vendedor_id || isNaN(vendedor_id) || !valor_total || !frutaId || !quantidade) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const fruta = await Fruta.findByPk(frutaId);
    if (!fruta) {
      return res.status(404).json({ error: "Fruta não encontrada." });
    }

    const vendedor = await Usuario.findByPk(vendedor_id);
    if (!vendedor) {
      console.log("Vendedor não encontrado para o ID:", vendedor_id);
      return res.status(400).json({ error: "Vendedor não encontrado." });
    }

    if (vendedor.perfil !== "Vendedor") {
      return res.status(400).json({ error: "O usuário selecionado não é um vendedor." });
    }

    if (fruta.quantidade < quantidade) {
      return res.status(400).json({ error: "Estoque insuficiente." });
    }

    const transaction = await sequelize.transaction();

    try {
      fruta.quantidade -= quantidade;
      await fruta.save({ transaction });

      const venda = await Venda.create({
        vendedor_id,
        valor_total,
        data_hora: new Date()
      }, { transaction });

      await ItensVenda.create({
        venda_id: venda.id,
        fruta_id: frutaId,
        quantidade,
        preco_unitario: fruta.valor,
        desconto
      }, { transaction });

      await transaction.commit();

      res.json({ message: "Venda realizada com sucesso!", venda });
    } catch (error) {

      await transaction.rollback();
      console.error("Erro durante a transação:", error);
      throw error;
    }
  } catch (error) {
    console.error("Erro ao registrar venda:", error);
    res.status(500).json({ error: "Erro ao registrar venda.", detalhes: error.message });
  }
});

router.get("/listar", async (req, res) => {
  try {
    const vendas = await Venda.findAll({
  include: [
    {
      model: ItensVenda,
      as: "ItensVenda",
      include: [{ model: Fruta, as: "Fruta", attributes: ["nome"] }],
    },
    {
      model: Usuario,
      as: "Usuario",
      attributes: ["nome"],
    },
  ],
  order: [["data_hora", "DESC"]],
});

    const vendasFormatadas = vendas.map((venda) => {
      const itemVenda = venda.ItensVenda?.length ? venda.ItensVenda[0] : null;
      return {
        id: venda.id,
        fruta: itemVenda ? itemVenda.Fruta?.nome || "N/A" : "N/A",
        quantidade: itemVenda ? itemVenda.quantidade : 0,
        desconto: itemVenda ? itemVenda.desconto : 0,
        valor_final: venda.valor_total,
        data_hora: venda.data_hora,
      };
    });

    res.json(vendasFormatadas);
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
    res.status(500).json({ error: "Erro ao buscar vendas.", detalhes: error.message });
  }
});


module.exports = router;