//Importo esto para que en el tipado me aparezcan las funciones del res
const { response } =  require('express');
const Nota = require('../models/Nota');
const Usuario = require('../models/Usuario');

const obtenerNotas = async(req,res = response)=>{
    const DNI = req.header('DNI');
    const anio = req.header('anio');
    try {
        let notas = {}
        if (anio){
            if (DNI){
                notas = await Nota.find({
                    $and: [
                        {
                            $gte: new Date(anio.concat('-01-01')),
                            $lt: new Date(anio.concat('-12-31'))
                        },
                        { DNI : DNI }
                    ]
                });
            }
            else{
                notas = await Nota.find({
                    fecha: {
                        $gte: new Date(anio.concat('-01-01')),
                        $lt: new Date(anio.concat('-12-31'))
                    }
                });
            }
        }
        else{
            if(DNI){
                notas = await Nota.find({ DNI : DNI });
            }
            else{ //Caso sin DNI ni anio
                notas = await Nota.find({});
            }
        }

        return res.status(201).json({
            ok: true,
            notas : notas
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con su administrador. Error en el controlador de obtenerNotas'+ error,
            error
        })
    }
};


const crearNota = async(req,res = response)=>{
    
    try {       
        //Verificar que exista el DNI
        const usuarioDNI = await Usuario.findOne({DNI: req.body.DNI});
        if (!usuarioDNI){
            return res.status(400).json({
                ok: false,
                msg: ' No existe un usuario con el DNI ingresado'
            });
        }

        //Crear nota con el modelo
        const dbNota = new Nota(req.body);        

        // Guardar en BD
        await dbNota.save();

        return res.status(201).json({
            ok: true,
            notas : [dbNota]
        })

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con su administrador. Error en el controlador de crearNota'
        })
    }
};

const modificarNombre_y_apellido = async (req,res = response) => {
    try {

        const nota = await Nota.updateMany(
                                {DNI : req.body.DNI},
                                {name : req.body.name,
                                 surname: req.body.surname
                                })

        return res.json({
            ok: true,
            nota
       })
    }
    catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error en el controlador de modificarNombre_y_apellido. ' + error,
            error: 'El error es ' + error
        })
    }
} //Fin modificarNota()

const eliminarNota = async(req,res = response)=>{
    try {

        await Nota.findByIdAndDelete(req.header('_id'))

        return res.status(201).json({
            ok: true
        })
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con su administrador. Error en el controlador de eliminarNota'
        })
    }
};


const eliminarNotasUsuario = async(req,res = response)=>{
    try {
        const DNI = req.header('DNI')
        notas = await Nota.find({ DNI : DNI });

        notas.forEach(async e => { 
            await Nota.findByIdAndDelete(e._id)
        });

        return res.status(201).json({
            ok: true
        })
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con su administrador. Error en el controlador de eliminarNotasUsuario'
        })
    }
};

module.exports = {
    crearNota,
    obtenerNotas,
    modificarNombre_y_apellido,
    eliminarNota,
    eliminarNotasUsuario
}