const {services} = require('../models/models')
const ApiError = require('../error/ApiError');

class ServiceController{
    async create(req, res){
        const {service_name, cost} = req.body;
        const services = await services.create(service_name, cost);
        return res.json(services);
    }
    async get(req, res){

    }
}

module.exports = new ServiceController()