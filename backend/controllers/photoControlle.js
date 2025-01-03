// Importa o modelo 'Photo' que será usado para interagir com a coleção de fotos no banco de dados
const Photo = require("../models/Photo");

const User = require("../models/User");

// Importa o Mongoose, uma biblioteca que facilita a interação com o MongoDB
const mongoose = require("mongoose");

// Função assíncrona para inserir uma foto, associando-a a um usuário
const insertPhoto = async (req, res) => {
    const { title } = req.body;

    const image = req.file.filename;

    //console.log(req.body);

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    console.log(user.name);

    // create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    });

    // If user was photo sucessfully, return data
    if(!newPhoto) {
        res.status(422).json({
            errors:["Houve um erro, por favor tente novamente mais tarde."],
        });
        return;
    }

    res.status(201).json(newPhoto);
};

// Remove a photo from DB
const deletePhoto = async (req, res) => {
   const { id } = req.params;

   const reqUser = req.user;

   try {        
        const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

        // check if photo exists
        if(!photo){
            res.status(404).json({errors: ["Foto não encontrada"]});
            return;
        };

        console.log(photo);
        console.log(photo.userId);

        // check if photo belongs to user
        if (!photo.userId.equals(reqUser._id)) {
            return res.status(400).json({errors:["Você não pode excluir essa foto."]});
        };

        await Photo.findByIdAndDelete(photo._id);

        res.status(200).json({id: photo._id, message:"Foto excluída com sucesso."});

   } catch (error) {
    console.log(error)
    res.status(404).json({errors: ["Foto não encontrada"]});
    return;
   }
};

// Get all photos
const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({})
        .sort([["createdAt", -1]])
        .exec();

    return res.status(200).json(photos);    
};

// get user photos
const getUserPhotos = async(req, res) => {
    const {id} = req.params

    const photos = await Photo.find({userId: id}).sort([['createdAt', -1]]).exec()

    return res.status(200).json(photos);
};



// Exporta a função 'insertPhoto' para que possa ser utilizada em outras partes do projeto
module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
};
