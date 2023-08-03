//UserRoutes.js

const router = require('express').Router()

const UserController = require('../Controller/UserController')
//middlewares
const verifyToken =require('../Helpers/verify-token')
const { imageUpload } = require ('../Helpers/image-upload')

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.get('/checkuser', UserController.checkUser)

router.get('/:id', UserController.getUserById)

//rota protegida, so acessar caso esteja logado!!!
router.patch(
    '/edit/:id', 
    verifyToken, 
    imageUpload.single('image'), 
    UserController.editUser
)


module.exports = router