//User.js
const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = db.define('User', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: true
    },
    phone:{
        type:DataTypes.STRING,
        allowNull: false
    },
})

module.exports = User