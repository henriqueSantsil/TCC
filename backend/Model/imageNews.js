//model/ImagePet.js
const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const News = require('./News')

const ImageNews = db.define('imageNews', {
    Image:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

//uma imagem pertence a 1 noticia e uma noticia pode ter varias imagens
ImageNews.belongsTo(News)
News.hasMany(ImageNews)

module.exports = ImageNews