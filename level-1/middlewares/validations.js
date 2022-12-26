const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadRequestError400 = require('../errors/badRequestError');

const validateUrl = (url) => {
	const validate = isUrl(url);
	if (validate) {
		return url;
	}
	throw new BadRequestError400('Некорректный адрес URL');
};

const createUserValidation = celebrate({
	body: Joi.object().keys({
		name: Joi.string().min(2).max(30),
		email: Joi.string().required().email(),
		password: Joi.string().required(),
	}),
});

const loginUserValidation = celebrate({
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		password: Joi.string().required(),
	}),
});

const getUserByIdValidation = celebrate({
	params: Joi.object().keys({
		userId: Joi.string().length(24).hex(),
	}),
});

const updateUserByIdValidation = celebrate({
	body: Joi.object().keys({
		name: Joi.string().min(2).max(30),
		about: Joi.string().min(2).max(30),
	}),
});

const updateAvatarByIdValidation = celebrate({
	body: Joi.object().keys({
		avatar: Joi.string().required().custom(validateUrl),
	}),
});

const createMovieValidation = celebrate({
	body: Joi.object().keys({
		country: Joi.string().required(),
		director: Joi.string().required(),
		duration: Joi.number().required(),
		year: Joi.string().required(),
		description: Joi.string().required(),
		image: Joi.string().required().custom(validateUrl),
		trailerLink: Joi.string().required().custom(validateUrl),
		thumbnail: Joi.string().required().custom(validateUrl),
		movieId: Joi.number().required(),
		nameRU: Joi.string().required(),
		nameEN: Joi.string().required(),
	}),
});

const deleteMovieByIdValidation = celebrate({
	params: Joi.object().keys({
		movieId: Joi.string().hex().length(24),
	}),
});

const likeMovieValidation = celebrate({
	params: Joi.object().keys({
		cardId: Joi.string().hex().length(24),
	}),
});

const dislikeMovieValidation = celebrate({
	params: Joi.object().keys({
		cardId: Joi.string().hex().length(24),
	}),
});

module.exports = {
	createUserValidation,
	loginUserValidation,
	getUserByIdValidation,
	updateUserByIdValidation,
	updateAvatarByIdValidation,
	createMovieValidation,
	deleteMovieByIdValidation,
	likeMovieValidation,
	dislikeMovieValidation,
};
