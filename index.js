const compression = require('compression');
const express =  require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

//Crear el servidor/aplicacion de express
const app = express();

//Conectamos la base de Datos
dbConnection();

//Directorio publico
app.use( express.static('public'));

//CORS
app.use(cors());

//Compression. Esto sirve para que se compriman los archivos (se "gzippen" los archivos) y pesen mucho menos a la hora de cargarlos
app.use(compression())

//Lectura y parseo del body
app.use( express.json() );

//RUTAS
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/nota', require('./routes/nota.routes'));
app.use('/api/usuario', require('./routes/usuario.routes'));
app.use('/api/diagnostico', require('./routes/diagnostico.routes'));

//Manejar demas rutas (para el deploy)
// app.get('*' , (req,res) =>{
//     res.sendFile( path.resolve(__dirname , 'public/index.html'))
// })

//Levantamos la app:
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});



