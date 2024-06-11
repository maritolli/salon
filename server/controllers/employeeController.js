const {employees, orders, position, services, employees_services, clients} = require('../models/models')
const ApiError = require('../error/ApiError');
const Employee = require("../models/models");
const { Op, QueryTypes, fn, col} = require("sequelize");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//отдельно вынесенная функция создания токена
const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role}, //центр часть токена, куда данные вшиваются
        process.env.SECRET_KEY, //любой секретный ключ, задаем его в .env
        {expiresIn: '24h'} //сколько живет токен
    )
}

class EmployeeController{
    async create(req, res, next){
        const {Fname, Login, Password, Specialization, Salary, Bonus} = req.body; //получили из тела запроса
        if (!Fname || !Login || !Password){ //если что-то не ввели
            return next(ApiError.badRequest('Некорректный email, пароль или имя сотрудника'))
        }
        const candidate = await employees.findOne({where: {login: Login}}) //проверка на существование такого же логина
        if (candidate){ //если вернулся и непустой
            return next(ApiError.badRequest('Сотрудник с таким логином уже существует'))
        }
        const hashPassword = await bcrypt.hash(Password, 5) //хэшируем пароль (и сколько раз)

        const Employee = await employees.create({
            fname: Fname,
            login: Login,
            password: hashPassword,
            specialization: Specialization,
            salary: Salary,
            bonus: Bonus
        });

        let a
        if(Employee){
            Employee.role = false
            await Employee.save()
        }

        const token = generateJwt(Employee.id_employee, Employee.Login, Employee.role)

        //////////////////////////////////////////////////////////////////////////
        //Следующий кусок кода добавляет информацию о сотруднике                //
        // в таблицу employees_services в зависимости от специализации конечно  //
        //////////////////////////////////////////////////////////////////////////
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
        else if(local_specialization === 'Мастер маникюра'){
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

        return res.json({token});
    }

    async login(req, res, next){
        const {Login, Password} = req.body
        const Employee = await employees.findOne({where: {login: Login}})
        if (!Employee){
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        let comparePassword = await bcrypt.compareSync(Password, Employee.password);
        if (!comparePassword){
            return next(ApiError.badRequest('Указан неверный пароль'))
        }
        const token = generateJwt(Employee.id_employee, Employee.Login)
        return res.json({token})
    }

    async check(req, res){
        //проверка на авторизацию ЧЕРЕЗ ТОКЕН
        //и создает новый токен, если чел постоянно пользуется акком для безопасности
        const token = generateJwt(req.id, req.login)
        return res.json({token})

        ////////////////////
        //от маши: это че?//
        ////////////////////

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
        await employees_services.destroy({where: {id_employee: req.query.id_employee}})//в этой таблице тоже удалим сотрудника
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
            attributes:['id_order', 'order_date'],
            include: [
                {
                    model: position,
                    attributes: ['EmployeeIdEmployee'],
                    where: {EmployeeIdEmployee: req.query.id},
                    required: true, //inner join
                    include:{
                        model: services,
                        attributes: ['service_name'],
                        required: true
                    }
                },
                {
                    model:clients,
                    attributes: ['Fname'],
                    required: true
                }
            ]
        });
        if(!results){return res.json("THIS EMPLOYEE HAS NO ORDERS")}//
        return res.json(results)
    }

    //Эта функция выводит сотрудников и количество заказов у них
    async show_best_employees(req, res){
        const Best_employees = await position.findAll({
            include:{
                model: employees,
                attributes:['fname'],
                required: true
            },
            //интересная функция fn, которая агр. функцию делает по столбцу
            attributes: ['EmployeeIdEmployee', [fn('count', col('OrderIdOrder')), 'orders_count']],
            group: ['Position.EmployeeIdEmployee','id_employee'],
            //order: [['EmployeeIdEmployee','ASC']]
            ///////////////////////////////////////
            order: [['orders_count','DESC']]
            ////////////////////////////////////
        })
        return res.json(Best_employees)
    }

    //Выдача премии активным сотрудникам
    async give_bonus(req, res){
        const {Id_employee, bonus} = req.body
        const Chosen_employee = await employees.findOne({where:{id_employee: Id_employee}})
        if(!Chosen_employee) {return res.json("NO EMPLOYEE")}
        Chosen_employee.bonus = bonus
        await Chosen_employee.save()
        return res.json(Chosen_employee)
    }
}

module.exports = new EmployeeController()