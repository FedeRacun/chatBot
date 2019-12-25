(function (window, undefined) {

  const document = window.document;
  const console = window.console;
  const chatBotName = 'Asistente virtual';

  const SERVER_URLS = {
    local: 'http://localhost:5000/',
    dev: 'https://chatbot-urgencias-server-dev.herokuapp.com/',
    prod_old: 'https://chatbot-osde-dev.tk/',
    prod: 'https://chatbot-osde-dev.cdt.com.ar/'
  };
  const CHAT_URLS = {
    local: 'http://localhost:5000/',
    dev: 'https://chatbot-urgencias-server-dev.herokuapp.com/',
    prod_old: 'https://chatbot-osde-dev.tk/',
    prod: 'https://chatbot-osde-dev.cdt.com.ar/'
  };
  const API = {};

  let dom;

  let isDomDisabled = false;

  setEnv('local');
  bindDom(sayHello);

  function sayHello() {
    textHello = '<p class="chat-name">Asistente virtual</p>' +
      '<p class="read-more-wrap message">Hola, soy el asistente virtual de CDT Soluciones Tecnológicas, estoy para atender tus consultas</p>' +
      '<p class="read-more-wrap message">Puedo ayudarte en los siguientes temas:</p>' +
      '<button class="btn-rta">Arquitectura empresarial</button>' +
      '<button class="btn-rta">Consultoría y desarrollo</button>' +
      '<button class="btn-rta">Consultoría de profesionales IT</button>' +
      '<button class="btn-rta">Cartelería Digital</button>';
    addBlob('bot', textHello)
  }

  function setEnv(env) {
    if (!env || !SERVER_URLS[env]) {
      console.warn('Invalid env [%s], falling back to dev', env);
      API.server = SERVER_URLS.dev;
      API.chat = CHAT_URLS.dev;
    }
    API.server = SERVER_URLS[env];
    API.chat = CHAT_URLS[env];
    API.detect = API.server + 'detect';
    API.options = API.server + 'options';
    API.dym = API.server + 'didyoumean';

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      device = 'mobile';
    } else {
      device = 'Sitio web';
    }
  }

  //capturar todos los elementos del DOM
  function bindDom(callbackFunction) {
    dom = {
      chat: document.getElementsByClassName("chat")[0],
      chatButton: document.getElementsByClassName("chat-button")[0],
      rosetaHelper: document.getElementsByClassName("roseta-tab")[0],
      title: document.getElementsByClassName("chat-title")[0],
      copy: document.getElementsByClassName("copy")[0],
      right: document.getElementsByClassName("right")[0],
      conv: document.getElementsByClassName("chat-conv")[0],
      input: document.getElementsByClassName("chat-input")[0],
      chatUser: document.getElementsByClassName("chat-user")[0],
      send: document.getElementsByClassName("chat-send")[0],
      writing: document.getElementsByClassName("writing")[0]
    };

    // Abrir chatbot minimizado
    dom.rosetaHelper.addEventListener("click", function (e) {
      dom.rosetaHelper.classList.toggle("hidden");
      dom.chat.classList.toggle("hidden");
      dom.chat.classList.toggle("collapsed");
    });

    // Boton X para cerrar
    dom.right.addEventListener("click", function (e) {
      if (!isDomDisabled) {
        dom.rosetaHelper.classList.toggle("hidden");
        dom.chat.classList.toggle("hidden");
        dom.chat.classList.toggle("collapsed");
        dom.chatOption.classList.toggle("collapsed");
      }
    });

    dom.input.addEventListener("keydown", function (e) {
      if (e.keyCode == 13) {
        if (!isDomDisabled) {
          isDomDisabled = true;
          send();
        }
      }
    });

    dom.send.addEventListener("click", function (e) {
      if (!isDomDisabled) {
        isDomDisabled = true;
        send();
      }
    });

    callbackFunction();
  }

  function htmlTagsFilter(value) {
    var lt = /</g,
      gt = />/g,
      ap = /'/g,
      ic = /"/g;
    return value.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
  }

  async function send(msg, hidden) {

    msg = msg || dom.input.value;
    msg = htmlTagsFilter(msg);
    if (!msg) {
      isDomDisabled = false;
    } else {
      if (!hidden) {
        dom.input.value = "";
        addBlob('user', msg);
      }

      let url = `http://localhost:5000/msg/${msg}`;
      await fetch(url)
        .then(response => response.json().then(res => addBlob('bot', res.result)))
        .catch(error => console.error('Error:', error))

    }

  }


  function printBlob(msg) {
    msg = msg || dom.input.val();
    if (!msg) return;
    addBlob('user', msg);
    scrollToBottom('.chat-conv');
  }



  //Esto genera los mensajes del chat.
  function addBlob(classes, msg, buttons, cards, params) {
    buttons = buttons || [];
    cards = cards || [];
    var blob = document.createElement('div');
    blob.className = 'blob ' + classes;

    if (msg) {
      //ponemos el nombre del bot arriba del mensaje
      if (classes == 'bot') {
        var name = document.createElement('p');
        name.className = 'chat-name';
        name.innerHTML = chatBotName;
        blob.appendChild(name);

        var urgImg = document.createElement('img');
        urgImg.src = '../assets/Cdt.png';
        blob.appendChild(urgImg);
      }

      if (msg.includes('-')) {
        var text = document.createElement('p');
        var newMsg = msg.replace(/- /g, "<br>-");
        text.className = 'message';
        text.innerHTML = newMsg;
        blob.appendChild(text);
      } else {
        var maxLength = 600;
        if (msg.length > maxLength) {
          readMore(msg, maxLength, blob);
        } else {
          var text = document.createElement('p');
          text.className = 'read-more-wrap message';
          text.innerHTML = msg;
          blob.appendChild(text);
        }
      }
    }

    if (cards.length) {
      var scroller = document.createElement('div');
      scroller.className = 'scroller';
      scroller.style.width = (cards.length * 240) + 'px';
      for (var i in cards) {
        scroller.appendChild(cards[i]);
      }
      blob.appendChild(scroller);
      blob.classList.add('scroller');
    }
    for (i in buttons) {
      blob.appendChild(buttons[i]);
    }
    dom.conv.append(blob);
    //scrolleo para ver los nuevos mensajes
    scrollToBottom('.chat-conv');

    isDomDisabled = false;
  }

  function scrollToBottom(query) {
    var el = document.querySelector(query);
    el.scrollTop = el.scrollHeight - el.clientHeight;

    // Si dentro de una respuesta existe uno o mas botones: 
    if (document.getElementsByClassName("btn-rta").length > 0) {
      // los alamaceno todos en el elemento btn
      let btn = document.getElementsByClassName("btn-rta");
      // recorro los elementos que contiene el "btn" y en caso de clickear alguno, envio su contenido a dialogFlow
      for (let i = 0; i < btn.length; i++) {
        let element = btn[i];
        element.onclick = function (e) {
          send(e.target.innerText)
        }
      }
    }
  }


  function sendButtonText(payload, title) {
    if (!isDomDisabled) {
      send(payload, true);
      printBlob(title);
      isDomDisabled = true;
    }
  }


  window.send = send;


})(window);