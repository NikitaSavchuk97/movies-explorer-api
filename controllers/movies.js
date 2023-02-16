const Movie = require('../models/movie');
const BadRequestError400 = require('../errors/badRequestError');
const NotFoundError404 = require('../errors/notFoundError');
const ForbiddenError403 = require('../errors/forbiddenError');

const {
	noFoundDataFilm,
	notExistDataFilm,
	notYourDeleteFilm,
	incorrectDataForm,
} = require('../errors/errorsConstantsList');

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
				next(new BadRequestError400(incorrectDataForm));
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
		.orFail(() => new NotFoundError404(noFoundDataFilm))
		.then((movie) => {
			if (!movie.owner.equals(req.user._id)) {
				return next(new ForbiddenError403(notYourDeleteFilm));
			}
			return movie.remove().then(() => res.status(200).send({ message: 'Фильм удален' }));
		})
		.catch((err) => {
			if (err.name === 'CastError') {
				next(new BadRequestError400(notExistDataFilm));
			} else {
				next(err);
			}
		});
};
