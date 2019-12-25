/* ============================================
                Rutas
    ============================================            */

/*
*  Aqui vamos a declarar todos nuestros endpoints y sus metodos
*/

const {Router} = require('express');
const router = Router();

//   CONTROLLERS
const {getAnswerController/*ej: , deleteUser  */} = require('../controllers/dialog.controller');

//  ACCION CHATBOT
router.route('/msg/:dato')
//todos nuestros metodos pueden obtener la info que llega por la ruta
    .get(getAnswerController)
//  .set(algo) podes concatenarle cualquier metodo a la misma ruta uno abajo del otro

    
// EJEMPLO (PARTE 1/3) simularia la "eliminacion" de un usuario suscripto a una notificacion via Email

// el front deberia pasarlos el id del usuario a traves de un fetch(`http://localhost:5003/id/${userId}`)
// para que matchee con esta ruta.
/*
router.route('/id/:id')
    .post(deleteUser)
*/



module.exports = router;