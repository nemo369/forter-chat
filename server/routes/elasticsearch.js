var stringSimilarity = require('string-similarity'); // No ElasticSearch in this example, just using string similarity
const { getJsonFromFile } = require('./db');

const getPossibleAnswer = async (question) => {
  const { prevAnswer, similarQuestion } = await getSimilarQuestions(question);
  if (similarQuestion?.message && prevAnswer?.message) {
    return `<i>${similarQuestion.userName}</i> already asked this question (You should start paying attention) and the answer was: <b>${prevAnswer.message}</b>`;
  }
  if (similarQuestion?.message) {
    return `This question was already asked by ${similarQuestion.userName} but <b>no dog answered it yet</b>.`;
  }
  return null;
};

const getSimilarQuestions = async (question) => {
  question = question.toLowerCase();
  const { messages } = await getJsonFromFile();
  const similarQuestionIndex = messages.reverse().findIndex(({ message }) => {
    message = message.toLowerCase();
    // return message.includes(question);
    var similarity = stringSimilarity.compareTwoStrings(message, question);
    return similarity > 0.6;
  });

  return {
    similarQuestion: messages[similarQuestionIndex],
    prevAnswer: messages[similarQuestionIndex - 1] // reverse is mutating the array so we need to get the previous answer
  };
};

module.exports = {
  getPossibleAnswer
};
