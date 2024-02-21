const Notification = require('../models/Notification');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    ws.on('message', async (message) => {
        console.log(`Mensagem recebida: ${message}`);

        // Criar e salvar a notificação
        const newNotification = new Notification({
            topic: 'Algum Tópico', // Defina conforme necessário
            message
        });

        await newNotification.save();

        // Transmitir a nova notificação para todos os clientes
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                // Aqui você decide o que exatamente quer enviar
                client.send(JSON.stringify(newNotification));
            }
        });
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});