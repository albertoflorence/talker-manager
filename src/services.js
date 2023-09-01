const fs = require('fs/promises');
const path = require('path');

const getTalkers = async () => {
  const url = path.join(__dirname, 'talker.json');
  const json = await fs.readFile(url, 'utf-8');
  const talkers = JSON.parse(json);
  return talkers;
};

module.exports = {
  getTalkers,
};
