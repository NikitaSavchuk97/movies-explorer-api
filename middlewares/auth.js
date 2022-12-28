const jsonwebtoken = require('jsonwebtoken');

require('dotenv').config();

const { JWT_SECRET = 'dev-secret' } = process.env;

const AuthError401 = require('../errors/authError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError401('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jsonwebtoken.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthError401('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
