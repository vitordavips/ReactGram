// Importa o modelo de usuário do MongoDB
const User = require("../models/User");

// Importa as bibliotecas para criptografia de senhas e geração de tokens JWT
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Importa o Mongoose para trabalhar com o banco de dados MongoDB
const mongoose = require("mongoose");

// Define a variável de ambiente para o segredo JWT
const jwtSecret = process.env.JWT_SECRET;

// Função para gerar um token JWT a partir do ID do usuário
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d", // O token expira em 7 dias
    });
};

// Função para registrar um novo usuário
const register = async (req, res) => {
    // Extrai os dados do corpo da requisição
    const { name, email, password } = req.body;

    // Verifica se o usuário já existe no banco de dados pelo e-mail
    const user = await User.findOne({ email });

    // Se o usuário já existir, retorna um erro
    if (user) {
        res.status(442).json({ errors: ["Por favor, utilize outro e-mail"] });
        return;
    }

    // Gera um hash para a senha do usuário
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Cria um novo usuário no banco de dados com os dados fornecidos
    const newUser = await User.create({
        name,
        email,
        password: passwordHash, // Armazena a senha criptografada
    });

    // Se o usuário não for criado corretamente, retorna um erro
    if (!newUser) {
        res.status(422).json({ errors: ["Houve um erro, por favor tente mais tarde."] });
        return;
    }

    // Se o usuário foi criado com sucesso, retorna o token JWT
    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });
};

// Função para login do usuário
const login = async (req, res) => {
    // Extrai os dados do corpo da requisição
    const { email, password } = req.body;

    // Procura o usuário pelo e-mail no banco de dados
    const user = await User.findOne({ email });

    // Se o usuário não for encontrado, retorna um erro
    if (!user) {
        res.status(404).json({ erros: ["Usuário não encontrado."] });
        return;
    }

    // Compara a senha fornecida com a senha criptografada no banco de dados
    if (!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({ erros: ["Senha inválida."] });
        return;
    }

    // Se a senha for válida, retorna o token JWT e os dados do usuário
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage, // Imagem do perfil (se existir)
        token: generateToken(user._id),
    });
};

// Função para obter os dados do usuário atualmente autenticado
const getCurrentUser = async (req, res) => {
    const user = req.user; // Obtém os dados do usuário do middleware de autenticação
    res.status(200).json(user); // Retorna os dados do usuário
};

// Função para atualizar os dados de um usuário
const update = async (req, res) => {
    // Extrai os dados do corpo da requisição
    const { name, password, bio } = req.body;

    let profileImage = null;

    // Verifica se há um arquivo de imagem na requisição
    if (req.file) {
        profileImage = req.file.filename; // Salva o nome do arquivo da imagem
    }

    // Obtém os dados do usuário autenticado
    const reqUser = req.user;

    // Busca o usuário no banco de dados pelo ID e exclui a senha da consulta
    const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select("-password");

    // Atualiza o nome, se fornecido
    if (name) {
        user.name = name;
    }

    // Atualiza a senha, se fornecida, após criptografar
    if (password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        user.password = passwordHash;
    }

    // Atualiza a imagem do perfil, se fornecida
    if (profileImage) {
        user.profileImage = profileImage;
    }

    // Atualiza a biografia, se fornecida
    if (bio) {
        user.bio = bio;
    }

    // Salva as alterações no banco de dados
    await user.save();

    // Retorna os dados atualizados do usuário
    res.status(200).json(user);
};

// Get user by id
const getUserById = async(req, res) => {
    const {id} = req.params

    try {
        const user = await User.findById(mongoose.Types.ObjectId(id)).select("-password")

        // check if user exist
        if(!user) {
        res.status(404).json({errors:["Usuário não encontrado."]})
        return;
        };
    } catch (error) {
        res.status(404).json({errors:["Usuário não encontrado."]})
        return;
        
    }

    res.status(200).json(user)
};

// Exporta as funções do controller para serem utilizadas em outras partes do projeto
module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
};
