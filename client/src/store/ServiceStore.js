import {makeAutoObservable} from "mobx";

export default class ServiceStore{
    constructor(){
        this._services = []
        makeAutoObservable(this)
    }
    setServices(services){
        this._services = services;
    }
    get Services(){
        return this._services;
    }
}