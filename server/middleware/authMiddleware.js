//декодируем токен и проверяем его на валидность

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; //разбиваем токен
        if (!token){
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.client = decoded
        next()
    } catch (e){
        res.status(401).json({message: "Не авторизован хз"})
    }
}