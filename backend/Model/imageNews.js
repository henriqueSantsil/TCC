//model/ImageNews.js
const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const News = require('./News')

const ImageNews = db.define('ImageNews', {
    image:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

//a imagem pertence a 1 noticia
ImageNews.belongsTo(News)
//uma noticia tem varias imagens
News.hasMany(ImageNews)

module.exports = ImageNews