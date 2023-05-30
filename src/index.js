const express = require('express');
const token = require('crypto');
const fs = require('fs').promises;
const getTalkers = require('./utils/getTalkers');
const { validateEmail, validatePassword } = require('./middlewares/validateLogin');
const { validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  validateToken } = require('./middlewares/validateTalker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talkers = await getTalkers();
  if (!talkers) return res.status(HTTP_OK_STATUS).json([]);
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await getTalkers();
  const talker = talkers.find((talk) => talk.id === Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const tokenGenerate = token.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token: tokenGenerate });
});

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt, async (req, res) => {
    const talkers = await getTalkers();
    const { name, age, talk } = req.body;
    const id = talkers.length + 1;
    const newTalker = { name, age, id, talk };
    talkers.push(newTalker);
    await fs.writeFile(`${__dirname}/talker.json`, JSON.stringify(talkers));
    return res.status(201).json(newTalker);
  });