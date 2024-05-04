const {clients, orders} = require('../models/models')
const ApiError = require('../error/ApiError');

const bcrypt = require ('bcrypt')

class ClientController{
    async registration(req, res, next){
        const {Fname, Login, Password} = req.body; //получили из тела запроса
        if (!Fname || !Login || !Password){ //если что-то не ввели
            return next(ApiError.badRequest('Некорректный email, пароль или имя пользователя'))
        }
        const candidate = await clients.findOne({where: {Login}}) //проверка на существование пользователя
        if (candidate){ //если вернулся и непустой
            return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5) //хэшируем пароль
        const Client = await clients.create({Fname, Login, Password: hashPassword});
        const orders
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