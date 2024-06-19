import {makeAutoObservable} from "mobx";

export default class EmployeeStore{
    constructor(){
        this._employees = []
        makeAutoObservable(this)
    }
    specialEmployee(specialization){
        return this._employees.filter(employee => employee.specialization === specialization)
    }
    setEmployees(employees){
        this._employees = employees;
    }
    get Employees(){
        return this._employees;
    }

}