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

const obtenerNotas = async(req,res = response)=>{
    const LU = req.header('LU');
    const anio = req.header('anio');
    try {
        console.log("Llego al controller de obtenerNotas");
        console.log("El Header es " , req.header )
       

        let notas = {}
        if (anio){
            console.log("entro al if de anio");

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
                notas = await Nota.find({ LU : LU });
            }
            else{ //Caso sin LU ni anio
                console.log("entro al if de NO anio y NO lu");
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

const eliminarNota = async(req,res = response)=>{
    try {
        console.log("Llego al controller de borrarNota");
        console.log("El header es " , req.header('_id') )

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
        console.log("Llego al controller de eliminarNotasUsuario");
        console.log("El LU es " , req.header('LU') )

        const LU = req.header('LU')
        notas = await Nota.find({ LU : LU });

        console.log("NOTAS TIENE:",notas);
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
    eliminarNota,
    eliminarNotasUsuario
}