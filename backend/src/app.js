/* ============================================
                Codigo del server
    ============================================            */

 /**
 * Aqui vamos a ingresar todas nuestras configuraciones, librerias o dependencias utilizando el app. para luego exportarlo
 */


//  UTILIDADES
const express = require('express');
const cors = require('cors');
const app = express();




//  CONFIGURACIONES
//  creo una variable 'port' a traves de express
app.set('port', process.env.PORT);


//  MIDDLEWARES
app.use(cors());
app.use(express.json());


// RUTAS
// todo lo que llegue al backend ingresa a la carpeta "routes"
app.use(`/`, require('./routes/routes'));


//exporto el app() para poder utilizarlo en el resto del server
module.exports = app;