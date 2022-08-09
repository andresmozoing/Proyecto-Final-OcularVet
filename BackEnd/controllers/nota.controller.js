//Importo esto para que en el tipado me aparezcan las funciones del res
const { response } =  require('express');
const Nota = require('../models/Nota');
const Usuario = require('../models/Usuario');

const crearNota = async(req,res = response)=>{

    try {
        console.log("Llego al controller de crearNota");
        console.log("El body es " , req.body )

        //Verificar que exista el LU
        const usuarioLU = await Usuario.findOne({LU: req.body.LU});
        console.log(usuarioLU);
        if (!usuarioLU){
            return res.status(400).json({
                ok: false,
                msg: ' No existe un usuario con el LU ingresado'
            });
        }

        //Crear nota con el modelo
        const dbNota = new Nota(req.body);        
        console.log('nota es ' , dbNota)

        // Guardar en BD
        await dbNota.save();
        console.log('pudo guardar ' , dbNota)

        return res.status(201).json({
            ok: true
        })
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con su administrador. Error en el controlador de crearNota'
        })
    }
};

const obtenerNotas = async(req,res = response)=>{
    const { LU , anio } = req.body;

    try {
        console.log("Llego al controller de obtenerNotas");
        console.log("El body es " , req.body )

        //Verificar que exista el LU
        const usuarioLU = await Usuario.findOne({LU: LU});
        console.log(usuarioLU);
        if (!usuarioLU){
            return res.status(400).json({
                ok: false,
                msg: ' No existe un usuario con el LU ingresado'
            });
        }
        console.log("Pasó la verif del LU");

        const todasLasNotas = await Nota.find({})
        console.log('todas las notas es ', todasLasNotas);
        let notas = {}
        if (anio){
            console.log("entro al if de anio");
            const fechaInicio = new Date(anio.concat('-01-01'))
            const fechaFin = new Date(anio.concat('-12-31'))
            console.log('fecha inicio es',fechaInicio);
            console.log('fecha fin es ', fechaFin);

            if (LU){
                console.log("entro al if de anio y LU");
                notas = await Nota.find({
                    $and: [
                        {
                            $gte: new Date(anio.concat('-01-01')),
                            $lt: new Date(anio.concat('-12-31'))
                        },
                        { LU : LU }
                    ]
                });
                console.log("notas es " , notas);
            }
            else{
                console.log("entro al if de anio y NO LU");
                notas = await Nota.find({
                    fecha: {
                        $gte: new Date(anio.concat('-01-01')),
                        $lt: new Date(anio.concat('-12-31'))
                    }
                });
            }
        }
        else{
            if(LU){
                console.log("entro al if de NO anio y SI lu");
                notas = await Nota.find({});
                console.log("ntoas es " , notas);

            }
        }
        
        return res.status(201).json({
            ok: true,
            notas : notas
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con su administrador. Error en el controlador de obtenerNotas',
            error
        })
    }
};

module.exports = {
    crearNota,
    obtenerNotas
}