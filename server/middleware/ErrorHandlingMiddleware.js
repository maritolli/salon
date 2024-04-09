const ApiError = require('../error/ApiError');


module.exports = function (err, req, res, next) {
    if(err instanceof ApiError) {
        return res.status(err.status).json({message: err.message}); //статус кода + сообщение об ошибки
    }
    return res.status(500).json({message: 'Something went really wrong'});//для непредвиденных ошибок
}