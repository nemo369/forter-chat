const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const app = express();

const messages = require('./routes/messages');


app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({ port: 7071 });
const clients = new Map();





wss.on('connection', (ws) => {
  const metadata = {
    id: uuidv4(),
    color: Math.floor(Math.random() * 360), // number between 0-360 +  hsl(color, 60%, 60%) = is the color,
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

    };
    const res = JSON.stringify({ type: 'new-message', payload: [message] });
    [...clients.keys()].forEach((client) => {
      client.send(res);
    });
    messages.addMessage(message)
  });

  ws.on('close', () => {
    clients.delete(ws);
    sendCurrentUsers(clients);

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

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getDogName() {
  const dogNames = [
    'Bark wallberg',
    'Obi Wag Kenobi',
    'Sherlock Bones Edogson',
    'Snoopy',
    'Bark Obama',
    'Lassie',
    'Beethoven',
    'Rin Tin Tin',
    'Old Yeller',
    'Benji',
    'Scooby Doo',
    'Air Bud',
    'Bark Twain',
    'Lady and the Tramp',
    'Anonymous Dog'
  ];

  return dogNames[Math.floor(Math.random() * dogNames.length)];
}
