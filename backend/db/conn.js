//conn.js
require('dotenv').config()
const { Sequelize } = require('sequelize')
                                                        
// user e senha diferente
const sequelize = new Sequelize('radar_da_informacao', 'root', 'root', { //alterar o nome do banco, user e senha.
host: 'localhost',
dialect: 'mysql'
})

// const sequelize = new Sequelize({
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DATABASE,
//     dialect: "mysql",
//     port: process.env.DB_PORT,
//     host: process.env.DB_HOST,
// });

try {
    sequelize.authenticate()
    console.log('conectado ao banco')
} catch (error) {
    console.log('não foi possivel conectar ao banco', error)
}

module.exports = sequelize


