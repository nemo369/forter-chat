const { uuidv4 } = require('../be-utils');
const BOT_NAME = 'BARK-E';
const BOT_ID = 'BOT_ID';
const BOT_COLOR = 0;
const getWelcomeMessages = () => {
  const texts = [
    `Wohff, Welcome my name is Bark-E and I am dog-bot here to serve you with your questions`,
    `My Owner created me in under 4 hours so he did not teach me much, but I can try to answer your questions. 
        Also he did'nt implement the tests bonus section so if there are any bugs or unclear answer you can go and bark at him,
        thats really annoys him
        `
  ];
  const welcomeMessage = texts.map((txt) => ({
    userId: BOT_ID,
    type: 'BOT',
    date: +new Date(),
    message: txt,
    msgId: uuidv4(),
    userName: BOT_NAME,
    userColor: BOT_COLOR
  }));

  return welcomeMessage;
};

module.exports = {
  getWelcomeMessages
};
