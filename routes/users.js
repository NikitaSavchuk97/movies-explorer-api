const router = require('express').Router();

const {
  getUserMe,
  updateUserById,
  logoutUser,
} = require('../controllers/users');

const {
  updateUserByIdValidation,
} = require('../middlewares/validations');

router.post('/signout', logoutUser);
router.get('/users/me', getUserMe);
router.patch('/users/me', updateUserByIdValidation, updateUserById);

module.exports = router;
