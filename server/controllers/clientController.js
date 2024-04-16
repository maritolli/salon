const {clients, orders} = require('../models/models')
const ApiError = require('../error/ApiError');

class ClientController{
    async registration(req, res){
        const {Fname, Login, Password} = req.body;
        const Client = await clients.create({Fname, Login, Password});
        return res.json(Client);

    }
    async login(req, res){

    }

    async check(req, res, next){ //проверка на авторизацию
        const {id} = req.query //простая проверка на ошибки
        if (!id){
            return next(ApiError.badRequest('Не задан ID'))
        }
        res.json(id)
    }

    async show_orders(req, res){
        const All_orders = await orders.findAll({where:{ClientIdClient: req.query.id}})
        console.log("COOL")
        return res.json(All_orders)
    }
}

module.exports = new ClientController()