// criando a validação do user
const {body} = require("express-validator");

const userCreateValidation = () => {
    return [body("name").isString().withMessage("O nome é obrigatorio.")];
};

module.exports = {
    userCreateValidation,
};