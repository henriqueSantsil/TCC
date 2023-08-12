//helpers/get-token.js

const getToken = (req) => {
    //aqui eu recebo os dados do header da requisição
    const authHeader = req.headers.authorization
    //aqui eu separo o token do restante do header
    const token = authHeader.split(' ')[1]

    return token
}

module.exports = getToken