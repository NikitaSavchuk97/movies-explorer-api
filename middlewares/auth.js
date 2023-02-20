require('dotenv').config();

const jsonwebtoken = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const AuthError401 = require('../errors/authError');

const { needAuthUser } = require('../errors/errorsConstantsList');

module.exports = (req, res, next) => {
	const token = req.cookies.jwt;

	//console.log(token);

	if (!token) {
		return next(new AuthError401(needAuthUser));
	}

	let payload;

	try {
		payload = jsonwebtoken.verify(token, JWT_SECRET);
		console.log(JWT_SECRET);
	} catch (err) {
		return next(new AuthError401(needAuthUser));
	}

	req.user = payload;

	return next();
};
