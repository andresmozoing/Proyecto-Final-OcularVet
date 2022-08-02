const express =  require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

 
//CREAR EL servidor/aplicacion de express
const app = express();

//Base de Datos
dbConnection();

//Directorio publico
app.use( express.static('public'));

//CORS
app.use(cors());

//Lectura y parseo del body
app.use( express.json() );

//RUTAS
app.use('/api/auth', require('./routes/auth.routes'));


//para levantar la app:
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});



