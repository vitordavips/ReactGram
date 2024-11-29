// Importa o módulo Express, que é um framework para criar servidores em Node.js
const express = require("express");

// Cria uma nova instância do roteador do Express
const router = express();

// Define o uso de rotas específicas para a URL "/api/users"
// Importa e aplica o arquivo 'UserRoutes' que contém as rotas relacionadas aos usuários
router.use("/api/users", require("./UserRoutes"));

// Define o uso de rotas específicas para a URL "/api/photos"
// Importa e aplica o arquivo 'PhotosRoutes' que contém as rotas relacionadas às fotos
router.use("/api/photos", require("./PhotosRoutes"));

// Define uma rota de teste na raiz do servidor ("/")
// Quando alguém acessar a raiz do servidor, a resposta será "API Working!"
router.get("/", (req, res) => {
    res.send("API Working!");
});

// Exporta o roteador para ser usado em outros arquivos (como em 'app.js' ou 'server.js')
module.exports = router;
