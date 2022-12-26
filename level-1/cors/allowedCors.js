const allowedCors = {
	origin: [
		'http://localhost:3000',
		'https://localhost:3000',
		'http://localhost:3001',
		'https://localhost:3001',
		'http://snv.movies.nomoredomains.club',
		'https://snv.movies.nomoredomains.club',
		'http://api.snv.movies.nomoredomains.club',
		'https://api.snv.movies.nomoredomains.club',
	],
	methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
	preflightContinue: false,
	optionsSuccessStatus: 204,
	allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'cookies'],
	credentials: true,
};

module.exports = allowedCors;
