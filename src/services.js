const fs = require('fs/promises');
const path = require('path');

const pathTalker = path.join(__dirname, 'talker.json');

const getTalkers = async () => {
  const json = await fs.readFile(pathTalker, 'utf-8');
  const talkers = JSON.parse(json);
  return talkers;
};

const getTalkerById = async (talkerId) => {
  const talkers = await getTalkers();
  const talker = talkers.find(({ id }) => id === Number(talkerId));
  return talker;
};

const setTalkers = async (talkers) => fs.writeFile(pathTalker, JSON.stringify(talkers));

const addTalker = async (data) => {
  const result = await getTalkers();
  const talker = { ...data, id: result.length + 1 };
  const talkers = result.concat(talker);
  await setTalkers(talkers);
  return talker;
};

const updateTalker = async (id, data) => {
  const result = await getTalkers();
  const talker = { ...data, id };
  const talkers = result.map((item) => (item.id === id ? talker : item));
  await setTalkers(talkers);
  return talker;
};

const deleteTalker = async (id) => {
  const result = await getTalkers();
  const talkers = result.filter((item) => item.id !== id);
  await setTalkers(talkers);
};

module.exports = {
  getTalkers,
  getTalkerById,
  addTalker,
  updateTalker,
  deleteTalker,
};
