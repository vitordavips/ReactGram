// Importa o modelo 'Photo' que será usado para interagir com a coleção de fotos no banco de dados
const Photo = require("../models/Photo");

// Importa o Mongoose, uma biblioteca que facilita a interação com o MongoDB
const mongoose = require("mongoose");

// Função assíncrona para inserir uma foto, associando-a a um usuário
const insertPhoto = async (req, res) => {
    // Extrai o campo 'title' do corpo da requisição (req.body)
    const { title } = req.body;
    
    // Extrai o nome do arquivo da foto que foi enviado (req.file.filename)
    const image = req.file.filename;

    // Exibe o corpo da requisição no console para fins de debug
    console.log(req.body);

    // Envia uma resposta simples confirmando a inserção da foto
    res.send("Photo insert");
};

// Exporta a função 'insertPhoto' para que possa ser utilizada em outras partes do projeto
module.exports = {
    insertPhoto,
};
