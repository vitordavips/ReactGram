const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
// const generateToken = (id) => {
//   const now = new Date(); // hora atual UTC do servidor
//   console.log('hora atual', now.toISOString());
//   return jwt.sign({ id }, jwtSecret, {expiresIn:'7d'})
// }

const generateToken = (id) => {
  const now = new Date(); // hora atual UTC do servidor
  console.log('hora atual', now.toISOString());
  return token = jwt.sign({ id }, jwtSecret, {
    expiresIn: '7d',
  });
  console.log("Token login",token);
};



// Função para registrar um novo usuário e fazer login automático
const register = async (req, res) => {
  const { name, email, password } = req.body; // Extrai os dados do corpo da requisição

  // Verifica se o usuário com o mesmo e-mail já existe
  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ errors: ["Por favor, utilize outro e-mail."] });
    return;
  }

  // Gera um hash da senha para armazenar no banco de dados
  const salt = await bcrypt.genSalt(); // Gera um salt aleatório
  const passwordHash = await bcrypt.hash(password, salt); // Cria o hash da senha

  // Cria um novo usuário no banco de dados
  const newUser = await User.create({
    name,
    email,
    password: passwordHash, // Armazena a senha já criptografada
  });

  // Verifica se o usuário foi criado com sucesso
  if (!newUser) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  // Retorna o ID do usuário e um token JWT como resposta
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id)
  })
};



// Função para obter o usuário atualmente logado
const getCurrentUser = async (req, res) => {
  const user = req.user; // Obtém o usuário do objeto de requisição (adicionado pelo middleware de autenticação)
  res.status(200).json(user); // Retorna o usuário como resposta
};

// Função para fazer login do usuário
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check if user exists
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] });
    return;
  }

  // Check if password matches
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha inválida!"] });
    return;
  }

  // Return user with token
  res.status(200).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};



// Função para atualizar o perfil do usuário autenticado
const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;

  const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select(
    "-password"
  );

  if (name) {
    user.name = name;
  }

  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(200).json(user);
};

// Função para obter um usuário específico pelo ID
const getUserById = async (req, res) => {
  const { id } = req.params; // Obtém o ID do usuário dos parâmetros da URL

  // Busca o usuário no banco de dados pelo ID, omitindo a senha
  const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-password");
  
  //const user = await User.findById(mongoose.Types.ObjectId(id)).select("-password");

  // Verifica se o usuário foi encontrado
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] });
    return;
  }

  // Retorna o usuário como resposta
  res.status(200).json(user);
};

// Exporta as funções para serem usadas em rotas ou outros arquivos do projeto
module.exports = {
  register,
  getCurrentUser,
  login,
  update,
  getUserById,
};
