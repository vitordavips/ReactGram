//Criando o Controlle do usuario

const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

 
const jwtSecret = process.env.JWT_SECRET;

// Gerar token de usuário
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn:"7d",
    });
};

// Registre o usuário e faça login
const register = async(req, res) => {
    const {name, email, password} = req.body

    //check se o usuário existe
    const user = await User.findOne({email})
    
    if(user) {
        res.status(442).json({errors:["Por favor, utilize outro e-mail"]})
        return
    }

    // Generated password hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    // If user was created successfully, return the token
    if(!newUser){
        res.status(422).json({errors:["houve um erro, por favor tente mais tarde."]});
        return;
    };

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    });
};

// Sign user in
const login = async(req, res) => {
    
    const {email, password} = req.body;

    const user = await User.findOne({email});

    //check se o user existe
    if(!user){
        res.status(404).json({erros: ["Usuário não encontrado."]})
        return
    };

    //verificando se a senha corresponde
    if(!(await bcrypt.compare(password, user.password))){
        res.status(422).json({erros:["Senha inválida."]})
        return
    };

    //Retornar usuário com token
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    });
};

// Obtenha o usuário logado atual
const getCurrentUser = async (req,res) =>{
    const user = req.user;

    res.status(200).json(user);
};

// update an user
const update = async(req, res) => {
    const {name, password, bio} = req.body;

    let profileImage = null

    // verifica se tem um arquivo na requisição
    if(req.file){
        profileImage = req.file.filename
    }

    const reqUser = req.user

    const user = await User.findById(mongoose.Type.ObjectId(reqUser._id)).select("-password")

    if(name){
        user.name = name
    };

    if(password){
         // Generated password hash
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        user.password = passwordHash
    };

    if(profileImage){
        user.profileImage = profileImage
    };

    if(bio){
        user.bio = bio
    }

    await user.save();

    res.status(200).json(user);
};
  
module.exports = {
    register,
    login,
    getCurrentUser,
    update
};