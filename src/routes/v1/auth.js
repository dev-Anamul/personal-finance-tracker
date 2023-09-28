const router = require('express').Router();
const authController = require('../../api/v1/auth');
const authenticate = require('../../middleware/authenticate');

// use the router
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.patch('/update-password', authenticate, authController.updatePassword);
router.patch('/update-profile', authenticate, authController.updateProfile);
router.get('/profile', authenticate, authController.getProfile);
router.delete('/delete-account', authenticate, authController.deleteMe);

// export the router
module.exports = router;
