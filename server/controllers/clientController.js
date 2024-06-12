const {clients, orders} = require('../models/models')
const ApiError = require('../error/ApiError');

const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')

//отдельно вынесенная функция создания токена
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
        const token = generateJwt(Client.id_client, Client.Login)
        return res.json({token});
    }

    async login(req, res, next){
        const {Login, Password} = req.body;
        const Client = await clients.findOne({where: {Login}})
        if (!Client){
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        let comparePassword = await bcrypt.compareSync(Password, Client.Password)
        if (!comparePassword){
            return next(ApiError.badRequest('Указан неверный пароль'))
        }
        const token = generateJwt(Client.id_client, Client.Login)
        return res.json({token})
    }

    async check(req, res, next){ //проверка на авторизацию ЧЕРЕЗ ТОКЕН
        //и создает новый токен, если чел постоянно пользуется акком для безопасности
        const token = generateJwt(req.id, req.login)
        return res.json({token})
    }

    async show_orders(req, res){
        //const token = generateJwt(req.id, req.login)
        const All_orders = await orders.findAll({where:{ClientIdClient: req.query.id}})
        console.log("COOL")
        return res.json(All_orders)
    }
}

module.exports = new ClientController()