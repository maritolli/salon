const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const clients = sequelize.define("Clients", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    Fname: {type: DataTypes.STRING, allowNull: false},
    Login: {type: DataTypes.STRING, allowNull: false, unique: true},
    Password: {type: DataTypes.STRING, allowNull: false, unique: true},
})

const orders = sequelize.define("Orders", {
    id_order: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order_date: {type: DataTypes.DATE},
    total_sum: {type: DataTypes.INTEGER},
})