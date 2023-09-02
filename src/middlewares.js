const {
  talkerResolver,
  authResolver,
  rateResolver,
  dateResolver,
} = require('./validations');
const { getTalkerById } = require('./services');

const validateLogin = (req, res, next) => {
  const message = authResolver(req.body);
  if (message) return res.status(400).json({ message });

  next();
};

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (typeof token === 'string' && token.length === 16) {
    return next();
  }

  return res.status(401).json({ message: 'Token inválido' });
};

const validateTalker = (req, res, next) => {
  const message = req.body.talk
    ? talkerResolver(req.body)
    : 'O campo "talk" é obrigatório';

  if (message) return res.status(400).json({ message });

  next();
};

const talkerExists = async (req, res, next) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);

  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  req.talker = talker;
  next();
};

const validateSearch = (req, res, next) => {
  const { rate, date } = req.query;
  let message;
  if (rate) message = rateResolver({ rate: Number(rate) });
  if (date) message = dateResolver({ date });
  if (message) return res.status(400).json({ message });
  next();
};

const validateUpdate = (req, res, next) => {
  const message = rateResolver({ rate: req.body.rate });
  if (message) return res.status(400).json({ message });
  next();
};

module.exports = {
  validateLogin,
  authenticateUser,
  validateTalker,
  talkerExists,
  validateSearch,
  validateUpdate,
};
