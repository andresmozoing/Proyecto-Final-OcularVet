//Importo esto para que en el tipado me aparezcan las funciones del res
const { response } =  require('express');
const Diagnostico = require('../models/Diagnostico');

const crearDiagnostico = async(req,res = response)=>{
    try {
        console.log("Llego al controller de crearDiagnostico, el body es " , req.body);

        const dbDiagnostico = new Diagnostico(req.body);

        await dbDiagnostico.save();

        return res.status(201).json({
            ok: true,
            dbDiagnostico
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con su administrador. Error en el controlador de crearDiagnostico. ' + error
        })
    }
};

const obtenerTodosLosDiagnosticos = async (req,res = response) => {
    try {
        console.log("Llego al obtenerTodosLosDiagnosticos");

        const diagnosticos = await Diagnostico.find({ })

        return res.json({
            ok: true,
            diagnosticos
       })
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en el controlador de obtenerTodosLosDiagnosticos'
        })
    }
} //Fin obtenerTodosLosDiagnosticos()

module.exports = {
    crearDiagnostico,
    obtenerTodosLosDiagnosticos
}