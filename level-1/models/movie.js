const mongoose = require('mongoose');

const isUrl = require('validator/lib/isURL');

const cardSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Невалидный ЮРЛ адрес',
    },
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Невалидный ЮРЛ адрес',
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Невалидный ЮРЛ адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
