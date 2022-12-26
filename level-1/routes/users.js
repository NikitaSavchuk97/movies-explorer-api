const router = require('express').Router();

const {
  getUserMe,
  updateUserById,
} = require('../controllers/users');

const {
  updateUserByIdValidation,
} = require('../middlewares/validations');

router.get('/users/me', getUserMe);
router.patch('/users/me', updateUserByIdValidation, updateUserById);

module.exports = router;
