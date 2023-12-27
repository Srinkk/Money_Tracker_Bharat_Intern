const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router()

router.route('/')
    .post(userController.createNewUser)
router.route('/login')
    .post(userController.getUser)


module.exports = router
