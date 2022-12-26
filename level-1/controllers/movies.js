const Card = require('../models/movie');

const BadRequestError400 = require('../errors/badRequestError');
const NotFoundError404 = require('../errors/notFoundError');
const ForbiddenError403 = require('../errors/forbiddenError');

module.exports.createMovie = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError400(`Некорректные данные: ${name} или ${link}`));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
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

module.exports.likeMovie = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
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
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
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
