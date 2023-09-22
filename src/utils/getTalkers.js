const fs = require('fs').promises;

const talkersFile = 'src/talker.json';
const getTalkers = async () => {
  const talkers = await fs.readFile(talkersFile);
  return JSON.parse(talkers);
};

module.exports = getTalkers;