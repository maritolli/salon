import {makeAutoObservable} from "mobx";

export default class EmployeeStore{
    constructor(){
        this._employees = [
            {id: 1, name: 'Иванова Юлия', specialization: "мастер маникюра"},
            {id: 2, name: 'Антипова Катя', specialization: "мастер маникюра"},
            {id: 3, name: 'Джессика Паркер', specialization: "мастер волос"},
            {id: 4, name: 'Петров Пётр', specialization: "косметолог"}
        ]
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