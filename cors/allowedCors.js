const allowedCors = {
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:3001',
    'https://localhost:3001',
    'http://snv-project-movies.ru',
    'https://snv-project-movies.ru',
    'http://api-snv-project-movies.ru',
    'https://api-snv-project-movies.ru',
    'http://api.nomoreparties.co/beatfilm-movies',
    'https://api.nomoreparties.co/beatfilm-movies',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'cookies'],
  credentials: true,
};

module.exports = allowedCors;
