const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const app = express();

const messages = require('./routes/messages');
const { uuidv4, getDogName, getDogImage } = require('./be-utils');
const { getBotAnswer, getBotMetaData } = require('./routes/bot');

app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({ port: 7071 });
const clients = new Map();

const sendUserJoined = (clients, userName) => {
  const message = {
    message: `${userName} joined the chat`,
    date: +new Date(),
    type: 'SERVICE',
    msgId: uuidv4()
  };
  const res = JSON.stringify({ type: 'new-message', payload: [message] });
  [...clients.keys()].forEach((client) => {
    client.send(res);
  });
};

wss.on('connection', async (ws) => {
  const metadata = {
    userId: uuidv4(),
    userColor: Math.floor(Math.random() * 360), // number between 0-360 +  hsl(color, 60%, 60%) = is the color,
    userName: getDogName(), // nothing to do with Alcoholics Anonymous
    userAvatar: await getDogImage()
  };
  sendUserJoined(clients, metadata.userName);
  clients.set(ws, metadata);

  sendCurrentUsers(clients);
  setTimeout(() => {
    sendCurrentUsers(clients); // Some lit issue, send again to make sure everyone gets the new user
  }, 700);

  const currentUserData = JSON.stringify({
    type: 'my-info',
    payload: metadata
  });
  ws.send(currentUserData);

  ws.on('message', async (messageAsString) => {
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
    let currentClient;
    [...clients.keys()].forEach((client) => {
      client.send(res);
      if (client === ws) {
        currentClient = client;
      }
    });
    messages.addMessage(message);
    const botAnswer = await getBotAnswer(messageAsObject.message);
    if (botAnswer && currentClient) {
      currentClient.send(
        JSON.stringify({ type: 'new-message', payload: [botAnswer] })
      );
    }
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
  const botMeta = getBotMetaData();
  const users = [...clients.keys()].map((client) => clients.get(client));
  [...clients.keys()].forEach((client) => {
    client.send(
      JSON.stringify({
        type: 'new-user',
        payload: [botMeta, ...users]
      })
    );
  });
}
app.use('/messages', messages.router);

//start our server
server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
