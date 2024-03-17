const express = require('express')
const router = express.Router()
const { addUsers_controller, getAgeDistribution_controller } = require('../controller/UserController')


router.route('/addusers').post(addUsers_controller)
router.route('/agedistribution').get(getAgeDistribution_controller)

module.exports = router