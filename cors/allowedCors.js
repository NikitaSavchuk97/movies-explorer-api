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
  credentials: true,
};

module.exports = allowedCors;
