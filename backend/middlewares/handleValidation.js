// Importa a função 'validationResult' do pacote 'express-validator'
// 'validationResult' é usada para coletar os resultados das validações realizadas
const { validationResult } = require("express-validator");

// Define um middleware de validação chamado 'validate'
const validate = (req, res, next) => {
  // Obtém o resultado das validações realizadas no 'req' (requisição)
  const errors = validationResult(req);

  // Verifica se não há erros de validação
  if (errors.isEmpty()) {
    // Se não houver erros, passa para o próximo middleware ou rota
    return next();
  }

  // Cria um array para armazenar as mensagens de erro extraídas
  const extractedErrors = [];

  // Percorre o array de erros e extrai as mensagens de erro
  errors.array().map((err) => extractedErrors.push(err.msg));

  // Retorna uma resposta com status 422 (Unprocessable Entity) e um objeto com as mensagens de erro
  return res.status(422).json({
    errors: extractedErrors,
  });
};

// Exporta o middleware 'validate' para ser utilizado em rotas ou controllers
module.exports = validate;
