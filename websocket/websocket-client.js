const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080'); // Substitua pela URL correta do seu servidor WebSocket

ws.on('open', () => {
  console.log('Conectado ao servidor WebSocket');

  // Envie uma mensagem para o servidor
  ws.send('Olá, servidor!');
});



ws.on('close', () => {
  console.log('Desconectado do servidor WebSocket');
});
