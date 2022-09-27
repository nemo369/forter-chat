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
    `Woof, Welcome to the chat!<br /> My name is <b>${BOT_NAME}</b> and I am a <u>dog-bot</u> here to be your best friend and answer your questions.<br/> For example, try ask: <i>Are cats allowed in this support group?</i>`,
    `You can whistle me by tagging <b>@${BOT_NAME}</b> and I'll come running.`
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
    const possibleAnswer = 'TODO';
    if (possibleAnswer) {
      return {
        ...getBotObj(),
        message: 'txt'
      };
    }
  }

  const isBotTaged = message.toUpperCase().includes(`@${BOT_NAME}`);
  if (isBotTaged) {
    return {
      ...getBotObj(),
      message: `It seems you tagged me, Does that mean I'm gonna get fed now?`
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
