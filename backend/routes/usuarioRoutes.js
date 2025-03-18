const express = require("express");
const Usuario = require("../models/Usuario");
const router = express.Router();
const SECRET_KEY = "seuSegredoSuperSeguro";

// Criar um usuário (Administrador ou Vendedor)
router.post("/", async (req, res) => {
  const { nome, email, senha, perfil } = req.body;

  if (!nome || !email || !senha || !perfil) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    // Verifica se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    // Cria o usuário
    await Usuario.create({
      nome,
      email,
      senha,
      perfil
    });

    res.json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
});

// Login do usuário
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
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

    res.json({
      message: "Login realizado com sucesso",
      token,
      perfil: usuario.perfil
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao realizar login." });
  }
});


// Listar todos os usuários
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar usuários." });
  }
});

module.exports = router;
