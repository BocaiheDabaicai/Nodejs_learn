const express = require("express");
const {getAllUsers, postUser, getIdUser, updateUser, deleteUser} = require('./../controllers/userController')
const authController = require('../controllers/authController')

const router = express.Router();

router.post('/signup',authController.signup)
router.post('/login',authController.login)

router.route('/')
    .get(getAllUsers)
    .post(postUser)

router.route('/:id')
    .get(getIdUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = router;