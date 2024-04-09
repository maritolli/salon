const {services} = require('../models/models')
const ApiError = require('../error/ApiError');

//////////////////////////////////////////////////////////
//НЕ ПУТАТЬ БОЛЬШУЮ/МАЛЕНЬКУЮ БУКВУ, НЕ ПУТАТЬ ОКОНЧАНИЯ//
//////////////////////////////////////////////////////////

class ServiceController{
    //добавление услуги
    async create(req, res){
        const {service_name, cost} = req.body;
        const Services = await services.create({service_name, cost});
        return res.json(Services);
    }
    //вывод всех услуг
    async get(req, res){
        const Service = await services.findAll()
        return res.json(Service)
    }
}

module.exports = new ServiceController()