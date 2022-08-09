const ConfiguracionAdmin = require('../models/ConfiguracionAdmin');
const { response } =  require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

const obtenerUsuario = async (req,res = response) => {
    try {
        console.log("Llego al obtenerUsuario, el body es ", req.body);

        const user = await Usuario.findById(req.body._id)

        return res.json({
            ok: true,
            user
       })
    }
    catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error en el controlador de obtenerUsuario'
        })
    }
} //Fin obtenerUsuario()


const obtenerTodosLosUsuarios = async (req,res = response) => {
    try {
        console.log("Llego al obtenerTodosLosUsuarios");

        const users = await Usuario.find({ isAdmin: false})

        return res.json({
            ok: true,
            users
       })
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en el controlador de obtenerTodosLosUsuarios'
        })
    }
} //Fin obtenerTodosLosUsuarios()


const modificarUsuario = async (req,res = response) => {
    try {
        console.log("Llego al modificarUsuario, el body es ", req.body);

        const user = await Usuario.updateOne(
                                {_id : req.body._id},
                                {name : req.body.name,
                                 surname: req.body.surname,
                                 email: req.body.email})
        
        return res.json({
            ok: true,
            user
       })
    }
    catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error en el controlador de modificarUsuario'
        })
    }
} //Fin modificarUsuario()

const modificarPassword = async (req,res = response) => {
    try {
        console.log("Llego al modificarPassword, el body es ", req.body);

        const dbUser = await Usuario.findById(req.body._id)
        console.log("usuario es", dbUser);
        if (!dbUser){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        //confirmar si el password hace match
        const validPassword = bcrypt.compareSync(req.body.passwordActual,dbUser.password);
        if (!validPassword){
        return res.status(400).json({
            ok:false,
            msg: 'El password actual no es válido'
        });
        }

        //hashear la contraseña
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(req.body.passwordNueva, salt);
        
        console.log("va a modificar el pass");
        const userModificado = await Usuario.updateOne(
                                {_id : req.body._id},
                                {password : dbUser.password})
        
        return res.json({
            ok: true,
            userModificado
       })
    }
    catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error en el controlador de modificarPassword'
        })
    }
} //Fin modificarPassword()


const eliminarUsuario = async (req,res = response) => {
    try {
        console.log("Llego al eliminarUsuario, el body es " , req.body);
        
        const user = await Usuario.findByIdAndDelete(req.body._id)

        return res.json({
            ok: true,
            user
       })
    }
    catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error en el controlador de eliminarUsuario'
        })
    }
} //Fin eliminarUsuario()


const modificarConfiguracionAdmin = async (req,res = response) => {
    try {
        console.log("Llego al modificarConfiguracionAdmin");
        const body = req.body;
        ConfiguracionAdmin.updateOne(
                {id:1},
                body,
                (err,docs) => {
                    res.send({
                        items : docs
                    })
                })

        return res.json({
            ok: true
       })
        
    }
    catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error en el controlador de modificarConfigAdmin'
        })
    }
} //Fin modificarConfiguracionAdmin()



module.exports = {
    obtenerUsuario,
    obtenerTodosLosUsuarios,
    modificarUsuario,
    modificarPassword,
    eliminarUsuario,
    modificarConfiguracionAdmin
}