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
app.use('/api/nota', require('./routes/nota.routes'));
app.use('/api/usuario', require('./routes/usuario.routes'));
app.use('/api/diagnostico', require('./routes/diagnostico.routes'));

//Manejar demas rutas (para el deploy)
app.get('*' , (req,res) =>{
    res.sendFile( path.resolve(__dirname , 'public/index.html'))
})

//para levantar la app:
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});



