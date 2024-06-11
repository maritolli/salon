//мб уберем и сделаем статичными

const Router = require('express')
const router = new Router()
const serviceController = require('../controllers/serviceController')

router.post('/', serviceController.create)
router.get('/', serviceController.get)

module.exports = router