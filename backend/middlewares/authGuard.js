// Importa o modelo 'User' para interagir com os dados dos usuários no banco de dados
const User = require("../models/User");

// Importa o módulo 'jsonwebtoken' para criar e verificar tokens JWT (JSON Web Tokens)
const jwt = require("jsonwebtoken");

// Obtém a chave secreta para assinar e verificar tokens JWT a partir das variáveis de ambiente
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  // onter o cabeçalho de autorização
  const authHeader = req.headers["authorization"];
  console.log("headers recebidos:", req.headers);

  // extrai o token
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token recebido", token);

  if(!token){
    console.log("erro: token não enviado");
    return res.statu(401).json({errors: ["Acesso negado!"]});
  }

  try {
    // tenta verificar o token
    const verified = jwt.verify(token, jwtSecret);
    console.log("Token verificado:", verified);

    // verificar se o usuário foi encontrado
    if(!req.user){
      console.log("erro: usuário não encontraod");
      return res.status(404).json({errors: ["usuário não encontrado"]})
    }

    jwt.verify(token, jwtSecret, {leeway:60}, (error, decoded) => {
      if (error){
        return res.status(401).json({message: 'token expirado ou inválido'});
      }
      req.user = decoded;
    });


    next();
  } catch (error) {
    console.log("erro ao varificar o token", error);

    // Erro de token expirado
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ errors: ["Token expirado! Faça login novamente."] });
    }

    //erro genérico de token
    res.status(400).json({errors:["O token é inválido"]})
  }
};


// Exporta o middleware 'authGuard' para ser utilizado em rotas protegidas
module.exports = authGuard;
