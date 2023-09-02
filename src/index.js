const express = require('express');
const { getTalkers, getTalkerById, addTalker, updateTalker } = require('./services');
const { generateToken } = require('./utils');
const { validateLogin, authenticateUser, validateTalker } = require('./middlewares');

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

app.get('/talker', async (req, res) => {
  const talkers = await getTalkers();
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(talker);
});

app.post('/login', validateLogin, (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

app.post('/talker', authenticateUser, validateTalker, async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = await addTalker({ name, age, talk });
  return res.status(201).json(talker);
});

app.put('/talker/:id', authenticateUser, validateTalker, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talker = await getTalkerById(id);

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  const updatedTalker = await updateTalker(Number(id), { name, age, talk });

  return res.status(200).json(updatedTalker);
});
