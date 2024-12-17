// Importa o modelo 'User' para interagir com os dados dos usuários no banco de dados
const User = require("../models/User");

// Importa o módulo 'jsonwebtoken' para criar e verificar tokens JWT (JSON Web Tokens)
const jwt = require("jsonwebtoken");

// Obtém a chave secreta para assinar e verificar tokens JWT a partir das variáveis de ambiente
const jwtSecret = process.env.JWT_SECRET;

// Define um middleware de autenticação chamado 'authGuard'
const authGuard = async (req, res, next) => {
  // Obtém o cabeçalho 'authorization' da requisição (normalmente no formato 'Bearer TOKEN')
  const authHeader = req.headers["authorization"];
  
  // Extrai o token do cabeçalho, se ele existir
  const token = authHeader && authHeader.split(" ")[1];

  // Verifica se o token foi fornecido no cabeçalho
  if (!token) {
    // Se não houver token, retorna uma resposta de erro 401 (Não autorizado)
    return res.status(401).json({ errors: ["Acesso negado!"] });
  }

  // Tenta verificar se o token é válido
  try {
    // Verifica o token usando a chave secreta e retorna o payload decodificado
    const verified = jwt.verify(token, jwtSecret);
    //console.log("Token verificado:", verified);

    // Busca o usuário no banco de dados pelo ID contido no token verificado
    // Utiliza 'select' para excluir o campo 'password' dos dados retornados
    req.user = await User.findById(verified.id).select("-password");
    
    if(!req.user){
      return res.status(404).json({errors: ["Usuário não encontrado!"]})
    }

    

    // Se tudo estiver correto, chama a próxima função middleware ou rota
    next();
  } catch (err) {

    console.log(err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ errors: ["Token expirado! Faça login novamente."] });
    }
    
    // Se a verificação do token falhar, retorna uma resposta de erro 400 (Requisição inválida)
    res.status(400).json({ errors: ["O Token é inválido!"] });
  }

  console.log("Usuário autenticado", req.user);
};

// Exporta o middleware 'authGuard' para ser utilizado em rotas protegidas
module.exports = authGuard;
