// O multer é uma biblioteca para lidar com o upload de arquivos no Node.js
const multer = require("multer");
// O path é uma biblioteca do Node.js para trabalhar com caminhos de arquivos e diretórios
const path = require("path");

// Configuração do armazenamento para a imagem, usando multer
const imageStorage = multer.diskStorage({
    // A função `destination` define o diretório onde o arquivo será armazenado
    destination: (req, file, cb) => {
        let folder = "";  // Variável para armazenar o nome da pasta de destino

        // Condicional para verificar se a URL da requisição contém 'users' ou 'photos'
        if(req.baseUrl.includes("users")){
            folder = 'users';  // Se contiver 'users', a pasta será 'users'
        } else if(req.baseUrl.includes("photos")){
            folder = "photos";  // Se contiver 'photos', a pasta será 'photos'
        };

        // A função `cb` define o diretório final, que será a pasta 'uploads/seguida do nome da pasta definida acima'
        cb(null, `uploads/${folder}/`);
    },
    // A função `filename` define o nome do arquivo, gerando um nome único baseado no timestamp atual
    filename: (req, file, cb) => {
        // Usando `Date.now()` para garantir que o nome do arquivo seja único, e `path.extname` para manter a extensão original
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Configuração do multer para lidar com o upload, incluindo validação do tipo de arquivo
const imageUpload = multer({
    // Passando a configuração de armazenamento definida anteriormente
    storage: imageStorage,
    // A função `fileFilter` define qual tipo de arquivo pode ser aceito
    fileFilter(req, file, cb){
        // Verificando se o arquivo tem uma extensão .png ou .jpg
        if(!file.originalname.match(/\.(png|jpg)$/)){
            // Se não for .png ou .jpg, rejeita o arquivo com uma mensagem de erro
            return cb(new Error("Por favor, envie apenas png ou jpg!"));
        }

        // Se for um arquivo válido, permite o upload
        cb(undefined, true);
    }    
});

// Exportando a configuração do multer para ser utilizada em outros arquivos
module.exports =  {imageUpload} ;
