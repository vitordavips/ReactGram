// lidando com erros
const {validationResult} = require("express-validator")

const validate = (req, res, next) => {
    const errors = validationResult(req);

    // verificar se os erros estão vazios
    if(errors.isEmpty()){
        return next()
    }

    // coletando os erros
    const extractedErros = []

    errors.array().map((err) => extractedErros.push(err.msg))

    return res.status(422).json({
        errors: extractedErros,
    });
};

module.exports = validate;