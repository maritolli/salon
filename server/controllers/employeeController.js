const {employees, orders, position, services, employees_services} = require('../models/models')
const ApiError = require('../error/ApiError');
const Employee = require("../models/models");
const { Op, QueryTypes, fn, col} = require("sequelize");


class EmployeeController{

    async create(req, res){
        const {Fname, Login, Password, Specialization, Salary, Bonus} = req.body;
        const Employee = await employees.create({
            fname: Fname,
            login: Login,
            password: Password,
            specialization: Specialization,
            salary: Salary,
            bonus: Bonus
        });
        if(Employee){
            Employee.role=false
            await Employee.save()
        }


        ////////////////////////////////////////////////
        //Следующий кусок кода добавляет информацию о сотруднике
        // в таблицу employees_services в зависимости от специализации конечно
        ///////////////////////////////////////////////
        const local_specialization = Employee.specialization
        const local_id = Employee.id_employee

        if(local_specialization === 'Парикмахер'){
            //Select... where service_name like any [...]
            const all_services = await services.findAll( {where: {
                    service_name: {[Op.like]: {
                            [Op.any]: ['%Стрижка%','%Мытье%', 'Окрашивание']
                        }}
                }, order: [['id_service', 'ASC']]})
            for(let service of all_services){
                await employees_services.create({
                    ServiceIdService: service.id_service,
                    EmployeeIdEmployee: local_id
                })
            }
        }
        else if(local_specialization === 'Массажист'){
            const all_services = await services.findAll( {where: {
                    service_name: {[Op.like]: {
                            [Op.any]: ['%Массаж%']
                        }}
                }, order: [['id_service', 'ASC']]})
            for(let service of all_services){
                await employees_services.create({
                    ServiceIdService: service.id_service,
                    EmployeeIdEmployee: local_id
                })
            }
        }
        else{
            const all_services = await services.findAll( {where: {
                    service_name: {[Op.like]: {
                            [Op.any]: ['%Маникюр%', '%Педикюр%']
                        }}
                }, order: [['id_service', 'ASC']]})
            for(let service of all_services){
                await employees_services.create({
                    ServiceIdService: service.id_service,
                    EmployeeIdEmployee: local_id
                })
            }
        }

        return res.json(Employee);
    }
    async login(req, res){

    }
    async check(req, res){
        //На будущее варианты как можно обновлять строку, upsert нах**, он не работает
        //const update_role = await employees.update({role: false}, {where: {id_employee: 1}})
        // const update_specialization = await employees.findAll()
        // for(let employee of update_specialization){
        //     employee.specialization= "Парикмахер"
        //     await employee.save()
        // }
        // return res.json("ALL HAVE WORKED CORRECTLY AND DATABASE CHANGED")

        //Select... where service_name like any [...]


    }
    async delete(req, res){
        const Employee = await employees.destroy({where: {id_employee: req.query.id}});
        await employees_services.destroy({where: {id_employee: req.query.id_employee}})//в этой таюлице тоже удалим сотрудника
        return res.json(Employee)
    }
    async show_salary(req, res){
        const Employee_sal = await employees.findOne({where: {id_employee: req.query.id}})
        if(!Employee_sal){return res.json("NO USER")}
        return res.json(Employee_sal.salary)
    }
    async show_orders(req, res){
        //Вообще я тут проверял на то, чтобы конкретный сотрудник дважды в одном заказе не был
        //Но с человеческой точки зрения если он две услуги делает, то это двойная работа
        //Следовательно это будет учитываться
        const results = await orders.findAll({
            include: {
                model: position,
                attributes: ['EmployeeIdEmployee'],
                required: true
            },
        }, {where: {id_employee: req.query.id}});

        if(!results){return res.json("THIS EMPLOYEE HAS NO ORDERS")}//
        return res.json(results)
    }

    //Эта функция выводит сотрудников и количество заказов у них
    async show_best_employees(req, res){
        const Best_employees = await position.findAll({
            attributes: ['EmployeeIdEmployee', [fn('count', col('OrderIdOrder')), 'orders_count']],
            group: ['Position.EmployeeIdEmployee'],
            order: [['EmployeeIdEmployee','ASC']]
        })
        return res.json(Best_employees)
    }

    //Выдача премии активным сотрудникам
    async give_bonus(req, res){
        const {Id_employee, bonus} = req.body
        const Chosen_employee = await employees.findOne({where:{id_employee: Id_employee}})
        if(!Chosen_employee){return res.json("NO EMPLOYEE")}
        Chosen_employee.bonus = bonus
        await Chosen_employee.save()
        return res.json(Chosen_employee)
    }
}

module.exports = new EmployeeController()