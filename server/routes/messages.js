const express = require('express');
const router = express.Router();
var fs = require('fs');

const filename = './db/db.json';
function writeJsonToFile(json, callback) {
  try {
    fs.writeFile(filename, JSON.stringify(json,null,4), callback);
    
  } catch (error) {
    console.log(error);
  }
}
function getJsonFromFile() {
  const data = fs.readFileSync(filename);
  return JSON.parse(data);
}

router.get('/', (req, res) => {
  const db = getJsonFromFile();
  res.send(db.messages);
});

function addMessage(message, callback) {
  const json = getJsonFromFile();
  json.messages.push(message);
  writeJsonToFile(json, ()=>{
    console.log('message added')
  });
}
module.exports = {
  addMessage,
  router
};
