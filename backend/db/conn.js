//conn.js
const { Sequelize } = require('sequelize')
                                                        //user e senha diferente
const sequelize = new Sequelize('radar_da_informacao', 'root', 'root', { //alterar o nome do banco, user e senha.
    host: 'localhost',
    dialect: 'mysql'
})


try {
    sequelize.authenticate()
    console.log('conectado ao banco')
} catch (error) {
    console.log('não foi possivel conectar ao banco', error)
}

module.exports = sequelize


