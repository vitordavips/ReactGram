const User = require("../models/User");

const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Check if header has a token
  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

  console.log("token recebido", token);
  console.log("horário do servidor:", new Date())

  // Check if token is valid
  try {
    const verified = jwt.verify(token, jwtSecret);

    req.user = await User.findByPk(verified.id).select("-password");
   
    console.log("token valido:", verified);
   
    next();
  } catch (errors) {
    console.log(errors)

    if(err.name === "TokenExpiredError"){
      console.log("token expirado");

      return res.status(401).json({message:"token expirado, faça login novamente."})
    }

    res.status(400).json({ errors: ["O Token é inválido!"] });
  }
};

module.exports = authGuard;
