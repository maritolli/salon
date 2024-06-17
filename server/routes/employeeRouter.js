const Router = require('express')
const router = new Router()
const EmployeeController = require('../controllers/EmployeeController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

//МОГУТ БЫТЬ ПРОБЛЕМЫ ИЗ-ЗА TRUE В checkRoleMiddleware

router.post('/registration', EmployeeController.create)
router.post('/login', EmployeeController.login)
router.get('/check',EmployeeController.check)
router.get('/delete', checkRoleMiddleware ('ADMIN'), EmployeeController.delete)
router.get('/salary', checkRoleMiddleware ("ADMIN"), EmployeeController.show_salary)
router.get('/orders/:id', checkRoleMiddleware ('EMPLOYEE'), EmployeeController.show_orders)
router.get('/best', checkRoleMiddleware ('ADMIN'), EmployeeController.show_best_employees)
router.post('/bonus', checkRoleMiddleware ('ADMIN'), EmployeeController.give_bonus)
router.get('/clients', checkRoleMiddleware ('ADMIN'), EmployeeController.show_clients)

module.exports = router