const express = require("express");
const {getAllUsers, postUser, getIdUser, updateUser, deleteUser} = require('./../controllers/userController')

const router = express.Router();

router.route('/')
    .get(getAllUsers)
    .post(postUser)

router.route('/:id')
    .get(getIdUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = router;