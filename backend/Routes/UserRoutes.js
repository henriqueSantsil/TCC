const router = require('express').Router()
const UserController = require('../Controllers/UserController')

const NewsController = require('../Controllers/NewsController')
//helpers
const verifyToken = require('../helpers/verify-token')
const imageUpload = require('../helpers/image-upload')
const NewsController = require('../Controllers/NewsController')

//rota para criar "registrar" um usuario
//rotas publicas
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)

//rotas protegidas, só acessar caso esteja logado!!!
router.get('/profile/:id', verifyToken, NewsController.getAllUserNews)
router.patch('/settings/:id', verifyToken, imageUpload.single('image'), UserController.editUser)
router.get('/profile/:id', verifyToken, NewsController.getAllUserNews)
module.exports = router 