const { talkerResolver, authResolver } = require('./validations');

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

module.exports = {
  validateLogin,
  authenticateUser,
  validateTalker,
};
