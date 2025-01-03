const {body} = require("express-validator");

const photoInsertValidation = () => {
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("O título é obrigatório.")
            .isString()
            .withMessage("O título precisa ter no mínimo 3 caracteres.")
            .isLength({min: 3})
            .withMessage("O título é obrigatório."),
        body("image").custom((value, {req}) => {
            if(!req.file){
                throw new Error("A imagem é obrigatoria.")
            }
            return true;
        }),
    ];
};

module.exports = {
    photoInsertValidation,
}