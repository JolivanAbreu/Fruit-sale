const express = require("express");
const Usuario = require("../models/Usuario"); // Importando o model do Sequelize
const router = express.Router();
const SECRET_KEY = "seuSegredoSuperSeguro"; // Troque por variável de ambiente

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
    // Busca o usuário pelo e-mail
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({ error: "Usuário não encontrado." });
    }

    // Verifica a senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ error: "Senha incorreta." });
    }

    // Gera um token JWT
    const token = jwt.sign({ id: usuario.id, perfil: usuario.perfil }, SECRET_KEY, {
      expiresIn: "2h",
    });

    res.json({ message: "Login realizado com sucesso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao realizar login." });
  }
});

module.exports = router;
