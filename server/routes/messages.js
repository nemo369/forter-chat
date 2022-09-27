const express = require('express');
const router = express.Router();
var fs = require('fs');
const { getWelcomeMessages } = require('./bot');
const { getJsonFromFile, writeJsonToFile } = require('./db');

router.get('/', async (req, res) => {
  const { messages } = await getJsonFromFile();
  messages.push(...getWelcomeMessages());
  res.send(messages);
});

async function addMessage(message, callback) {
  const json = await getJsonFromFile();
  json.messages.push(message);
  writeJsonToFile(json, () => {
    console.log('message added');
  });
}
module.exports = {
  addMessage,
  router
};
