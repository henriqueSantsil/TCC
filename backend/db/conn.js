//conn.js
require('dotenv').config()
const { Sequelize } = require('sequelize')
                                                        

const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    dialect: "mysql",
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
});

try {
    sequelize.authenticate()
    console.log('conectado ao banco')
} catch (error) {
    console.log('não foi possivel conectar ao banco', error)
}

module.exports = sequelize


