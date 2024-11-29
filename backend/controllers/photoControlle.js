// Importa o modelo 'Photo' que será usado para interagir com a coleção de fotos no banco de dados
const Photo = require("../models/Photo");

const User = require("../models/User");

// Importa o Mongoose, uma biblioteca que facilita a interação com o MongoDB
const mongoose = require("mongoose");

// Função assíncrona para inserir uma foto, associando-a a um usuário
const insertPhoto = async (req, res) => {
    // Extrai o campo 'title' do corpo da requisição (req.body)
    const { title } = req.body;
    
    // Extrai o nome do arquivo da foto que foi enviado (req.file.filename)
    const image = req.file.filename;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    // create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId:user.id,
        userName:user.name,
    });

    // if photo was created successfully, return data
    if(!newPhoto){
        res.status(422).json({
            errors:["Houve um problema, por favor tente novamente mais tarde."]
        });
    }
    
    res.status(201).json(newPhoto);
};

// Exporta a função 'insertPhoto' para que possa ser utilizada em outras partes do projeto
module.exports = {
    insertPhoto,
};
