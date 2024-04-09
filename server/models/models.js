const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const clients = sequelize.define("Clients", {
    id_client: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Fname: {type: DataTypes.STRING, allowNull: false},
    Login: {type: DataTypes.STRING, allowNull: false, unique: true},
    Password: {type: DataTypes.STRING, allowNull: false, unique: true},
})

const orders = sequelize.define("Orders", {
    id_order: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order_date: {type: DataTypes.DATE},
    total_sum: {type: DataTypes.INTEGER, defaultValue: 0},
})

const position = sequelize.define("Position", {
    id_position: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const services = sequelize.define("Services", {
    id_service: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    service_name: {type: DataTypes.STRING, allowNull: false},
    cost: {type: DataTypes.INTEGER, allowNull: false},
})

const employees_services = sequelize.define("Employees_services", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const employees = sequelize.define("Employees", {
    id_employee: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fname: {type: DataTypes.STRING, allowNull: false},
    login: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false, unique: true},
    specialization: {type: DataTypes.STRING, allowNull: false},
    salary: {type: DataTypes.INTEGER, defaultValue: 0},
    bonus: {type: DataTypes.INTEGER, defaultValue: 0},
    role: {type: DataTypes.BOOLEAN},
})

clients.hasMany(orders)
orders.belongsTo(clients)

orders.hasMany(position)
position.belongsTo(orders)

services.hasMany(position)
position.belongsTo(services)

services.hasMany(employees_services)
employees_services.belongsTo(services)

employees.hasMany(employees_services)
employees_services.belongsTo(employees)

employees.hasMany(position)
position.belongsTo(employees)

module.exports = {
    clients,
    orders,
    position,
    services,
    employees_services,
    employees
}