const express = require('express');
const {
  getAllUsers,
  updateMe,
  deleteMe,
  postUser,
  getIdUser,
  updateUser,
  deleteUser,
} = require('./../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword,
);
router.patch('/updateMe',authController.protect,updateMe)
router.delete('/deleteMe',authController.protect,deleteMe)

router.route('/').get(getAllUsers).post(postUser);

router.route('/:id').get(getIdUser).patch(updateUser).delete(deleteUser);

module.exports = router;