//Importo esto para que en el tipado me aparezcan las funciones del res
const { response } =  require('express');
const { validationResult } =  require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const ConfiguracionAdmin = require('../models/ConfiguracionAdmin');

const crearUsuario = async(req,res = response)=>{

    //Para desestructurar el body: (asi puedo manejarlos por separado)
    const { name, surname, LU, email, password, codigoRegistro}= req.body;
    try {
        console.log("Llego al controller de crearUsuario");
        //Verificar que no exista el email
        const usuarioEmail = await Usuario.findOne({email: email});
        if (usuarioEmail){
            return res.status(400).json({
                ok:false,
                msg: ' Ya existe un usuario con el email ingresado'
            });
        }

        console.log("Pasó la verif del email");

        //Verificar que no exista el LU
        const usuarioLU = await Usuario.findOne({LU: LU});
        console.log(usuarioLU);
        if (usuarioLU){
            return res.status(400).json({
                ok:false,
                msg: ' Ya existe un usuario con el LU ingresado'
            });
        }

        console.log("Pasó la verif del LU");

        const configAdmin = await ConfiguracionAdmin.findOne({codigoRegistro:codigoRegistro});

        if (!configAdmin){
            return res.status(400).json({
                ok: false,
                msg: 'El codigoRegistro no es válido'
            });
        }

        console.log("Pasó la verif del codigoRegistro");

        console.log(req.body);
        //Crear usuario con el modelo
        const dbUser = new Usuario(req.body);
        //hashear la contraseña
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(password, salt);
        
        //Generar el JWT 
        const token = await generarJWT(dbUser.id, name);
        
        // Crear en BD
        await dbUser.save();
        //Generar rta exitosa

        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            surname,
            LU,
            email,
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con su administrador. Error en el controlador de crearUsuario'
        })
    }

    
};

const loginUsuario = async (req,res = response)=>{

    const { email, password}= req.body;    
    try {
        //Verificar que exista el email
        const dbUser = await Usuario.findOne({email: email});
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
                msg: 'El password no es valido'
            });
        }
        //Generar el JWT 
        const token = await generarJWT(dbUser.id, dbUser.name);
        //Generar rta exitosa
        return res.json({
            ok: true,
            uid: dbUser.id,
            msg:'Login existoso',
            name: dbUser.name,
            token,
            email
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con su administrador'
        })
    }
};

const revalidarToken = async(req,res = response)=>{
    const {uid,name} = req;
    const dbUser = await Usuario.findById({_id:uid}); //Para traer el email
    const token = await generarJWT(uid, dbUser.name);
    return res.json({
         ok: true,
        uid,
        name:dbUser.name,
        surname:dbUser.surname,
        LU: dbUser.LU,
        token,
        email : dbUser.email,
        isAdmin: dbUser.isAdmin
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}