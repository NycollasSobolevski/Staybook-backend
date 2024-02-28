const Notification = require('../models/Notification');
const WebSocket = require('ws');

const configureWebSocketServer = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    ws.on('message', async (message) => {
      console.log(`Mensagem recebida: ${message}`);

      const newNotification = new Notification({ 
        topic: 'newMessage',
        message: message,
       });

      await newNotification.save();

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    console.log(wss.clients.keys)

    ws.on('close', () => {
      console.log('Cliente desconectado');
    });
  });

  return wss;
};

module.exports = configureWebSocketServer;