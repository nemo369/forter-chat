const fetch = require('node-fetch');

const getDogImage = async () => {
  const API_URL = 'https://dog.ceo/api/breeds/image/random'; //
  const res = await fetch(API_URL);
  const { message } = await res.json();
  return message;
};
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
    'Sherlock Bones',
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

module.exports = {
  uuidv4,
  getDogName,
  getDogImage
};
