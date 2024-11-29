// Importa o modelo 'User', que representa os dados do usuário no banco de dados MongoDB
const User = require("../models/User");

// Importa a biblioteca 'bcryptjs' para realizar o hash de senhas
const bcrypt = require("bcryptjs");

// Importa a biblioteca 'jsonwebtoken' para gerar e verificar tokens JWT
const jwt = require("jsonwebtoken");

// Importa a instância padrão do Mongoose para manipulação de dados no MongoDB
const { default: mongoose } = require("mongoose");

// Obtém a chave secreta JWT do arquivo de ambiente (.env)
const jwtSecret = process.env.JWT_SECRET;

// Função para gerar um token JWT com base no ID do usuário
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d", // Token expira em 7 dias
  });
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
    token: generateToken(newUser._id), // Gera um token JWT para o usuário
  });
};

// Função para obter o usuário atualmente logado
const getCurrentUser = async (req, res) => {
  const user = req.user; // Obtém o usuário do objeto de requisição (adicionado pelo middleware de autenticação)
  res.status(200).json(user); // Retorna o usuário como resposta
};

// Função para fazer login do usuário
const login = async (req, res) => {
  const { email, password } = req.body; // Extrai o e-mail e a senha do corpo da requisição

  const user = await User.findOne({ email }); // Busca o usuário pelo e-mail no banco de dados

  // Verifica se o usuário existe
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] });
    return;
  }

  // Verifica se a senha fornecida corresponde à senha armazenada (hash)
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha inválida!"] });
    return;
  }

  // Retorna o ID, imagem de perfil e token JWT do usuário como resposta
  res.status(200).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// Função para atualizar o perfil do usuário autenticado
const update = async (req, res) => {
  const { name, password, bio } = req.body; // Extrai os dados do corpo da requisição

  let profileImage = null;

  // Verifica se há uma imagem de perfil na requisição
  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user; // Obtém o usuário autenticado da requisição

  // Busca o usuário no banco de dados pelo ID, omitindo a senha na resposta
  const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select(
    "-password"
  );

  // Atualiza o nome, se fornecido
  if (name) {
    user.name = name;
  }

  // Atualiza a senha, se fornecida
  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;
  }

  // Atualiza a imagem de perfil, se fornecida
  if (profileImage) {
    user.profileImage = profileImage;
  }

  // Atualiza a biografia, se fornecida
  if (bio) {
    user.bio = bio;
  }

  // Salva as alterações no banco de dados
  await user.save();

  // Retorna o usuário atualizado
  res.status(200).json(user);
};

// Função para obter um usuário específico pelo ID
const getUserById = async (req, res) => {
  const { id } = req.params; // Obtém o ID do usuário dos parâmetros da URL

  // Busca o usuário no banco de dados pelo ID, omitindo a senha
  const user = await User.findById(mongoose.Types.ObjectId(id)).select(
    "-password"
  );

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
