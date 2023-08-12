//image-upload.js
const multer = require('multer') //gerenciar imagens
const path = require('path') //gerenciar o caminho dos arquivos
//Aqui será definido onde os arquivos serão salvos
//O destino das imagens será definido aqui

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = '' //folder é pasta

        if (req.baseUrl.includes('users')) {
            folder = 'users'
        } else if (req.baseUrl.includes('news')) {
            folder = 'news'
        }

        cb(null, `public/image/${folder}`)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Por favor, ennvie apenas jpg ou png'))
        }
        cb(null, true)
    }
})

module.exports = imageUpload 