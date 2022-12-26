const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

const {
  createMovieValidation,
  deleteMovieByIdValidation,
} = require('../middlewares/validations');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidation, createMovie);
router.delete('/movies/:movieId', deleteMovieByIdValidation, deleteMovieById);

module.exports = router;
