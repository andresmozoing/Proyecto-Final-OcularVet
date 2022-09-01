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


const obtenerConfigAdmin = async (req,res = response) => {
    try {
        console.log("Llego al obtenerConfigAdmin");
        
        const config = await ConfiguracionAdmin.find({ id: 1})

        
        console.log(config);
        return res.json({
            ok: true,
            cantidadPacientesADiagnosticar : config[0].cantidadPacientesADiagnosticar,
            tiempoRespuesta: config[0].tiempoRespuesta,
            codigoRegistro : config[0].codigoRegistro
       })
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en el controlador de obtenerConfigAdmin. ' + error
        })
    }
} //Fin obtenerConfigAdmin()


const modificarUsuario = async (req,res = response) => {
    try {
        console.log("Llego al modificarUsuario, el body es ", req.body);

        const user = await Usuario.updateOne(
                                {_id : req.body._id},
                                {name : req.body.name,
                                 surname: req.body.surname,
                                 email: req.body.email})

        console.log("paso el updateOne y va a devolver ", user);
        return res.json({
            ok: true,
            user
       })
    }
    catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error en el controlador de modificarUsuario. ' + error,
            error: 'El error es ' + error
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
            msg: 'El password no es valido',
            error: 'El error es ' + error
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

const reiniciarPassword = async (req,res = response) => {
    try {
        console.log("Llego al reiniciarPassword, el body es ", req.body);

        const dbUser = await Usuario.findById(req.body._id)
        console.log("usuario es", dbUser);
        if (!dbUser){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
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
            msg: 'Error en el controlador de reiniciarPassword ' + error
        })
    }
} //Fin modificarPassword()


const eliminarUsuario = async (req,res = response) => {
    try {
        const _id = req.header('_id')
        console.log("Llego al eliminarUsuario, el header es " , _id);
        
        const user = await Usuario.findByIdAndDelete(_id)

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
        console.log("Llego al modificarConfiguracionAdmin, el body es ", req.body);
        const update = await ConfiguracionAdmin.updateOne({id:1},req.body)
                
        return res.json({
            ok: true,
            update
       })
    }
    catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error en el controlador de modificarConfigAdmin. ' + error
        })
    }
} //Fin modificarConfiguracionAdmin()



module.exports = {
    obtenerUsuario,
    obtenerTodosLosUsuarios,
    modificarUsuario,
    modificarPassword,
    reiniciarPassword,
    eliminarUsuario,
    obtenerConfigAdmin,
    modificarConfiguracionAdmin

}