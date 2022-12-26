const router = require('express').Router();

const {
	getMovies,
	likeMovie,
	createMovie,
	dislikeMovie,
	deleteMovieById,
} = require('../controllers/movies');

const {
	//likeMovieValidation,
	createMovieValidation,
	//dislikeMovieValidation,
	deleteMovieByIdValidation,
} = require('../middlewares/validations');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidation, createMovie);
//router.put('/movies/:cardId/likes', likeMovieValidation, likeMovie);
router.delete('/movies/:movieId', deleteMovieByIdValidation, deleteMovieById);
//router.delete('/movies/:cardId/likes', dislikeMovieValidation, dislikeMovie);

module.exports = router;
