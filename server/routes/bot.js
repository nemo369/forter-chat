const { uuidv4 } = require('../be-utils');
const BOT_NAME = 'BARK-E';
const BOT_ID = 'BOT_ID';
const BOT_COLOR = 140;

const getBotMetaData = () => ({
  userId: BOT_ID,
  userColor: BOT_COLOR,
  userName: BOT_NAME,
  userAvatar: BOT_AVATAR
});
const getBotObj = () => {
  return {
    ...getBotMetaData(),
    type: 'BOT',
    date: +new Date(),
    message: '',
    msgId: uuidv4()
  };
};
const getWelcomeMessages = () => {
  const texts = [
    `Wohff, Welcome my name is Bark-E and I am dog-bot here to serve you with your questions`,
    `My Owner created me in under 4 hours so he did not teach me much, but I can try to answer your questions. 
        Also he did'nt implement the tests bonus section so if there are any bugs or unclear answer you can go and bark at him,
        thats really annoys him
        `,
    `Remmber you can always tag me with @${BOT_NAME} and I will be running at you wagging my tail with a no clue face`
  ];
  const welcomeMessage = texts.map((txt) => ({
    ...getBotObj(),
    message: txt
  }));

  return welcomeMessage;
};

const getBotAnswer = async (message) => {
  const isQuestion = message.includes('?');
  if (isQuestion) {
    const possilbeAnswer = 'TODO';
    if (possilbeAnswer) {
      return {
        ...getBotObj(),
        message: 'txt'
      };
    }
  }

  const isBotTaged = message.toUpperCase().includes(`@${BOT_NAME}`);
  console.log('isBotTaged', isBotTaged);
  if (isBotTaged) {
    return {
      ...getBotObj(),
      message: 'It seems you tagged me, Is that mean im gonna get fed now?'
    };
  }
  return null;
};

module.exports = {
  getWelcomeMessages,
  getBotAnswer,
  getBotMetaData
};

const BOT_AVATAR =
  'https://res.cloudinary.com/nemo-frenkel/image/upload/v1664198014/barake_ewzocu.webp';
