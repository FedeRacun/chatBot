/* ============================================
                Inicio del server
    ============================================            */
//Orquesto todo lo que necesito para trabajar
try {

    require('./src/config/config');
    const app = require('./src/app');

    //levanto el servidor en una funcion asincrona para prevenir posibles errores y evitar callbacks
    async function main() {

        await app.listen(app.get('port'));
        console.log('Server iniciado en el puerto: ', app.get('port'))


    }

    main();

} catch (error) {
    console.log('Ocurrio un error al iniciar el servidor: ', error);
}

/**
 * Esta seccion solo se encarga de levantar el server, las librerias u otras dependencias van en app.js
 */