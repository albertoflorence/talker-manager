const generateToken = () => {
  const rand = () => Math.random().toString(32).substring(2);
  const firstPart = rand();
  const token = firstPart + rand().substring(0, 16 - firstPart.length);
  return token;
};

module.exports = {
  generateToken,
};
