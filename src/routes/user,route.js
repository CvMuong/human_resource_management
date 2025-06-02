const expres = require('express');
const router = expres.Router();
const { authorize } = require('../middlewares/role.middleware');
const { protect } = require('../middlewares/auth.middleware');
const { validateRegister, validateLogin } = require('../middlewares/validator.middleware');
const { handleValidation } = require('../middlewares/validate.middleware');

const userController = require('../controllers/user.controller');

router.post('/auth/register', validateRegister, handleValidation, userController.register);
router.post('/auth/login', validateLogin, handleValidation, userController.login);
router.get('/users/me', protect, userController.getMe);
router.get('/users', protect, authorize('admin'), userController.getAllUsers);
router.get('/users/:id', protect, authorize('admin'), userController.getUserById);
router.put('/users/:id', protect, authorize('admin'), userController.updateUser);
router.delete('/users/:id', protect, authorize('admin'), userController.deleteUser);

module.exports = router;