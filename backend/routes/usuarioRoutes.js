const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY || "Jolivan";

const gerarToken = (id, perfil) => {
  return jwt.sign({ id, perfil }, SECRET_KEY, { expiresIn: "1h" });
};

const validarCampos = (req, res, next) => {
  const { nome, email, senha, perfil } = req.body;
  if (!nome || !email || !senha || !perfil) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }
  next();
};

// CADASTRO DE USUÁRIO
router.post("/", validarCampos, async (req, res) => {
  const { nome, email, senha, perfil } = req.body;
  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    await Usuario.create({ nome, email, senha: senhaHash, perfil });
    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar usuário." });
  }
});
// CADASTRO DE USUÁRIO

// LOGIN DE USUÁRIO
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios para o login." });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ error: "Usuário não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ error: "Senha incorreta." });
    }

    const token = gerarToken(usuario.id, usuario.perfil);
    res.json({ message: "Login realizado com sucesso", token, perfil: usuario.perfil });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao realizar login." });
  }
});
// LOGIN DE USUÁRIO

// LISTAGEM DE USUÁRIOS
/* router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar usuários." });
  }
}); */
// LISTAGEM DE USUÁRIO


// BUSCA DE VENDEDORES
router.get("/vendedores", async (req, res) => {
  try {
    const vendedores = await Usuario.findAll({ where: { perfil: "Vendedor" } });

    console.log("Vendedores encontrados:", vendedores);

    if (vendedores.length === 0) {
      return res.status(404).json({ error: "Nenhum vendedor encontrado." });
    }

    res.json(vendedores);
  } catch (error) {
    console.error("Erro ao buscar vendedores:", error);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

module.exports = router;
