const  mongoose  = require("mongoose");

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.BD_CNN,{
            useNewurlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Base de datos Online');
    } catch (error) {
        console.log(error.error);
        throw new Error('Error a la hora de inicializar BD');
    }
}

module.exports= {
    dbConnection
}