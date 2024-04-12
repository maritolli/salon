const {employees, orders, position} = require('../models/models')
const ApiError = require('../error/ApiError');
const Employee = require("../models/models");
const { Op, QueryTypes} = require("sequelize");
const {query} = require("express");

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
        return res.json(Employee);
    }
    async login(req, res){

    }
    async check(req, res){
        //На будущее варианты как можно обновлять строку, upsert нах**, он не работает
        //const update_role = await employees.update({role: false}, {where: {id_employee: 1}})
        //const update_role = await employees.findOne({where: { id_employee: 1 }})
        //if(update_role){update_role.role=false}
        //return res.json(update_role);
    }
    async delete(req, res){
        const Employee = await employees.destroy({where: {id_employee: 4}});
        return res.json(Employee)
    }
    async show_salary(req, res){
        const Employee_sal = await employees.findOne({where: {id_employee: req.query.id}})
        if(!Employee_sal){return res.json("NO USER")}
        return res.json(Employee_sal.salary)
    }
    async show_orders(req, res){
        const Employee_position = await position.findAll({where: {
            EmployeeIdEmployee: req.query.id,
            //Вообще я тут проверял на то, чтобы конкретный сотрудник дважды в одном заказе не был
            //Но с человеческой точки зрения если он две услуги делает, то это двойная работа
            //Следовательно это будет учитываться
            //id_position: {[Op.not]:{[Op.col]: "Position.id_position"}}
        }})
        //const sub_query = `(SELECT * FROM Orders WHERE id_order IN (SELECT OrderIdOrder FROM Orders WHERE EmployeeIdEmployee = ${req.query.id}))`
        // const [results, metadata] = await query(
        //     "SELECT * FROM Orders WHERE id_order IN (SELECT OrderIdOrder FROM Orders WHERE EmployeeIdEmployee = ${req.query.id})"
        // );
        const results = await orders.findAll({
            include: {
                model: position,
                attributes: ['EmployeeIdEmployee'],
                required: true
            },
        }, {where: {id_employee: req.query.id}});
        // const Employee_orders = await orders.findAll({where:{
        //         id_order:{[Op.in]:sub_query}
        // }})
        // const Employee_orders = await orders.findAll({attributes:{
        //     include:[
        //         [
        //             sequelize.literal('()'),
        //         ]
        //     ]
        // }
        // })
        if(!results){return res.json("THIS EMPLOYEE HAS NO ORDERS")}//
        return res.json(results)
    }
}

module.exports = new EmployeeController()