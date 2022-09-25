const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const app = express();

const messages = require('./routes/messages');
const { uuidv4, getDogName } = require('./be-utils');

app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({ port: 7071 });
const clients = new Map();

wss.on('connection', (ws) => {
  const metadata = {
    userId: uuidv4(),
    userColor: Math.floor(Math.random() * 360), // number between 0-360 +  hsl(color, 60%, 60%) = is the color,
    userName: getDogName() // nothing to do with Alcoholics Anonymous
  };
  clients.set(ws, metadata);

  sendCurrentUsers(clients);
  setTimeout(() => {
    sendCurrentUsers(clients);
  }, 700);
  ws.on('message', (messageAsString) => {
    const messageAsObject = JSON.parse(messageAsString);
    const metadata = clients.get(ws);
    const message = {
      ...metadata,
      message: messageAsObject.message,
      date: +new Date(),
      type: 'TEXT',
      msgId: uuidv4()
    };
    const res = JSON.stringify({ type: 'new-message', payload: [message] });
    [...clients.keys()].forEach((client) => {
      client.send(res);
    });

    messages.addMessage(message);
  });

  ws.on('close', () => {
    clients.delete(ws);
    sendCurrentUsers(clients);
    const message = {
      message: `${metadata.userName} left the chat`,
      date: +new Date(),
      type: 'SERVICE',
      msgId: uuidv4()
    };
    const res = JSON.stringify({ type: 'new-message', payload: [message] });

    [...clients.keys()].forEach((client) => {
      client.send(res);
    });
  });
});

function sendCurrentUsers(clients) {
  [...clients.keys()].forEach((client) => {
    client.send(
      JSON.stringify({
        type: 'new-user',
        payload: [...clients.keys()].map((client) => clients.get(client))
      })
    );
  });
}
app.use('/messages', messages.router);

//start our server
server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
