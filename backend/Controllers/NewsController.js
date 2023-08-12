const News = require('../Model/News')
const User = require('../Model/User')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const jwt = require('jsonwebtoken')
const ImageNews = require('../Model/ImageNews')

module.exports = class NewsController {
    static async create(req, res) {
        const { title, caption, article} = req.body


        if (!title) {
            res.status(422).json({ message: 'Um título para a matéria é obrigatório' })
            return
        }
        if (!caption) {
            res.status(422).json({ message: 'Uma legenda para a matéria é obrigatório' })
            return
        }
        if (!article) {
            res.status(422).json({ message: 'A matéria é obrigatório' })
            return
        }
        


        //pegando o dono da matéria
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        //criando a noticia
        const news = new News({
            title: title,
            caption: caption,
            article: article,
            UserId: currentUser.id
        });

        try {
            // Save the news to the database
            const newNews = await news.save();

            // Handle image uploads
            const images = req.files;
            if (images && images.length > 0) {
                // Save each image to the ImagePet table
                for (let i = 0; i < images.length; i++) {
                    const filename = images[i].filename;
                    const newImageNews = new ImageNews({ image: filename, NewsId: newNews.id });
                    await newImageNews.save();
                }
            }

            res.status(201).json({ message: 'Notícia cadastrada com sucesso'});
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }



    //mostrando todas as noticias
    static async getAll(req, res) {
        const news = await News.findAll({
            order: [['createdAt', 'DESC']],
            include: ImageNews
        });

        res.status(200).json({ news: news});

    }

    //filtrando as noticias por usuario
    static async getAllUserNews(req, res) {
        //encontrando o usuario logado
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        currentUser.password = undefined
        const currentUserId = currentUser.id

        const news = await News.findAll({ 
            where: { userId: currentUserId }, 
            order: [['createdAt', 'DESC']] ,
            include: ImageNews
        })

        res.status(200).json({ news })

    }

    static async getNewsById(req, res) {
        const id = req.params.id

        if (isNaN(id)) {
            res.status(422).json({ message: 'ID Inválido' })
            return
        }
        //get news by id
        const news = await News.findByPk(id, { include: ImageNews });

        //validando se o ID é valido
        if (!news) {
            res.status(422).json({ message: 'A matéria não existe' })
            return
        }

        res.status(200).json({ news: news })
    }

    static async removeNewsById(req, res) {
        const id = req.params.id

        if (isNaN(id)) {
            res.status(422).json({ message: 'ID Inválido' })
            return
        }
        //get news by id
        const news = await News.findByPk(id)

        //validando se o ID é valido
        if (!news) {
            res.status(422).json({ message: 'A matéria não existe' })
            return
        }

        //checar se o usuario logado registrou o pet
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        currentUser.password = undefined
        const currentUserId = currentUser.id

        // if (Number(pet.userId) !== Number(currentUserId)) {
        //     res.status(422).json({ message: 'ID inválido' })
        //     return
        // }

        await News.destroy({ where: { id: id } })

        res.status(200).json({ message: 'Matéria removida com sucesso' })
    }


    static async updateNews(req, res) {
        const id = req.params.id
        const { title, caption, article} = req.body

        const updateData = {}
        const news = await News.findByPk(id);

        if (!news) {
            res.status(404).json({ message: "News não existe!" });
            return;
        }

        //pegando o dono da Matéria
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        if (news.UserId !== currentUser.id) {
            res.status(422).json({ message: "ID inválido!" });
            return;
        }

        if (!title) {
            res.status(422).json({ message: "O título da matéria é obrigatório!" });
            return;
        } else {
            updateData.title = title
        }
        if (!caption) {
            res.status(422).json({ message: "A legenda da matéria é obrigatório!" });
            return;
        } else {
            updateData.caption = caption
        }
        if (!article) {
            res.status(422).json({ message: "O artigo é obrigatório!" });
            return;
        } else {
            updateData.article = article
        }


        const images = req.files
        if (!images || images.length === 0) {
            res.status(422).json({ message: "As imagens são obrigatórias!" });
            return;
        } else {
            // Atualizar as imagens da noticia
            const imageFilenames = images.map((image) => image.filename);
            // Remover imagens antigas
            await ImageNews.destroy({ where: { NewsId: news.id } });
            // Adicionar novas imagens
            for (let i = 0; i < imageFilenames.length; i++) {
                const filename = imageFilenames[i];
                const newImageNews = new ImageNews({ image: filename, NewsId: news.id });
                await newImageNews.save();
            }

        }

        await News.update(updateData, { where: { id: id } });

        res.status(200).json({ message: "Matéria atualizada com successo!" })
    }
    

}