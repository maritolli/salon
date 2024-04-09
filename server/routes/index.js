//основной роутер всего приложения, объединяет другие

const Router = require('express')
const router = new Router()
const clientRouter = require('./clientRouter')
const serviceRouter = require('./serviceRouter')
const employeeRouter = require('./employeeRouter')
const orderRouter = require('./orderRouter')

//сопоставили маршруты и роутеры
router.use('/client', clientRouter)
router.use('/employee', employeeRouter)
router.use('/order', orderRouter)
router.use('/service', serviceRouter)


module.exports = router