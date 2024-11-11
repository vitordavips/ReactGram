const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async(req, res, next) => {
    const authHeader = req.authHeader["authorization"];
    // Extrai o token do cabeçalho de autorização.
    const token = authHeader && authHeader.split(" ")[1];

    //verifique se o cabeçalho possui um token
    if(!token) return res.status(401).json({erros: ["Acesso negado"]})

    // verifique se o token é válido
    try {
        //verifica se o token combina com o jwtsecret
        const verified = jwt.verify(token, jwtScret)

        //verifica se o user existe
        req.user = await User.findById(verified.id).select("-password")

        next()
    } catch (error) {
        res.status(401).json()
    }
}