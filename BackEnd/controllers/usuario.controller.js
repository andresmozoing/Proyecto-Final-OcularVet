const ConfiguracionAdmin = require('../models/ConfiguracionAdmin');
const { response } =  require('express');
const Usuario = require('../models/Usuario');

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
            msg: 'Error en el controlador de modificarUsuario',
            error: 'El error es ' + error
        })
    }
} //Fin modificarUsuario()

const modificarPassword = async (req,res = response) => {
    try {
        console.log("Llego al modificarPassword, el body es ", req.body);

        const dbUser = await Usuario.findById(req.body._id)
        if (!dbUser){
            return res.status(400).json({
                ok:false,
                msg: 'El correo no existe'
            });
        }
        //confirmar si el password hace match
        const validPassword = bcrypt.compareSync(password,dbUser.password);
        if (!validPassword){
        return res.status(400).json({
            ok:false,
            msg: 'El password no es valido',
            error: 'El error es ' + error
        });
        }

        const userModificado = await Usuario.updateOne(
                                {_id : req.body._id},
                                {name : req.body.name,
                                 surname: req.body.surname,
                                 email: req.body.email})
        
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