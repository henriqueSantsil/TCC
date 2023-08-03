//Helpers/get-user-by-token.js
const jwt = require ('jsonwebtoken')
//tratamento do token

const User = require('../Model/User')

//buscar usuario com o JWT
async function  getUserByToken (token){
    if(!token){
        return res.status(401).json({message: "Acesso negado"})
    }
    const decoded = jwt.verify(token, 'nossosecret')

    const userId = decoded.id

    const user = await User.findOne({id: userId})

    return user
}

module.exports = getUserByToken