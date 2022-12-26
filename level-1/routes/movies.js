const router = require('express').Router();

const {
  getMovies,
  likeMovie,
  createMovie,
  dislikeMovie,
  deleteMovieById,
} = require('../controllers/movies');

const {
  likeMovieValidation,
  createMovieValidation,
  dislikeMovieValidation,
  deleteMovieByIdValidation,
} = require('../middlewares/validations');

router.get('/cards', getMovies);
router.post('/cards', createMovieValidation, createMovie);
router.put('/cards/:cardId/likes', likeMovieValidation, likeMovie);
router.delete('/cards/:cardId', deleteMovieByIdValidation, deleteMovieById);
router.delete('/cards/:cardId/likes', dislikeMovieValidation, dislikeMovie);

module.exports = router;
