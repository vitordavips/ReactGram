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
        cb(null, Date.now())
    }
})