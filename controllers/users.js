require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const AuthError401 = require('../errors/authError');
const BadRequestError400 = require('../errors/badRequestError');
const ConflictError409 = require('../errors/conflictError');
const NotFoundError404 = require('../errors/notFoundError');

const {
	incorrectEmailOrPasswordUser,
	emailDataBusyUser,
	noFoundDataUser,
	incorrectDataForUpdateUser,
	incorrectDataForm,
	incorrectData,
} = require('../errors/errorsConstantsList');

module.exports.loginUser = (req, res, next) => {
	const { email, password } = req.body;
	return User.findUserByCredentials({ email, password })
		.then((user) => {
			const token = jwt.sign(
				{ _id: user._id },
				NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
				{ expiresIn: 3600 },
			);
			res
				.cookie('jwt', token, {
					maxAge: 3600000 * 24 * 7,
					sameSite: true,
					httpOnly: true,
					secure: true,
				})
				.send({ token, message: `Выполнен вход в аккаунт ${user.email}` });
		})
		.catch(() => {
			next(new AuthError401(incorrectEmailOrPasswordUser));
		});
};

module.exports.logoutUser = (req, res) => {
	res.clearCookie('jwt', { path: '/' }).send({ message: 'Выход пользователя из профиля прошел успешно' });
};

module.exports.createUser = (req, res, next) => {
	const { name, email, password } = req.body;
	bcrypt
		.hash(password, 10)
		.then((hash) => User.create({
			name, email, password: hash,
		}))
		.then((user) => res.status(201).send({
			name: user.name,
			email: user.email,
		}))
		.catch((err) => {
			if (err.code === 11000) {
				next(new ConflictError409(emailDataBusyUser));
			} else if (err.name === 'ValidationError') {
				next(new BadRequestError400(incorrectDataForm));
			} else {
				next(err);
			}
		});
};

module.exports.getUserMe = (req, res, next) => {
	User.findById(req.user._id)
		.orFail(() => new NotFoundError404(noFoundDataUser))
		.then((items) => res.status(200).send(items))
		.catch((err) => {
			if (err.name === 'CastError') {
				next(new BadRequestError400(incorrectData));
			} else if (err.kind === 'ObjectId') {
				next(new BadRequestError400(incorrectData));
			} else {
				next(err);
			}
		});
};

module.exports.updateUserById = (req, res, next) => {
	const owner = req.user._id;
	const { name, email } = req.body;
	User.findByIdAndUpdate(owner, { name, email }, { new: true, runValidators: true })
		.orFail(() => new NotFoundError404(noFoundDataUser))
		.then((user) => res.send(user))
		.catch((err) => {
			if (err.name === 'ValidationError' || err.name === 'CastError') {
				next(new BadRequestError400(incorrectDataForUpdateUser));
			} else {
				next(err);
			}
		});
};
