const express = require("express");
const router = express.Router();

// Lista todas as frutas
router.get("/", (req, res) => {
  res.json({ message: "Listar todas as frutas" });
});

// Adicionar uma nova fruta
router.post("/", (req, res) => {
  res.json({ message: "Fruta adicionada com sucesso" });
});

// Atualizar uma fruta
router.put("/:id", (req, res) => {
  res.json({ message: `Fruta ID ${req.params.id} atualizada` });
});

// Deletar uma fruta
router.delete("/:id", (req, res) => {
  res.json({ message: `Fruta ID ${req.params.id} deletada` });
});

module.exports = router;
