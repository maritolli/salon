const {orders, position, services, employees_services} = require('../models/models')
const ApiError = require('../error/ApiError');
const {Op} = require("sequelize");


class OrderController{
    //добавление заказа
    //пока есть такая идея: заказ будет создаваться с 1 или несколькими услугами, так вот
    //добавляя услугу мы будет конкатенировать к id_service услугу и знак and
    // Пример: человек выбрал стрижку мужскую и бороды id_service="1and2"
    async create(req, res){
        const {Id_client, Id_service, Id_employee, Order_date } = req.body;
        if(Id_service.length > 1){
            //Найдём сначала общую стоимость
            let Total = 0
            const all_cost = await services.findAll({
                where:{
                    id_service: Id_service
                }
            })
            for(let i = 0; i < Id_service.length; ++i){
                Total = Total + all_cost[i].cost
            }
            //Затем добавим запись в таблицу заказов
            const Orders = await orders.create({
                order_date: Order_date, total_sum: Total, ClientIdClient:Id_client
            })
            console.log(JSON.stringify(Orders))

            //Далее добавим строки в таблицу position
            for(let i = 0; i < Id_employee.length; ++i){
                for(let j = 0; j < Id_service.length; j++){
                    //выполняет ли сотрудник данную услугу
                    const check_employee_service = await employees_services.findOne({
                        where:{
                            ServiceIdService: Id_service[j],
                            EmployeeIdEmployee: Id_employee[i]
                        }
                    })
                    //Если существует соотношения услуга-работник, то добавляем
                    if(check_employee_service){
                        const New_position = await position.create({
                            OrderIdOrder: Orders.id_order,
                            ServiceIdService: Id_service[j],
                            EmployeeIdEmployee: Id_employee[i]
                        })
                        console.log(JSON.stringify(`Created position with id service: ${Id_service[j]} ,id_employee: ${Id_employee[i]}`))
                    }
                }
            }
            return res.json(Orders);
        }
        else{
            const total = await services.findAll({
                attributes:['cost'],
                where:{
                    id_service:{[Op.eq]:Id_service[0]}
                }
            })
            //Вот эта божественная переменная спасёт мир
            //парсим массив и берем 1 переменную, в которой как раз лежит заветное число
            const total_in_json = JSON.parse(JSON.stringify(total[0].dataValues))
            const Orders = await orders.create({order_date: Order_date, total_sum: total_in_json.cost, ClientIdClient:Id_client})
            const Position = await position.create({OrderIdOrder: Orders.id_order, ServiceIdService: Id_service[0], EmployeeIdEmployee:Id_employee[0]})
            console.log(JSON.stringify(Position))
            return res.json(Orders);
        }


    }
    //вывод всех заказов
    async get(req, res){
        const Order = await orders.findAll()
        return res.json(Order)
    }

    async delete(req, res){
        const Position = await position.destroy({where:{OrderIdOrder: req.query.id_order}})
        const Orders = await orders.destroy( {where:{id_order: req.query.id_order}});
        return res.json("Deleted")
    }
}

module.exports = new OrderController()