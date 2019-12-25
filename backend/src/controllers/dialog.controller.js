/* ============================================
                Controllers
    ============================================            */
// objeto controlador
const dialogCtrl = {};

// Model
const {getResponse /* EJ: , removeUser  */} = require('../model/botModel');

//al obj controlador le agrego una funcion a la cual le paso el modelo de dato que quiero que utilice
dialogCtrl
    .getAnswerController =
    async (req, res) => {
        res.send({
            result: await getResponse(req.params.dato)
        })

    };

/* //    EJEMPLO (PARTE 2/3)
dialogCtrl
    .deleteUser =
    async (req, res) => {
        res.send({
            result: await removeUser(req.params.dato)
        })

    };
*/
module.exports = dialogCtrl;