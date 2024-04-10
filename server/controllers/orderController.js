const {orders, position, services} = require('../models/models')
const ApiError = require('../error/ApiError');
const {Op} = require("sequelize");


class OrderController{
    //добавление заказа
    //пока есть такая идея: заказ будет создаваться с 1 или несколькими услугами, так вот
    //добавляя услугу мы будет конкатенировать к id_service услугу и знак and
    // Пример: человек выбрал стрижку мужскую и бороды id_service="1and2"
    async create(req, res){
        const {id_client, Id_service, id_employee } = req.body;
        const Order_date = new Date();
        const help_str = Id_service.toString();
        if(help_str.includes("and")){

        }
        else{
            const total = await services.findAll({
                attributes:['cost'],
                where:{
                    id_service:{[Op.eq]:Id_service}
                }
            })
            //Вот эта божественная переменная спасёт мир
            const total_in_json = JSON.parse(JSON.stringify(total[0].dataValues))

            const Orders = await orders.create({order_date: Order_date, total_sum: total_in_json.cost})

            return res.json(Orders);
        }


    }
    //вывод всех заказов
    async get(req, res){
        //const Order = await orders.findAll()
        //return res.json(Order)

        const Total = await services.findAll({
            attributes:['cost'],
            where:{
                id_service: 1
            }
        })
        const total_kkk= await services.findAll();
        total_kkk.forEach((item)=>{
            //console.log(item.dataValues);
        })
        const a = JSON.parse(JSON.stringify(Total[0].dataValues))
        console.log(a.cost);

        return res.json(Total)
    }
    async delete(req, res){
        const Orders = await orders.destroy( {where:{id_order: 1}})

        return res.json(Orders)
    }
}

module.exports = new OrderController()