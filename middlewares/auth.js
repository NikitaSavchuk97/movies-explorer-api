require('dotenv').config();

const jsonwebtoken = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const AuthError401 = require('../errors/authError');

const { needAuthUser } = require('../errors/errorsConstantsList');

module.exports = (req, res, next) => {

	const token = req.cookies.jwt;

	//console.log(req.body);
	//console.log(token);

	if (!token) {
		return next(new AuthError401(`${needAuthUser} 1`));
	}

	let payload;

	try {
		payload = jsonwebtoken.verify(token, JWT_SECRET);
	} catch (err) {
		return next(new AuthError401(`${needAuthUser} 2`));
	}

	req.user = payload;

	return next();
};
