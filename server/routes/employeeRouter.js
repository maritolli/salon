const Router = require('express')
const router = new Router()
const EmployeeController = require('../controllers/EmployeeController')


router.post('/', EmployeeController.create)
router.get('/',EmployeeController.check)
router.get('/delete',EmployeeController.delete)
router.get('/salary',EmployeeController.show_salary)
router.get('/orders',EmployeeController.show_orders)

module.exports = router