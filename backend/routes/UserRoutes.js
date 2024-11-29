// Importa o módulo Express para criar um roteador
const express = require("express");

// Cria uma instância do roteador do Express para definir rotas
const router = express.Router();

// Importa as funções do controlador de usuários, responsáveis pela lógica das operações
const {
  register,            // Função para registrar um novo usuário
  getCurrentUser,      // Função para obter o usuário atualmente autenticado
  login,               // Função para fazer login do usuário
  update,              // Função para atualizar informações do usuário
  getUserById          // Função para obter informações de um usuário pelo ID
} = require("../controllers/useController.js");

// Importa middlewares para validação e autenticação
const validate = require("../middlewares/handleValidation.js"); // Middleware que valida os dados da requisição

const {
  userCreateValidation,  // Validação para criação de usuário
  loginValidation,       // Validação para login
  userUpdateValidation   // Validação para atualização de usuário
} = require("../middlewares/userValidation.js");

const authGuard = require("../middlewares/authGuard"); // Middleware de autenticação para proteger rotas
const { imageUpload }   = require("../middlewares/imageUpload.js"); // Middleware para upload de imagens

// Define as rotas e associa cada uma delas a um controlador e middlewares específicos

// Rota para registrar um novo usuário
// Aplica validação dos dados do usuário e, se válidos, chama a função 'register' do controlador
router.post("/register", userCreateValidation(), validate, register);

// Rota para obter o perfil do usuário autenticado
// Utiliza 'authGuard' para garantir que o usuário está autenticado antes de acessar esta rota
router.get("/profile", authGuard, getCurrentUser);

// Rota para login do usuário
// Aplica validação dos dados do login e, se válidos, chama a função 'login' do controlador
router.post("/login", loginValidation(), validate, login);

// Rota para atualizar o perfil do usuário autenticado
// Aplica middlewares para autenticação, validação dos dados e upload de imagem, se fornecida
router.put(
  "/",                                      // Rota raiz para atualização
  authGuard,                                // Middleware de autenticação
  userUpdateValidation(),                   // Middleware de validação dos dados de atualização
  validate,                                 // Middleware que verifica o resultado da validação
  imageUpload.single("profileImage"),       // Middleware para fazer o upload de uma imagem de perfil
  update                                    // Função do controlador que atualiza os dados do usuário
);

// Rota para obter informações de um usuário específico pelo ID
router.get("/:id", getUserById);

// Exporta o roteador para ser utilizado em outros arquivos, como 'app.js' ou 'server.js'
module.exports = router;
