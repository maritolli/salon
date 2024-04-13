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
        // const Service_upd = await services.findOne({where: { id_service: 1 }})
        // if(Service_upd){
        //     Service_upd.service_name="Стрижка женская (средняя длина)"
        //     await Service_upd.save()
        // }
        // return res.json(Service_upd)
    }
}

module.exports = new ServiceController()