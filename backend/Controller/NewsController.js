//Models
const News = require ('../Model/News')
const ImageNews = require('../Model/imageNews')
const User = require ('../Model/User')
//helpers
const getToken = require ('../Helpers/get-token')
//bibliotecas
const jwt = require ('jsonwebtoken')

module.exports = class NewsController{
    static async create(req, res){
        const {title, caption, article} = req.body


        //validações
        if(!title){
            res.status(422).json({message: "Um titúlo para a notícia é obrigatório"})
            return
        }
        if(!article){
            res.status(422).json({message: "O artigo é obrigatório"})
            return
        }

        //definindo quem cadastrou a Noticia 
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')//decodificando o token para pegar o id
        currentUser = await User.findByPk(decoded.id)

        const news = new News({
            title: title,
            caption:caption,
            article: article,
            UserId: currentUser.id
        })

        try {
            const newNews = await news.save()
            res.status(200).json({message: 'Notícia cadastrada com sucesso', newNews})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    //filtrar por usuario
    static async getAll(req, res){
        const news = await News.findAll({
            order: [['createdAt', 'DESC']]
        })
        res.status(200).json({news: news})
    }


    //filtrar notícias por usuario
    static async getAllUserNews(req,res){
        //verificar o usuario logado
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        const currentUserId = currentUser.id

        const news = await News.findAll({
            where:{UserId: currentUserId},
            order: [['createdAt', 'DESC']]
        })
        res.status(200).json({news})
    }

    //filtrar por id
    static async getNewsById(req, res){
        const id = req.params.id

        if(isNaN(id)){// is Not A Number
            res.status(422).json({message: "Id invalido"})
            return
        }

        //buscando pelo id
        const news = await News.findByPk(id)

        //validando se existe
        if(!news){
            res.status(422).json({message: "A notícia solicitada não existe"})
            return
        }

        res.status(200).json({news: news})
    }

    static async removeNewsById(req, res){
        const id = req.params.id

        if(isNaN(id)){// is Not A Number
            res.status(422).json({message: "Id invalido"})
            return
        }

        //buscando pelo id
        const news = await News.findByPk(id)

        //validando se existe
        if(!news){
            res.status(422).json({message: "A notícia solicitada não existe"})
            return
        }

        //verificar o usuario logado
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        const currentUserId = currentUser.id

        if(news.UserId !== currentUserId){
            res.status(422).json({message: "Id Invalido"})
            return
        }

        await News.destroy({where: {id: id}})
        res.status(200).json({message: "Notícia excluida com sucesso!!"})
    }

    static async updateNews(req, res){
        const id = req.params.id 

        const {title, caption, article} = req.body

        const updatedNews = {}

        //buscando pelo id
        const news = await News.findByPk(id)

        //validando se existe
        if(!news){
            res.status(422).json({message: "A Notícia solicitada não existe"})
            return
        }

        //verificar o usuario logado
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        const currentUserId = currentUser.id

        if(news.UserId !== currentUserId){
            res.status(422).json({message: "Id Invalido"})
            return
        }

        if(!title){
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }else{
            updatedNews.title = title
        }
        
        updatedNews.caption = caption

        if(!article){
            res.status(422).json({message: 'O artigo é obrigatório'})
            return
        }else{
            updatedNews.article = article
        }

        //trabalhar as imagens
        const images = req.files
        if(!images || images.length === 0){
            res.status(422).json({message: 'As imagens são obrigatórias'})
            return
        }else{
            //Atualizar as imagens da noticia
            const imageFilenames = images.map( (Image) => Image.name)
            //remover as imagens antigas
            await ImageNews.destroy({where: {NewstId : news.id}})
            //Adicionar novas imagens
            for(let i = 0; i< imageFilenames.length; i++){
                const fileName = imageFilenames[i]
                const newImageNews = new ImageNews({Image: fileName, NewstId: news.id})
                await newImageNews.save()
            }
        }
        await News.update(updatedNews, {where: {id: id}})

        res.status(200).json({message: 'Notícia atualizada com sucesso'})
    }
}