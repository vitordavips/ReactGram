// Importa o modelo de usuário do banco de dados
const User = require("../models/User");

// Importa a biblioteca jsonwebtoken para lidar com tokens JWT
const jwt = require("jsonwebtoken");

// Obtém o segredo do JWT das variáveis de ambiente
const jwtSecret = process.env.JWT_SECRET;

// Define o middleware de autenticação
const authGuard = async (req, res, next) => {
    // Obtém o cabeçalho de autorização da requisição (Authorization: Bearer <token>)
    const authHeader = req.headers["authorization"];

    // Extrai o token do cabeçalho, assumindo o formato "Bearer <token>"
    const token = authHeader && authHeader.split(" ")[1];

    // Verifica se o token não está presente; se não, retorna erro 401 (não autorizado)
    if (!token) return res.status(401).json({ erros: ["Acesso negado"] });

    try {
        // Verifica se o token é válido e decodifica os dados do mesmo
        const verified = jwt.verify(token, jwtSecret);

        // Busca o usuário correspondente ao ID presente no token, excluindo o campo "password" da seleção
        req.user = await User.findById(verified.id).select("-password");

        // Se tudo der certo, passa para o próximo middleware ou rota
        next();
    } catch (error) {
        // Se houver algum erro (token inválido ou problema interno), retorna erro 401
        res.status(401).json();
    }
};

// Exporta o middleware para que ele possa ser usado em outras partes do projeto
module.exports = {
    authGuard,
};
