//NewsRoutes.js
const router = require('express').Router()
const NewsController = require ('../Controller/NewsController')
const verifyToken = require ('../Helpers/verify-token')
const { imageUpload } = require ('../Helpers/image-upload')

//rotas privadas
router.post('/create', verifyToken, NewsController.create)//criar Postagemm
router.get('/mynews', verifyToken, NewsController.getAllUserNews)//filtrar minhas postagens
router.delete('/:id', verifyToken, NewsController.removeNewsById)//remover postagens
router.patch('/:id', verifyToken,imageUpload.array('images'), NewsController.updateNews)//editar uma postagem

//rotas publicas
router.get('/', NewsController.getAll)
router.get('/:id', NewsController.getNewsById)

module.exports = router