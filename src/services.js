const fs = require('fs/promises');
const path = require('path');

const getTalkers = async () => {
  const url = path.join(__dirname, 'talker.json');
  const json = await fs.readFile(url, 'utf-8');
  const talkers = JSON.parse(json);
  return talkers;
};

const getTalkerById = async (talkerId) => {
  const talkers = await getTalkers();
  const talker = talkers.find(({ id }) => id === Number(talkerId));
  return talker;
};

const generateToken = () => {
  const rand = () => Math.random().toString(32).substring(2);
  const firstPart = rand();
  const token = firstPart + rand().substring(0, 16 - firstPart.length);
  return token;
};

module.exports = {
  getTalkers,
  getTalkerById,
  generateToken,
};
