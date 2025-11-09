const User = require ('../models/user.model')
const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require ('jsonwebtoken')
const secret = process.env.SECRET;

async function getUserById(req,res){
    try {
        const id = req.params.id
        const user = await User.findById(id).select({password:0, bornDate:0})
        if(!user){
            return res.status(404).send({
                ok: false,
                message: "No se pudo encontrar el usuario"
            })
        }
        res.status(200).send({
            ok: true,
            message: "Usuario encontrado 😊",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok:false,
            message:"Error al obtener usuario por ID"
        })
    }
}

async function getUsers(req, res){
    try {
        const users = await User.find().select({password: 0})
        res.status(200).send({
            ok:true,
            message: "Usuarios obtenidos correctamente",
            users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok:false,
            message: "Error al obtener usuarios"
        })
    }
}

async function postUser(req, res){
    try {
        req.body.password = await bcrypt.hash(req.body.password, saltRounds)
        const user = new User(req.body)
        const newUser = await user.save()
        newUser.password = undefined;
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).send("Error al crear el usuario")
        console.log(error)
    }
}

async function deleteUser(req,res){
    try {
        const id = req.params.id
        const deletedUser = await User.findByIdAndDelete(id).select({password:0})
        if(!deletedUser){
            return res.status(404).send({
                ok:false,
                message:"No se pudo borrar, mal ahí"
            })
        }
        res.status(200).send({
            ok:true,
            message: "Usuario borrado correctamente",
            deletedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok:false,
            message: "No se pudo eliminar el usuario"
        })
    }
}

async function updateUser(req, res){
    try {
        const id = req.params.id
        const newData = req.body
        const updatedUser = await User.findByIdAndUpdate(id, newData, {new:true}).select({password:0})
        if(!updatedUser){
            return res.status(404).send({
                ok:false,
                message: "No se encontro el usuario para actualizar, es muy triste"
            })
        }
        res.status(200).send({
            ok:true,
            message: "Se actualizó el usuario 😁",
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok:false,
            message:"No se pudo actualizar"
        })
    }
}

async function login(req, res){
    try {
        const email = req.body.email?.toLowerCase()
        const password = req.body.password
        if(!email || !password){
            return res.status(400).send({
                ok:false,
                message: "Email y password son requeridos"
            })
        }
        const user = await User.findOne({email: {$regex: email, $options: 'i'}})
        if(!user){
            return res.status(404).send({
                ok:false,
                message:"Datos incorrectos"
            })
        }
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            return res.status(400).send({
                ok:false,
                message: "Datos incorrectos"
            })
        }
        user.password = undefined;
        const token = jwt.sign({user}, secret, {expiresIn: '10m'})
        res.status(200).send({
            ok: true,
            message: "Login correcto",
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok:false,
            message: "No te pudiste loguear salame"
        })
    }
}

module.exports = {
    getUsers,
    postUser,
    deleteUser,
    updateUser,
    getUserById,
    login
}