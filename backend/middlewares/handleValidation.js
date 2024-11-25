// Importa a função validationResult da biblioteca express-validator
const { validationResult } = require("express-validator");

// Middleware para validar requisições e lidar com erros
const validate = (req, res, next) => {
    // Obtém os resultados da validação dos dados da requisição
    const errors = validationResult(req);

    // Verifica se não existem erros; se estiver tudo certo, segue para o próximo middleware ou rota
    if (errors.isEmpty()) {
        return next();
    }

    // Cria um array para armazenar as mensagens de erro extraídas
    const extractedErrors = [];

    // Mapeia os erros encontrados e adiciona apenas as mensagens ao array
    errors.array().map((err) => extractedErrors.push(err.msg));

    // Retorna uma resposta com status 422 (Unprocessable Entity) e o array de mensagens de erro
    return res.status(422).json({
        errors: extractedErrors,
    });
};

// Exporta o middleware para ser utilizado em validações no projeto
module.exports = validate;
