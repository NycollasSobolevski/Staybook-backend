const socketIO = require('socket.io');

function setupWebSocket(server) {
  const io = socketIO(server);
  if(io)
  {
    console.log('Socket.io server is running');
  }

  if(io.on){
    console.log("aaaaa")
  }


  io.on('connection', (socket) => {
    console.log('Um usuário se conectou');

    // Lógica para lidar com mensagens do cliente
    socket.on('chat message', (msg) => {
      console.log(`Mensagem do cliente: ${msg}`);
      // Aqui você pode emitir a mensagem para outros clientes ou fazer o que for necessário
    });

    // Lógica para lidar com desconexão do cliente
    socket.on('disconnect', () => {
      console.log('Um usuário se desconectou');
    });
  });
}

module.exports = { setupWebSocket };
