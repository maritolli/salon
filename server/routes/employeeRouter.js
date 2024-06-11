const Router = require('express')
const router = new Router()
const EmployeeController = require('../controllers/EmployeeController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

//МОГУТ БЫТЬ ПРОБЛЕМЫ ИЗ-ЗА TRUE В checkRoleMiddleware

router.post('/', EmployeeController.create)
router.post('/login', EmployeeController.login)
router.get('/',EmployeeController.check)
router.get('/delete', checkRoleMiddleware ('true'), EmployeeController.delete)
router.get('/salary', checkRoleMiddleware ('true'), EmployeeController.show_salary)
router.get('/orders', checkRoleMiddleware ('true'), EmployeeController.show_orders)
router.get('/best', checkRoleMiddleware ('true'), EmployeeController.show_best_employees)
router.post('/bonus', checkRoleMiddleware ('true'), EmployeeController.give_bonus)

module.exports = router