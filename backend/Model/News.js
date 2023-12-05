//Model/News.Js
const { DataTypes } = require('sequelize')
const User = require('../Model/User')
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
    },
    author :{
        type: DataTypes.STRING,
        allowNull: false
    }
})

News.belongsTo(User)
User.hasMany(News)

News.addHook('beforeValidate', async (news, options) => {
    // Fetch the corresponding user
    const user = await User.findByPk(news.UserId);

    // If user is found, set the author field in news
    if (user) {
        news.author = user.name;
    }
});

module.exports = News