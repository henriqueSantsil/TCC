//create-user-token.js
const jwt = require('jsonwebtoken')

//criando token do user
async function createUserToken(user, req, res) {

    //gerar o token
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, 'nossosecret') //Mudar o nosso segredo para melhorar a criptografia

    //retornar o token
    res.status(200).json({
        message: 'Você está autenticado',
        token: token,
        userId: user.id
    })
}
module.exports = createUserToken