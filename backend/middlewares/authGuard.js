const User = require("../models/User");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Extrai o token do cabeçalho
  
  // Verifica se o cabeçalho possui o token
  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

  console.log("Hora UTC atual:", new Date().toISOString());
  console.log("Token recebido:", token);

  try {
    // Verifica e decodifica o token
    const verified = jwt.verify(token, jwtSecret);

     // Debugging: visualizando a data de expiração do token
     console.log("Token válido! Expiração:", new Date(verified.exp * 1000).toISOString());

    console.log("Token válido:", verified);

    // Busca o usuário no banco de dados
    req.user = await User.findById(verified.id).select("-password");
    if (!req.user) {
      return res.status(404).json({ errors: ["Usuário não encontrado."] });
    }

    next(); // Continua para a próxima função
  } catch (error) {
    console.log("Erro no token:", error);

    if (error.name === "TokenExpiredError") {
      console.log("Token expirado");
      return res.status(401).json({ errors: ["Token expirado, faça login novamente."] });
    }

    return res.status(400).json({ errors: ["O token é inválido ou ocorreu um problema interno."] });
  }
};

module.exports = authGuard;
