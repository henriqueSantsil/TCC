//helpers/image-upload.js
const multer = require('multer') 
//Middleware para manipulação multipart/form-data. 
//para fazer, upload de arquivos

const path = require("path")
//Aqui será definido a onde os arquivos serão enviados
//Destino das imagens no storage

const imageStorage = multer.diskStorage({ //Usamos o multer para ele salvar em DISKSTORAGE
    destination: function(req, file, cb){

        let folder = ""

        if (req.baseUrl.includes("users")){
            folder = "users"
        }else if (req.baseUrl.includes("news")){
            folder = "news"
        }
   

    cb(null, `public/images/${folder}`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    },
    
})

const imageUpload = multer ({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb (new Error("Por favor, envie apenas jpg ou png"))
        }
        cb (null, true)//Correção de "cd" para "cb"
    }
})

module.exports = { imageUpload }