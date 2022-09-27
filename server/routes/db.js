var fs = require('fs');
// I USED LOCAL JSON FILE FOR TESTING PURPOSES, In real world will just swap this with mongo db etc...
const filename = './db/db.json';
function writeJsonToFile(json, callback) {
  try {
    fs.writeFile(filename, JSON.stringify(json, null, 4), callback);
  } catch (error) {
    console.log(error);
  }
}
async function getJsonFromFile() {
  try {
    const data = fs.readFileSync(filename);
    const json = JSON.parse(data);
    return Promise.resolve(json);
  } catch (error) {
    console.log(error);
    return { messages: [] };
  }
}

module.exports = {
  writeJsonToFile,
  getJsonFromFile
};
