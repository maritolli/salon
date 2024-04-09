const {clients} = require('../models/models')
const ApiError = require('../error/ApiError');

class ClientController{
    async registration(req, res){

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
}

module.exports = new ClientController()