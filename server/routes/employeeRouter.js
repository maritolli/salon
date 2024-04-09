const Router = require('express')
const router = new Router()
const EmployeeController = require('../controllers/EmployeeController')

router.post('/',)
router.get('/', EmployeeController.check)

module.exports = router