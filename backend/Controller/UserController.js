//UserController.js
const User = require('../Model/User')
const bcrypt = require('bcrypt')

const createUserToken = require('../Helpers/create-user-token')
const getToken = require('../Helpers/get-token')
const jwt = require("jsonwebtoken")

const getUserById = require("../Helpers/get-user-by-token")
module.exports = class UserController{

    //create user
    static async register(req, res){
        
        const {name, email, phone, password, confirmpassword } = req.body

        //regras de negocio
        if(!name) {
            res.status(422).json({message: 'O nome do usuario é obrigatório' })
            return
        }
        if(!email) {
            res.status(422).json({message: 'O email do usuario é obrigatório' })
            return
        }
        if(!phone) {
            res.status(422).json({message: 'O número de telefone do usuario é obrigatório' })
            return
        }
        if(!password) {
            res.status(422).json({message: 'A senha é obrigatória' })
            return
        }
        if(!confirmpassword) {
            res.status(422).json({message: 'Confirmar senha é uma ação obrigatória' })
            return
        }

        //criptografando a senha do user
        const salt  = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //Checar se o usuario existe
        const userExists = await User.findOne({where: { email: email }})

        if(userExists){
            res.status(422).json({message: 'Email já cadastrado'})
            return
        }

        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: passwordHash 
        })

        try {
            //criar novo user no banco
            const NewUser = await user.save()
            //Após criar o usuário, enviar para finalizar  a criação com token
            await createUserToken(NewUser, req, res)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    //aqui será a função de login
    static async login(req,res){//requerimento e resposta
        const { email, password } = req.body

        if(!email){//verificação de email e senha não vazio
            res.status(422).json({message: "O email é obrigatório"})
            return
        }

        if(!password){
            res.status(422).json({message: "A senha é obrigatória"})
            return
        }

        //checar se o email existe
        const user = await User.findOne({where: { email : email }})
        //FindOne exclusivo do node, WHERE EMAIL:EMAIL 
        //procura email vindo do front na coluna EMAIL no banco
        
        if (!user){
            res.status(422).json({message: "O email não cadastrado"})
            return
        }

        //cechar ser o password é igual ao do banco
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword){
            res.status(422).json({message: "A senha está incorreta"})
            return
        }

        await createUserToken(user, req, res)
    }

    //checar os dados do usuario
    static async checkUser(req, res){
        let currentUser

        if(req.headers.authorization){
            const token = getToken(req)

            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findByPk(decoded.id)

            currentUser.password = undefined
        } else{
            currentUser = null
        }

        res.status(200).send(currentUser)
    }
    //Aqui será criado o  getUserById
    static async getUserById(req,res){
        const id = req.params.id

        const user = await User.findByPk(id, {where: {id: id} })

        if(!user){
            res.status(422).json({message: "Usuario não encontrado"})
            return
        }
        user.password = undefined
        res.status(200).json({user})
    }

    static async editUser(req, res){
        const id = req.params.id
        
        //checando se o o user existe

        const token = getToken(req)
        const user = await getUserById(token)
        const {name, email, phone, password, confirmpassword} = req.body

        //salvando a imagem
        let image = ''
        if(req.file){
            image = req.file.filename
        }

        //validações 

        if(!name){
            res.status(422).json({message: "O nome é obrigatorio"})
            return
        }
        if(!email){
            res.status(422).json({message: "O email é obrigatorio"})
            return
        }

        //checando se o email já está cadastrado
        const userExists = await User.findOne({where: { email: email }})

        if(user.email !== email && userExists){
            res.status(422).json({message: "Por favor adicione um email novo"})
            return
        }
        user.email = email

        if(!phone){
            res.status(422).json({message: "O phone é obrigatorio"})
            return
        }

        user.phone = phone

        if(password !== confirmpassword){
            res.status(422).json({message: "As senhas devem ser iguais."})
            return
        }else if(password === confirmpassword != null){
            //criando nova senha
            const salt = await bcrypt.gentSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash
        }

        const userToUpdate = await User.findByPk(id)

        if(!userToUpdate){
            res.status(422).json({message: "O usuario não encontrado"})
            return
        }

        userToUpdate.name  = name
        userToUpdate.email = email
        userToUpdate.phone = phone
        userToUpdate.image = image

        if(password === confirmpassword != null){
            //criando nova senha
            const salt = await bcrypt.gentSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash
        }

        try {
            await userToUpdate.save()
            res.status(200).json({message: "Usuario atualizado com sucesso!"})
        } catch (error) {
            res.status(500).json({message: error.message})
        }

    } 

}