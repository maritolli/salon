//проверяем, имеет ли пользователь доступ к данной странице

const jwt = require("jsonwebtoken");

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]; //разбиваем токен
            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role){
                return res.status(403).json({message: "У вас нет доступа"})
            }
            req.client = decoded
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    }
}