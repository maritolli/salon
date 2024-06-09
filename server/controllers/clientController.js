const {clients, orders} = require('../models/models')
const ApiError = require('../error/ApiError');

const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')

const generateJwt = (id, login) => {
    return jwt.sign(
        {id, login}, //центр часть токена, куда данные вшиваются
        process.env.SECRET_KEY, //любой секретный ключ, задаем его в .env
        {expiresIn: '24h'} //сколько живет токен
    )
}

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
        const hashPassword = await bcrypt.hash(Password, 5) //хэшируем пароль (и сколько раз)
        const Client = await clients.create({Fname, Login, Password: hashPassword});
        const token = generateJwt(clients.ClientIdClient, clients.login)
        return res.json(Client);
    }

    async login(req, res, next){
        const {Login, Password} = req.body;
        const Client = await clients.findOne({where: {Login}})
        if (!Client){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = await bcrypt.compareSync(Password, clients.Password);
        if (!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(clients.ClientIdClient, clients.Login);
        return res.json({token})
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