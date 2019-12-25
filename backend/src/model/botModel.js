/* ============================================
                Madelado de Datos
    ============================================            */

const dialogflow = require('dialogflow');
const uuid = require('uuid');
/**
* El botModel va a ser el ultimo punto encargado de gestionar la comunicacion entre el backend y Dialogflow
* Aqui debes indicar el .json con las credenciales correspondientes a la cuenta del chatbot, tambien el id del proyecto
*/
    
const botModel = {}

botModel
  .getResponse =
  //el message lo captura el controller a traves del (req)
  async (message) => {
    const sessionId = uuid.v4();
    const projectId = 'knispelbot-cdt-bsmtxl'
    const sessionClient = new dialogflow.SessionsClient({
      keyFilename: './dialogKeys.json'
    });
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);


    var request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          // https://en.wikipedia.org/wiki/Language_code
          languageCode: 'es-419',
        },
      },
    };

    // 
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    return result.fulfillmentText;
  };


/*
  
// EJEMPLO (PARTE 3/3)  

botModel
  .removeUser =
  async (id) => {
    codigoBorradorDeId;
  }
*/
module.exports = botModel;