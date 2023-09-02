const { V, resolver } = require('./validator');

const rate = V()
  .required('O campo "rate" é obrigatório')
  .integer('O campo "rate" deve ser um número inteiro entre 1 e 5')
  .min(1, 'O campo "rate" deve ser um número inteiro entre 1 e 5')
  .max(5, 'O campo "rate" deve ser um número inteiro entre 1 e 5');

const watchedAt = (fieldName) =>
  V()
    .required('O campo "watchedAt" é obrigatório')
    .regex(
      /^(([0-2][0-9])|3[0-1])\/((0[1-9])|(1[0-2]))\/[0-9]{4}$/,
      `O ${fieldName} deve ter o formato "dd/mm/aaaa"`,
    );

const talkerResolver = resolver({
  name: V()
    .required('O campo "name" é obrigatório')
    .min(3, 'O "name" deve ter pelo menos 3 caracteres'),
  age: V()
    .required('O campo "age" é obrigatório')
    .integer('O campo "age" deve ser um número inteiro igual ou maior que 18')
    .min(18, 'O campo "age" deve ser um número inteiro igual ou maior que 18'),
  talk: {
    rate,
    watchedAt: watchedAt('campo "watchedAt"'),
  },
});

const authResolver = resolver({
  email: V()
    .required('O campo "email" é obrigatório')
    .email('O "email" deve ter o formato "email@email.com"'),
  password: V()
    .required('O campo "password" é obrigatório')
    .min(6, 'O "password" deve ter pelo menos 6 caracteres'),
});

const searchResolver = {
  rate: resolver({ rate }),
  date: resolver({ date: watchedAt('parâmetro "date"') }),
};

module.exports = {
  talkerResolver,
  authResolver,
  searchResolver,
};
