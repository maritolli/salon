const Router = require('express')
const router = new Router()
const clientController = require('../controllers/ClientController')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/registration', clientController.registration) //создание метода
router.post('/login', clientController.login)
router.get('/auth', authMiddleware, clientController.check) //проверяет, авторизован ли пользователь
router.get('/orders/:id', authMiddleware, clientController.show_orders) //выводит все заказы пользователя

module.exports = router