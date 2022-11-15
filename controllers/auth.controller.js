//Importo esto para que en el tipado me aparezcan las funciones del res
const { response } =  require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const ConfiguracionAdmin = require('../models/ConfiguracionAdmin');

const crearUsuario = async(req,res = response)=>{

    const { name, surname, DNI, email, password, codigoRegistro}= req.body;
    try {
        //Verificar que no exista el email
        const usuarioEmail = await Usuario.findOne({email: email});
        if (usuarioEmail){
            return res.status(400).json({
                ok:false,
                msg: ' Ya existe un usuario con el email ingresado'
            });
        }

        //Verificar que no exista el DNI
        const usuarioDNI = await Usuario.findOne({DNI: DNI});
        console.log(usuarioDNI);
        if (usuarioDNI){
            return res.status(400).json({
                ok:false,
                msg: ' Ya existe un usuario con el DNI ingresado'
            });
        }

        const configAdmin = await ConfiguracionAdmin.findOne({codigoRegistro:codigoRegistro});

        if (!configAdmin){
            return res.status(400).json({
                ok: false,
                msg: 'El código de registro no es válido'
            });
        }

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
            DNI,
            email,
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con su administrador. Error al crear el usuario'
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
                msg: 'El correo no existe. Por favor ingrese uno válido.'
            });
        }
        //confirmar si el password hace match
        const validPassword = bcrypt.compareSync(password,dbUser.password);
        if (!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'La contraseña no es válida'
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
            surname: dbUser.surname,
            DNI: dbUser.DNI,
            token,
            email,
            isAdmin : dbUser.isAdmin,

        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con su administrador'
        })
    }
};

const revalidarToken = async(req,res = response)=>{
    const {uid} = req;
    const dbUser = await Usuario.findById({_id:uid}); //Para traer el email
    console.log(dbUser );
    console.log(uid);
    const token = await generarJWT(uid, dbUser.name);
    return res.json({
         ok: true,
        uid,
        name:dbUser.name,
        surname:dbUser.surname,
        DNI: dbUser.DNI,
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