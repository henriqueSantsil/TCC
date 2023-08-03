//Model/News.Js
const { DataTypes } = require('sequelize')
const User = require('./User')
const db = require('../db/conn')

const News = db.define('News', {
    title : {
        type: DataTypes.STRING, //Aqui permite mudar os tipos de types
        allowNull: false//Aqui não permite vazio, para permitir é true
    },
    caption:{
        type: DataTypes.STRING,
        allowNull: true //a matéria não precisa obrigatóriamente de um subtitulo
    },
    article:{
        type: DataTypes.TEXT,
        allowNull: false
    }
})

News.belongsTo(User)
User.hasMany(News)

module.exports = News