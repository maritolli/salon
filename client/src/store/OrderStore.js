import {makeAutoObservable} from "mobx";

export default class OrderStore{
    constructor(){
        this._clientOrders=[]
        this._employeeOrders=[]
        this._adminClients=[]
        this._adminEmployees=[]
        makeAutoObservable(this)
    }
    setAdminEmployees(employees){
        this._adminEmployees = employees
    }
    setAdminClients(adminClients){
        this._adminClents = adminClients;
    }
    setClientOrders(clientOrders){
        this._clientOrders = clientOrders;
    }
    setEmployeeOrders(employeeOrders){
        this._employeeOrders = employeeOrders;
    }
    get AdminEmployees(){
        return this._adminEmployees;
    }
    get AdminClients(){
        return this._adminClients;
    }
    get ClientOrders(){
        return this._clientOrders;
    }
    get EmployeeOrders(){
        return this._employeeOrders;
    }
}