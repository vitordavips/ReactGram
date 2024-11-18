// o multer faz o upload dos arquivos
const multer = require("multer");
// o path fica responsavel pelos caminhos
const path = require("path");

// destino de armazenamento da imagem
const imagemArmazenada = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = ""

        if(req.baseUrl.includes("users")){
            folder = 'users'
        } else if(req.baseUrl.includes("photos")){
            folder = "photos"
        };

        cb(null, `uploads/${folder}/`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

// validação da imagem e defenir onde ela vai ser salva
const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            // upload dos formatos png e jpg
            return cd(new Error("Por favor, envie apenas png ou jpg!"))
        }

        cb(undefined, true)
    }    
});

module.exports = {imageUpload};
