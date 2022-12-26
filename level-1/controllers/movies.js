const Movie = require('../models/movie');

const BadRequestError400 = require('../errors/badRequestError');
const NotFoundError404 = require('../errors/notFoundError');
const ForbiddenError403 = require('../errors/forbiddenError');

module.exports.createMovie = (req, res, next) => {
	const {
		country,
		director,
		duration,
		year,
		description,
		image,
		trailerLink,
		thumbnail,
		movieId,
		nameRU,
		nameEN,
	} = req.body;

	const owner = req.user._id;

	Movie.create({
		country,
		director,
		duration,
		year,
		description,
		image,
		trailerLink,
		thumbnail,
		owner,
		movieId,
		nameRU,
		nameEN,
	})
		.then((movie) => res.send(movie))
		.catch((err) => {
			if (err.name === 'ValidationError') {
				next(new BadRequestError400('Некорректные данные одного из полей'));
			} else {
				next(err);
			}
		});
};

module.exports.getMovies = (req, res, next) => {
	Movie.find({})
		.then((movies) => res.send(movies))
		.catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
	const { movieId } = req.params;
	Movie.findById(movieId)
		.orFail(() => new NotFoundError404('Карточка по указанному _id не найден'))
		.then((card) => {
			if (!card.owner.equals(req.user._id)) {
				return next(new ForbiddenError403('Пытаетесь удалить чужую карточку'));
			}
			return card.remove()
				.then(() => res.status(200).send({ message: 'Карточка удалена' }));
		})
		.catch((err) => {
			if (err.name === 'CastError') {
				next(new BadRequestError400('Карточки с таким _id не существует'));
			} else {
				next(err);
			}
		});
};

/*
module.exports.likeMovie = (req, res, next) => {
	Movie.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
		.orFail(() => new NotFoundError404('Карточка по указанному _id не найден'))
		.then((card) => res.send(card))
		.catch((err) => {
			if (err.name === 'CastError') {
				next(new BadRequestError400('Карточки с таким _id не существует'));
			} else {
				next(err);
			}
		});
};

module.exports.dislikeMovie = (req, res, next) => {
	Movie.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
		.orFail(() => new NotFoundError404('Карточка по указанному _id не найден'))
		.then((card) => res.send(card))
		.catch((err) => {
			if (err.name === 'CastError') {
				next(new BadRequestError400('Карточки с таким _id не существует'));
			} else {
				next(err);
			}
		});
};
*/
