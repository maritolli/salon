const Router = require('express')
const router = new Router()
const clientController = require('../controllers/ClientController')

router.post('/registration', clientController.registration)
router.post('/login', clientController.login)
router.get('/auth', clientController.check)

module.exports = router