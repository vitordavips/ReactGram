//Criando o Controlle do usuario

const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.jwtSecret;

// Gerar token de usuário
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn:"7d",
    });
};

// Registre o usuário e faça login
const register = async(req, res) => {
    res.send("Registro");
};
 
module.exports = {
    register,
}