const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')


router.post('/', orderController.create)
router.post('/delete', orderController.delete)
router.get('/', orderController.get)

module.exports = router