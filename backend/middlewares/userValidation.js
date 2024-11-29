// Importa a função 'body' do pacote 'express-validator' para validar os campos da requisição
const { body } = require("express-validator");

// Validação para criação de usuário
const userCreateValidation = () => {
  return [
    // Validação do campo 'name'
    body("name")
      .isString() // Verifica se o valor é uma string
      .withMessage("O nome é obrigatório.") // Mensagem de erro se não for string
      .isLength({ min: 3 }) // Verifica se o comprimento tem no mínimo 3 caracteres
      .withMessage("O nome precisa ter no mínimo 3 caracteres."), // Mensagem de erro
    
    // Validação do campo 'email'
    body("email")
      .isString() // Verifica se o valor é uma string
      .withMessage("O e-mail é obrigatório.") // Mensagem de erro se não for string
      .isEmail() // Verifica se o valor é um e-mail válido
      .withMessage("Insira um e-mail válido"), // Mensagem de erro
    
    // Validação do campo 'password'
    body("password")
      .isString() // Verifica se o valor é uma string
      .withMessage("A senha é obrigatória.") // Mensagem de erro se não for string
      .isLength({ min: 5 }) // Verifica se a senha tem no mínimo 5 caracteres
      .withMessage("A senha precisa de no mínimo 5 caracteres."), // Mensagem de erro
    
    // Validação do campo 'confirmPassword'
    body("confirmPassword")
      .isString() // Verifica se o valor é uma string
      .withMessage("A confirmação de senha é obrigatória.") // Mensagem de erro
      .custom((value, { req }) => { // Validação customizada
        if (value != req.body.password) { // Verifica se 'confirmPassword' é igual a 'password'
          throw new Error("As senhas não são iguais."); // Mensagem de erro se forem diferentes
        }
        return true; // Validação bem-sucedida
      }),
  ];
};

// Validação para login de usuário
const loginValidation = () => {
  return [
    // Validação do campo 'email'
    body("email")
      .isString() // Verifica se o valor é uma string
      .withMessage("O e-mail é obrigatório.") // Mensagem de erro
      .isEmail() // Verifica se o valor é um e-mail válido
      .withMessage("Insira um e-mail válido"), // Mensagem de erro
    
    // Validação do campo 'password'
    body("password")
      .isString() // Verifica se o valor é uma string
      .withMessage("A senha é obrigatória."), // Mensagem de erro
  ];
};

// Validação para atualização de usuário
const userUpdateValidation = () => {
  return [
    // Validação opcional do campo 'name'
    body("name")
      .optional() // O campo 'name' é opcional na atualização
      .isLength({ min: 3 }) // Verifica se tem no mínimo 3 caracteres, se fornecido
      .withMessage("O nome precisa ter no mínimo 3 caracteres."), // Mensagem de erro
    
    // Validação opcional do campo 'password'
    body("password")
      .optional() // O campo 'password' é opcional na atualização
      .isLength({ min: 5 }) // Verifica se tem no mínimo 5 caracteres, se fornecido
      .withMessage("A senha precisa de no mínimo 5 caracteres."), // Mensagem de erro
  ];
};

// Exporta as funções de validação para serem usadas em rotas ou controllers
module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
};
