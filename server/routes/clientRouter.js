const Router = require('express')
const router = new Router()
const clientController = require('../controllers/ClientController')

router.post('/registration', clientController.registration) //создание метода
router.post('/login', clientController.login)
router.get('/auth', clientController.check) //проверяет, авторизован ли пользователь
router.get('/orders', clientController.show_orders) //выводит все заказы пользователя

module.exports = router