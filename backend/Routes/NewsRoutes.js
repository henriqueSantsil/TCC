//News Routes
const router = require('express').Router()
const NewsController = require('../Controllers/NewsController')

//helpers
const verifyToken = require('../helpers/verify-token')
const imageUpload = require('../helpers/image-upload')

//---------------- rotas privadas---------------- 
/*cadastrar uma noticia*/
router.post('/create', verifyToken, imageUpload.array('images'), NewsController.create)
/* mostrar noticias do usuario logado */
router.get('/mynews', verifyToken, NewsController.getAllUserNews)
/* deletar uma noticia pelo id */
router.delete('/:id', verifyToken, NewsController.removeNewsById)
/* Editar noticia */
router.patch('/:id', verifyToken, imageUpload.array('images'), NewsController.updateNews)

//---------------- rotas publicas ----------------
/*listar todas as noticias */
router.get('/', NewsController.getAll)
/*listar noticia por id*/
router.get('/:id', NewsController.getNewsById)

module.exports = router
