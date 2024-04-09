const {orders, services} = require('../models/models')
const ApiError = require('../error/ApiError');

class OrderController{
    //добавление заказа
    async create(req, res){
        const {id_client} = req.body;
        const Orders = await orders.create({id_client});
        return res.json(Orders);
    }
    //вывод всех заказов
    async get(req, res){
        const Order = await orders.findAll()
        return res.json(Order)
    }
    async delete(req, res){

    }
}

module.exports = new OrderController()