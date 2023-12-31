const express = require('express');
const userController = require('../controllers/userController')
const moneyController = require('../controllers/moneyController')
const router = express.Router()

router.route('/')
    .post(userController.createNewUser)
router.route('/getinfo')
    .post(userController.getUserInfo)
router.route('/login')
    .post(userController.getUser)
router.route('/mail')
    .post(userController.sendEmail)
router.route('/getTotal')
    .post(moneyController.getTotal)
router.route('/setBudget')
    .post(moneyController.setBudget)


module.exports = router
