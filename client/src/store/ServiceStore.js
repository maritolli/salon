import {makeAutoObservable} from "mobx";

export default class ServiceStore{
    constructor(){
        this._services = [
            {id: 1, name: 'Обновляем длинные волосы', cost: "1500 рублей"},
            {id: 2, name: 'Обновляем средние волосы', cost: "1200 рублей"},
            {id: 3, name: 'Обновляем короткие волосы', cost: "900 рублей"},
            {id: 4, name: 'Массажируем', cost: "2500 рублей"}
        ]
        makeAutoObservable(this)
    }
    setServices(services){
        this._services = services;
    }
    get Services(){
        return this._services;
    }
}