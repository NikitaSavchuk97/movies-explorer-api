require('dotenv').config();

const jsonwebtoken = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const AuthError401 = require('../errors/authError');
const { needAuthUser } = require('../errors/errorsConstantsList');

module.exports = (req, res, next) => {
	const token = req.cookies.jwt;

	console.log(`TOKEN ${token}`);
	console.log(`JWT_SECRET ${JWT_SECRET}`);
	console.log(`NODE_ENV ${NODE_ENV}`);


	if (!token) {
		return next(new AuthError401(`${needAuthUser} 1`));
	}

	let payload;

	try {
		payload = jsonwebtoken.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
	} catch (err) {
		return next(new AuthError401(`${needAuthUser} 2`));
	}

	req.user = payload;

	return next();
};
